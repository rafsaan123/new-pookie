'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { searchResult } from './actions';
import { StudyAidResultData } from '../services/pookieApiService';

interface ReferredSubject {
  subject_semester: number;
  subject_code: number;
  subject_name: string;
  reffered_type: string;
  passed: boolean;
}

interface ExamResult {
  date: string;
  instituteCode: number;
  gpa?: number;
  reffereds: ReferredSubject[];
}

interface SemesterResult {
  semester: number;
  exam_results: ExamResult[];
}

interface Institute {
  code: number;
  name: string;
  district: string;
}

interface ResultData {
  exam: string;
  roll: number;
  regulation: number;
  otherRegulations: string[];
  institute: Institute;
  current_reffereds: ReferredSubject[];
  semester_results: SemesterResult[];
  latest_result: ExamResult;
}

export default function HomePage() {
  // Result search states
  const [result, setResult] = useState<StudyAidResultData | null>(null);
  const [error, setError] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [regulation, setRegulation] = useState<string>('2022');
  const [program, setProgram] = useState<string>('Diploma in Engineering');
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      setError('');
      
      // Track search attempt
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'search', {
          search_term: 'BTEB Results',
          regulation: regulation,
          program: program
        });
      }
      
      const result = await searchResult(formData);
      
      if (result?.error) {
        setError(result.error);
        
        // Track error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'search_error', {
            error_message: result.error,
            regulation: regulation,
            program: program
          });
        }
      } else if (result?.success && result?.data) {
        setResult(result.data);
        
        // Track successful result
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'result_found', {
            regulation: regulation,
            program: program,
            institute: result.data.institute?.name || 'Unknown'
          });
        }
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderReferreds = (reffereds: ReferredSubject[]) => {
    if (!reffereds || reffereds.length === 0) return null;

    return (
      <div className="mt-2 bg-red-50 p-3 rounded-lg">
        <h6 className="text-xs font-semibold text-red-700 mb-1">Referred Subjects:</h6>
        <div className="space-y-1">
          {reffereds.map((subject, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="text-red-600">{subject.subject_name}</span>
              <span className="text-red-500 text-xs">
                Code: {subject.subject_code}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-2">
              BTEB Results Search
            </h1>
            <p className="text-gray-500 font-light text-sm">
              Check Diploma & Polytechnic Results Instantly
            </p>
          </div>
        </div>
      </div>

      {/* Search Tool */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-2">Search Your Results</h2>
            <p className="text-gray-500 text-sm">Enter your details to view your BTEB results instantly</p>
          </div>

          <form action={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                <select
                  name="program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                >
                  <option value="Diploma in Engineering">Diploma In Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
                <select
                  name="regulation"
                  value={regulation}
                  onChange={(e) => setRegulation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                >
                  <option value="any">Any</option>
                  <option value="2010">2010</option>
                  <option value="2016">2016</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input
                  type="text"
                  name="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your roll number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={isPending 
                ? 'w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-900 text-white hover:bg-gray-800'
              }
            >
              {isPending ? 'Searching...' : 'Search Results'}
            </button>
          </form>

          {mounted && error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          {mounted && isPending && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {mounted && result && (
            <div className="mt-8 space-y-6">
              {/* CGPA Display */}
              {result.cgpa && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Your CGPA</p>
                  <div className="text-4xl font-light text-gray-900">{result.cgpa}</div>
                  <p className="text-xs text-gray-500 mt-1">Out of 4.0</p>
                </div>
              )}

              {/* Institute Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Institute Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Institute Name</p>
                    <p className="font-medium text-gray-900">{result.institute.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">District</p>
                    <p className="font-medium text-gray-900">{result.institute.district}</p>
                  </div>
                </div>
              </div>

              {/* Semester Results */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Semester Results</h3>
                <div className="space-y-4">
                  {result.semester_results
                    .sort((a, b) => b.semester - a.semester)
                    .map((semester) => (
                      <div key={semester.semester} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Semester {semester.semester}
                        </h4>
                        {semester.exam_results.map((exam, index) => (
                          <div key={index}>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-gray-500">GPA</p>
                                <p className="font-medium text-gray-900">
                                  {exam.gpa || 'Referred'}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Exam Date</p>
                                <p className="font-medium text-gray-900">{formatDate(exam.date)}</p>
                              </div>
                            </div>
                            {exam.reffereds.length > 0 && renderReferreds(exam.reffereds)}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Roll Number</p>
                    <p className="font-medium text-gray-900">{result.roll}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Regulation</p>
                    <p className="font-medium text-gray-900">{result.regulation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Exam</p>
                    <p className="font-medium text-gray-900">{result.exam}</p>
                  </div>
                  {result.latest_result && (
                    <div>
                      <p className="text-xs text-gray-500">Latest Result</p>
                      <p className="font-medium text-gray-900">{result.latest_result.gpa || 'Referred'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Ad 1 - On top of informational texts */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div id="ad-1" className="min-h-[90px] flex items-center justify-center">
                <div dangerouslySetInnerHTML={{
                  __html: `
                    <script type="text/javascript">
                      atOptions = {
                        'key' : 'f9fd39af8932f3a0a9c36fefbb67ec82',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                      };
                    </script>
                    <script type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></script>
                  `
                }} />
              </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              BTEB Results 2025 - Complete Guide to Diploma & Polytechnic Results
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Check your <strong>BTEB results 2025</strong> instantly with our fast and reliable result search system. 
              Get your <strong>diploma results</strong> and <strong>polytechnic results</strong> for Engineering programs. 
              View detailed semester results, GPA scores, and referred subjects information online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Instant BTEB Result Search</h3>
              <p className="text-gray-600 text-sm">
                Search BTEB results 2025 instantly with roll number, regulation, and program selection. Get your diploma results and polytechnic results in seconds.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comprehensive BTEB Database</h3>
              <p className="text-gray-600 text-sm">
                Access BTEB results from multiple databases with API fallback for maximum coverage. Get accurate diploma results and polytechnic results for all programs.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast & Reliable BTEB Search</h3>
              <p className="text-gray-600 text-sm">
                Fast and reliable BTEB result search with comprehensive error handling. Get your diploma results and polytechnic results instantly without any delays.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed BTEB Results</h3>
              <p className="text-gray-600 text-sm">
                View detailed semester results, GPA information, and referred subjects for all BTEB diploma programs and polytechnic programs including Engineering, Technology, and Agriculture.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Supported Programs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Technology</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Agriculture</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Polytechnic Programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad 2 - After information section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div id="ad-2" className="min-h-[90px] flex items-center justify-center">
              <div dangerouslySetInnerHTML={{
                __html: `
                  <script type="text/javascript">
                    atOptions = {
                      'key' : 'f9fd39af8932f3a0a9c36fefbb67ec82',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                    };
                  </script>
                  <script type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></script>
                `
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="prose max-w-none text-gray-600">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              Bangladesh Technical Education Board (BTEB) Results 2025 - Diploma & Polytechnic Results
            </h2>
            
            <p className="mb-6">
              The <strong>Bangladesh Technical Education Board (BTEB)</strong> is responsible for conducting examinations 
              and publishing results for various diploma programs and polytechnic programs including <strong>Diploma in Engineering</strong>, 
              <strong>Diploma in Technology</strong>, and <strong>Diploma in Agriculture</strong>. Our platform provides 
              instant access to <strong>BTEB results 2025</strong>, <strong>diploma results 2025</strong>, <strong>polytechnic results 2025</strong> and previous years&apos; results.
            </p>
            
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              Available BTEB Programs for Result Check - Diploma & Polytechnic Results
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Diploma in Engineering</strong> - Civil, Electrical, Mechanical, Computer, and other engineering disciplines</li>
              <li><strong>Diploma in Technology</strong> - Various technology-based diploma programs</li>
              <li><strong>Diploma in Agriculture</strong> - Agricultural science and technology programs</li>
              <li><strong>Polytechnic Institute Results</strong> - All polytechnic institute results under BTEB</li>
              <li><strong>Technical Education Results</strong> - Complete technical education result database</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              BTEB Regulation Years
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>BTEB Regulation 2010</strong> - For students enrolled under 2010 curriculum</li>
              <li><strong>BTEB Regulation 2016</strong> - For students enrolled under 2016 curriculum</li>
              <li><strong>BTEB Regulation 2022</strong> - For students enrolled under 2022 curriculum</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              What You Can Check in BTEB Results
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Semester-wise results and GPA scores</li>
              <li>Institute information and district details</li>
              <li>Referred subjects (if any)</li>
              <li>Exam dates and publication information</li>
              <li>Overall academic performance</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              How to Check BTEB Results 2025
            </h3>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-900">1.</span>
                <span>Enter your BTEB roll number in the search field</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-900">2.</span>
                <span>Select your BTEB regulation year (2010, 2016, or 2022)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-900">3.</span>
                <span>Choose your diploma program type (Engineering, Technology, or Agriculture)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-900">4.</span>
                <span>Click "Search BTEB Results 2025" to get your diploma results and polytechnic results</span>
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              Frequently Asked Questions (FAQ) - BTEB Results 2025
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How to check BTEB results 2025?</h4>
                <p className="text-sm text-gray-600">Enter your BTEB roll number, select regulation year (2010, 2016, or 2022), choose your program type, and click search to get your diploma results or polytechnic results instantly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What is BTEB result check?</h4>
                <p className="text-sm text-gray-600">BTEB result check is the process of searching and viewing your Bangladesh Technical Education Board examination results online using your roll number and other details.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How to get diploma results online?</h4>
                <p className="text-sm text-gray-600">Use our platform to search diploma results by entering your roll number, selecting regulation, and program type. Get instant access to your diploma in engineering results.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What are polytechnic results?</h4>
                <p className="text-sm text-gray-600">Polytechnic results are examination results from polytechnic institutes under BTEB, including diploma programs in engineering, technology, and agriculture fields.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How to check BTEB results by roll number?</h4>
                <p className="text-sm text-gray-600">Simply enter your BTEB roll number in the search field, select your regulation year and program type, then click search to view your results instantly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What information is shown in BTEB results?</h4>
                <p className="text-sm text-gray-600">BTEB results show semester-wise GPA, institute information, referred subjects (if any), exam dates, and overall academic performance for diploma and polytechnic programs.</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              <strong>Note:</strong> This is an unofficial platform for checking BTEB results. For official results, 
              please visit the official BTEB website. Results are fetched from reliable sources and updated regularly.
            </p>
          </div>
        </div>
      </section>

      {/* Ad 3 - Bottom of page */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div id="ad-3" className="min-h-[90px] flex items-center justify-center">
              <div dangerouslySetInnerHTML={{
                __html: `
                  <script type="text/javascript">
                    atOptions = {
                      'key' : 'f9fd39af8932f3a0a9c36fefbb67ec82',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                    };
                  </script>
                  <script type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></script>
                `
              }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
