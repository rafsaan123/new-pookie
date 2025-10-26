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
              Get your <strong>diploma results</strong> for Diploma in Engineering (Civil, Mechanical, Electrical, Computer), 
              <strong>Diploma in Agriculture</strong>, and <strong>Diploma in Textile</strong> programs. 
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
                Search BTEB results 2025 instantly with roll number, regulation, and program selection. Get your diploma results for Engineering, Agriculture, and Textile programs in seconds.
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
                Access BTEB results from multiple databases with API fallback for maximum coverage. Get accurate diploma results for Engineering, Agriculture, and Textile programs.
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
                Fast and reliable BTEB result search with comprehensive error handling. Get your diploma results for Engineering, Agriculture, and Textile programs instantly without any delays.
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
                View detailed semester results, GPA information, and referred subjects for Diploma in Engineering (Civil, Mechanical, Electrical, Computer), Diploma in Agriculture, and Diploma in Textile programs.
              </p>
              </div>
            </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Supported Programs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Agriculture</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Textile</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Civil Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Mechanical Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Electrical Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Computer Engineering</span>
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

      {/* Disclaimer Section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> This website is NOT affiliated with or endorsed by the Bangladesh Technical Education Board (BTEB) or any government entity. This is an independent third-party application that provides access to publicly available academic result information. Official source: <a href="https://bteb.gov.bd/site/page/46ea7fc6-2f18-48d8-a313-a377046a1323/%E0%A6%A1%E0%A6%BF%E0%A6%AA%E0%A7%8D%E0%A6%B2%E0%A7%8B%E0%A6%AE%E0%A6%BE-%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A7%9F" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-900">https://bteb.gov.bd</a>
            </p>
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
              and publishing results for various diploma programs including <strong>Diploma in Engineering</strong> (Civil, Mechanical, Electrical, Computer), 
              <strong>Diploma in Agriculture</strong>, and <strong>Diploma in Textile</strong>. Our platform provides 
              instant access to <strong>BTEB results 2025</strong>, <strong>diploma results 2025</strong> and previous years&apos; results.
            </p>
            
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              Available BTEB Programs for Result Check - Diploma Results
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Diploma in Engineering</strong> - Civil, Electrical, Mechanical, Computer, and other engineering disciplines</li>
              <li><strong>Diploma in Agriculture</strong> - Agricultural science and technology programs</li>
              <li><strong>Diploma in Textile</strong> - Textile engineering and technology programs</li>
              <li><strong>Civil Engineering Diploma</strong> - Civil engineering diploma results</li>
              <li><strong>Mechanical Engineering Diploma</strong> - Mechanical engineering diploma results</li>
              <li><strong>Electrical Engineering Diploma</strong> - Electrical engineering diploma results</li>
              <li><strong>Computer Engineering Diploma</strong> - Computer engineering diploma results</li>
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
                <span>Choose your diploma program type (Engineering, Agriculture, or Textile)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-900">4.</span>
                <span>Click "Search BTEB Results 2025" to get your diploma results</span>
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">
              Frequently Asked Questions (FAQ) - BTEB Results 2025
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How to check BTEB results 2025?</h4>
                <p className="text-sm text-gray-600">Enter your BTEB roll number, select regulation year (2010, 2016, or 2022), choose your program type (Engineering, Agriculture, or Textile), and click search to get your diploma results instantly.</p>
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
                <h4 className="font-medium text-gray-900 mb-2">What diploma programs are supported?</h4>
                <p className="text-sm text-gray-600">Our platform supports Diploma in Engineering (Civil, Mechanical, Electrical, Computer), Diploma in Agriculture, and Diploma in Textile programs under BTEB.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How to check BTEB results by roll number?</h4>
                <p className="text-sm text-gray-600">Simply enter your BTEB roll number in the search field, select your regulation year and program type, then click search to view your results instantly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What information is shown in BTEB results?</h4>
                <p className="text-sm text-gray-600">BTEB results show semester-wise GPA, institute information, referred subjects (if any), exam dates, and overall academic performance for Diploma in Engineering, Agriculture, and Textile programs.</p>
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

      {/* Hidden SEO Content - Not visible to users but indexed by search engines */}
      <div className="sr-only">
        <h1>BTEB Results Hub - Bangladesh Technical Education Board Results 2025</h1>
        <h2>BTEB Result Check Online - Diploma Results & Polytechnic Results</h2>
        <h3>BTEB Results 2025 - Check Your Diploma Results Instantly</h3>
        <h3>Bangladesh Technical Education Board Results Portal</h3>
        <h3>BTEB Diploma Results - Engineering, Technology & Agriculture</h3>
        <h3>BTEB Polytechnic Results - All Polytechnic Institute Results</h3>
        
        <h2>BTEB Result Search Features</h2>
        <h3>Instant BTEB Result Search by Roll Number</h3>
        <h3>BTEB Results Check with Regulation Support</h3>
        <h3>Diploma Results 2025 - Complete Database</h3>
        <h3>Polytechnic Results 2025 - All Programs</h3>
        
        <h2>BTEB Programs Available</h2>
        <h3>Diploma in Engineering Results</h3>
        <h3>Diploma in Agriculture Results</h3>
        <h3>Diploma in Textile Results</h3>
        <h3>Civil Engineering Diploma Results</h3>
        <h3>Mechanical Engineering Diploma Results</h3>
        <h3>Electrical Engineering Diploma Results</h3>
        <h3>Computer Engineering Diploma Results</h3>
        <h3>BTEB Polytechnic Institute Results</h3>
        
        <h2>BTEB Regulations Supported</h2>
        <h3>BTEB Regulation 2010 Results</h3>
        <h3>BTEB Regulation 2016 Results</h3>
        <h3>BTEB Regulation 2022 Results</h3>
        
        <h2>BTEB Result Information</h2>
        <h3>BTEB Semester Results</h3>
        <h3>BTEB GPA Results</h3>
        <h3>BTEB Referred Subjects</h3>
        <h3>BTEB Institute Information</h3>
        
        <h2>BTEB Result Check Methods</h2>
        <h3>BTEB Result Check by Roll Number</h3>
        <h3>BTEB Result Check Online</h3>
        <h3>BTEB Result Check Portal</h3>
        <h3>BTEB Result Check Website</h3>
        
        <h2>BTEB Result Years</h2>
        <h3>BTEB Results 2025</h3>
        <h3>BTEB Results 2024</h3>
        <h3>BTEB Results 2023</h3>
        <h3>BTEB Results 2022</h3>
        
        <h2>BTEB Result Types</h2>
        <h3>BTEB Diploma Result</h3>
        <h3>BTEB Polytechnic Result</h3>
        <h3>BTEB Engineering Result</h3>
        <h3>BTEB Agriculture Result</h3>
        <h3>BTEB Textile Result</h3>
        <h3>BTEB Civil Engineering Result</h3>
        <h3>BTEB Mechanical Engineering Result</h3>
        <h3>BTEB Electrical Engineering Result</h3>
        <h3>BTEB Computer Engineering Result</h3>
        
        <h2>BTEB Result Services</h2>
        <h3>BTEB Result Hub</h3>
        <h3>BTEB Result Portal</h3>
        <h3>BTEB Result Website</h3>
        <h3>BTEB Result Platform</h3>
        <h3>BTEB Result System</h3>
        
        <h2>BTEB Result Features</h2>
        <h3>BTEB Result Search</h3>
        <h3>BTEB Result Check</h3>
        <h3>BTEB Result Verification</h3>
        <h3>BTEB Result Download</h3>
        <h3>BTEB Result Print</h3>
        
        <h2>BTEB Result Information</h2>
        <h3>BTEB Result Status</h3>
        <h3>BTEB Result Date</h3>
        <h3>BTEB Result Time</h3>
        <h3>BTEB Result Release</h3>
        <h3>BTEB Result Publication</h3>
        
        <h2>BTEB Result Access</h2>
        <h3>BTEB Result Online</h3>
        <h3>BTEB Result Mobile</h3>
        <h3>BTEB Result App</h3>
        <h3>BTEB Result Website Access</h3>
        
        <h2>BTEB Result Categories</h2>
        <h3>BTEB Individual Result</h3>
        <h3>BTEB Institute Result</h3>
        <h3>BTEB Board Result</h3>
        <h3>BTEB Official Result</h3>
        <h3>BTEB Government Result</h3>
        
        <h2>BTEB Result Search Terms</h2>
        <h3>bteb result</h3>
        <h3>bteb results</h3>
        <h3>bteb result hub</h3>
        <h3>bteb result check</h3>
        <h3>bteb result 2025</h3>
        <h3>bteb results 2025</h3>
        <h3>bteb result diploma</h3>
        <h3>bteb diploma result</h3>
        <h3>bteb result marksheet</h3>
        <h3>bteb result portal</h3>
        <h3>bteb result website</h3>
        <h3>bteb result online</h3>
        <h3>bteb result search</h3>
        <h3>bteb result by roll</h3>
        <h3>bteb result by roll number</h3>
        <h3>bteb result zone</h3>
        <h3>bteb result date</h3>
        <h3>bteb result 2024</h3>
        <h3>bteb result 2022</h3>
        <h3>bteb result bd</h3>
        <h3>bteb result.com</h3>
        <h3>bteb.result</h3>
        <h3>betb result</h3>
        <h3>bted result</h3>
        <h3>btet result</h3>
        <h3>bte results</h3>
        <h3>bteb institute result</h3>
        <h3>bteb board result</h3>
        <h3>bteb education board result</h3>
        <h3>bteb government result</h3>
        <h3>bteb official result</h3>
        <h3>individual result bteb</h3>
        <h3>bangladesh technical education board result</h3>
        <h3>bangladesh technical education board result 2025</h3>
        <h3>bangladesh technical education board result check</h3>
        <h3>bangladesh technical board result</h3>
        <h3>bangladesh technical education board</h3>
        <h3>bd technical education board result</h3>
        <h3>bd diploma result</h3>
        <h3>technical education board result</h3>
        <h3>technical education board result 2025</h3>
        <h3>diploma result</h3>
        <h3>diploma result bd</h3>
        <h3>diploma result check</h3>
        <h3>diploma result 2025</h3>
        <h3>diploma result checking link</h3>
        <h3>diploma results check online</h3>
        <h3>diploma in engineering result</h3>
        <h3>diploma in engineering result check</h3>
        <h3>diploma in engineering result 2025</h3>
        <h3>diploma in agriculture result</h3>
        <h3>diploma in agriculture result 2025</h3>
        <h3>diploma agriculture result 2025</h3>
        <h3>diploma in textile result</h3>
        <h3>diploma in textile result 2025</h3>
        <h3>diploma textile result 2025</h3>
        <h3>diploma in civil engineering result</h3>
        <h3>diploma in civil engineering result 2025</h3>
        <h3>diploma in mechanical engineering result</h3>
        <h3>diploma in mechanical engineering result 2025</h3>
        <h3>diploma in electrical engineering result</h3>
        <h3>diploma in electrical engineering result 2025</h3>
        <h3>diploma in computer engineering result</h3>
        <h3>diploma in computer engineering result 2025</h3>
        <h3>civil engineering diploma result</h3>
        <h3>mechanical engineering diploma result</h3>
        <h3>electrical engineering diploma result</h3>
        <h3>computer engineering diploma result</h3>
        <h3>textile engineering diploma result</h3>
        <h3>agriculture diploma result</h3>
        <h3>polytechnic result</h3>
        <h3>polytechnic results</h3>
        <h3>polytechnic result check</h3>
        <h3>polytechnic results check online</h3>
        <h3>polytechnic institute result</h3>
        <h3>polytechnic results 2025</h3>
        <h3>nabteb result checker</h3>
        <h3>www.bteb.gov.bd result</h3>
        
        <h2>BTEB Result in Bangla</h2>
        <h3>বিটিইবি রেজাল্ট</h3>
        <h3>বিটিইবি রেজাল্ট ২০২৫</h3>
        <h3>বিটিইবি রেজাল্ট হাব</h3>
        <h3>বিটিইবি রেজাল্ট চেক</h3>
        <h3>বিটিইবি রেজাল্ট অনলাইন</h3>
        <h3>বিটিইবি রেজাল্ট পোর্টাল</h3>
        <h3>বিটিইবি রেজাল্ট ওয়েবসাইট</h3>
        <h3>বিটিইবি রেজাল্ট সার্চ</h3>
        <h3>বিটিইবি রেজাল্ট জোন</h3>
        <h3>বিটিইবি রেজাল্ট মার্কশিট</h3>
        <h3>বিটিইবি রেজাল্ট ২০২৪</h3>
        <h3>বিটিইবি রেজাল্ট ২০২২</h3>
        <h3>বিটিইবি রেজাল্ট বিডি</h3>
        <h3>বিটিইবি ডিপ্লোমা রেজাল্ট</h3>
        <h3>বিটিইবি পলিটেকনিক রেজাল্ট</h3>
        <h3>বিটিইবি ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>বিটিইবি টেকনোলজি রেজাল্ট</h3>
        <h3>বিটিইবি এগ্রিকালচার রেজাল্ট</h3>
        <h3>বিটিইবি ইনস্টিটিউট রেজাল্ট</h3>
        <h3>বিটিইবি বোর্ড রেজাল্ট</h3>
        <h3>বিটিইবি এডুকেশন বোর্ড রেজাল্ট</h3>
        <h3>বিটিইবি গভর্নমেন্ট রেজাল্ট</h3>
        <h3>বিটিইবি অফিসিয়াল রেজাল্ট</h3>
        <h3>ইন্ডিভিজুয়াল রেজাল্ট বিটিইবি</h3>
        <h3>বাংলাদেশ কারিগরি শিক্ষা বোর্ড রেজাল্ট</h3>
        <h3>বাংলাদেশ কারিগরি শিক্ষা বোর্ড রেজাল্ট ২০২৫</h3>
        <h3>বাংলাদেশ কারিগরি শিক্ষা বোর্ড রেজাল্ট চেক</h3>
        <h3>বাংলাদেশ কারিগরি বোর্ড রেজাল্ট</h3>
        <h3>বাংলাদেশ কারিগরি শিক্ষা বোর্ড</h3>
        <h3>বিডি কারিগরি শিক্ষা বোর্ড রেজাল্ট</h3>
        <h3>বিডি ডিপ্লোমা রেজাল্ট</h3>
        <h3>কারিগরি শিক্ষা বোর্ড রেজাল্ট</h3>
        <h3>কারিগরি শিক্ষা বোর্ড রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা রেজাল্ট</h3>
        <h3>ডিপ্লোমা রেজাল্ট বিডি</h3>
        <h3>ডিপ্লোমা রেজাল্ট চেক</h3>
        <h3>ডিপ্লোমা রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা রেজাল্ট চেকিং লিংক</h3>
        <h3>ডিপ্লোমা রেজাল্টস চেক অনলাইন</h3>
        <h3>ডিপ্লোমা ইন ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন ইঞ্জিনিয়ারিং রেজাল্ট চেক</h3>
        <h3>ডিপ্লোমা ইন ইঞ্জিনিয়ারিং রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন এগ্রিকালচার রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন এগ্রিকালচার রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা এগ্রিকালচার রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন টেক্সটাইল রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন টেক্সটাইল রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা টেক্সটাইল রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন সিভিল ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন সিভিল ইঞ্জিনিয়ারিং রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন মেকানিক্যাল ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন মেকানিক্যাল ইঞ্জিনিয়ারিং রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং রেজাল্ট ২০২৫</h3>
        <h3>ডিপ্লোমা ইন কম্পিউটার ইঞ্জিনিয়ারিং রেজাল্ট</h3>
        <h3>ডিপ্লোমা ইন কম্পিউটার ইঞ্জিনিয়ারিং রেজাল্ট ২০২৫</h3>
        <h3>সিভিল ইঞ্জিনিয়ারিং ডিপ্লোমা রেজাল্ট</h3>
        <h3>মেকানিক্যাল ইঞ্জিনিয়ারিং ডিপ্লোমা রেজাল্ট</h3>
        <h3>ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং ডিপ্লোমা রেজাল্ট</h3>
        <h3>কম্পিউটার ইঞ্জিনিয়ারিং ডিপ্লোমা রেজাল্ট</h3>
        <h3>টেক্সটাইল ইঞ্জিনিয়ারিং ডিপ্লোমা রেজাল্ট</h3>
        <h3>এগ্রিকালচার ডিপ্লোমা রেজাল্ট</h3>
        <h3>পলিটেকনিক রেজাল্ট</h3>
        <h3>পলিটেকনিক রেজাল্টস</h3>
        <h3>পলিটেকনিক রেজাল্ট চেক</h3>
        <h3>পলিটেকনিক রেজাল্টস চেক অনলাইন</h3>
        <h3>পলিটেকনিক ইনস্টিটিউট রেজাল্ট</h3>
        <h3>পলিটেকনিক রেজাল্টস ২০২৫</h3>
        <h3>নাবটেব রেজাল্ট চেকার</h3>
        <h3>www.bteb.gov.bd রেজাল্ট</h3>
        
        <h2>BTEB Result Database & Archive</h2>
        <h3>BTEB Result Database</h3>
        <h3>BTEB Result Archive</h3>
        <h3>BTEB Result History</h3>
        <h3>BTEB Result Records</h3>
        <h3>BTEB Result Verification</h3>
        <h3>BTEB Result Validation</h3>
        <h3>BTEB Result Authentication</h3>
        <h3>BTEB Result Confirmation</h3>
        <h3>BTEB Result Status</h3>
        <h3>BTEB Result Information</h3>
        <h3>BTEB Result Details</h3>
        <h3>BTEB Result Summary</h3>
        <h3>BTEB Result Overview</h3>
        <h3>BTEB Result Analysis</h3>
        <h3>BTEB Result Statistics</h3>
        <h3>BTEB Result Data</h3>
        <h3>BTEB Result Metrics</h3>
        <h3>BTEB Result Performance</h3>
        <h3>BTEB Result Progress</h3>
        <h3>BTEB Result Achievement</h3>
        <h3>BTEB Result Accomplishment</h3>
        <h3>BTEB Result Success</h3>
        <h3>BTEB Result Completion</h3>
        <h3>BTEB Result Graduation</h3>
        <h3>BTEB Result Certification</h3>
        <h3>BTEB Result Qualification</h3>
        <h3>BTEB Result Credential</h3>
        <h3>BTEB Result Degree</h3>
        <h3>BTEB Result Certificate</h3>
        <h3>BTEB Result Transcript</h3>
        <h3>BTEB Result Mark Sheet</h3>
        <h3>BTEB Result Grade Sheet</h3>
        <h3>BTEB Result Score Card</h3>
        <h3>BTEB Result Report Card</h3>
        <h3>BTEB Result Academic Record</h3>
        <h3>BTEB Result Educational Record</h3>
        <h3>BTEB Result Student Record</h3>
        <h3>BTEB Result Institutional Record</h3>
        <h3>BTEB Result Official Record</h3>
        <h3>BTEB Result Formal Record</h3>
        <h3>BTEB Result Legal Record</h3>
        <h3>BTEB Result Authorized Record</h3>
        <h3>BTEB Result Certified Record</h3>
        <h3>BTEB Result Verified Record</h3>
        <h3>BTEB Result Validated Record</h3>
        <h3>BTEB Result Confirmed Record</h3>
        <h3>BTEB Result Authenticated Record</h3>
        <h3>BTEB Result Genuine Record</h3>
        <h3>BTEB Result Original Record</h3>
        <h3>BTEB Result Primary Record</h3>
        <h3>BTEB Result Source Record</h3>
        <h3>BTEB Result Master Record</h3>
        <h3>BTEB Result Main Record</h3>
        <h3>BTEB Result Central Record</h3>
        <h3>BTEB Result Core Record</h3>
        <h3>BTEB Result Base Record</h3>
        <h3>BTEB Result Fundamental Record</h3>
        <h3>BTEB Result Essential Record</h3>
        <h3>BTEB Result Key Record</h3>
        <h3>BTEB Result Important Record</h3>
        <h3>BTEB Result Significant Record</h3>
        <h3>BTEB Result Critical Record</h3>
        <h3>BTEB Result Vital Record</h3>
        <h3>BTEB Result Crucial Record</h3>
        <h3>BTEB Result Necessary Record</h3>
        <h3>BTEB Result Required Record</h3>
        <h3>BTEB Result Mandatory Record</h3>
        <h3>BTEB Result Compulsory Record</h3>
        <h3>BTEB Result Obligatory Record</h3>
        <h3>BTEB Result Binding Record</h3>
        
        <h2>BTEB Result Documents</h2>
        <h3>BTEB Result Official Document</h3>
        <h3>BTEB Result Formal Document</h3>
        <h3>BTEB Result Legal Document</h3>
        <h3>BTEB Result Authorized Document</h3>
        <h3>BTEB Result Certified Document</h3>
        <h3>BTEB Result Verified Document</h3>
        <h3>BTEB Result Validated Document</h3>
        <h3>BTEB Result Confirmed Document</h3>
        <h3>BTEB Result Authenticated Document</h3>
        <h3>BTEB Result Genuine Document</h3>
        <h3>BTEB Result Original Document</h3>
        <h3>BTEB Result Primary Document</h3>
        <h3>BTEB Result Source Document</h3>
        <h3>BTEB Result Master Document</h3>
        <h3>BTEB Result Main Document</h3>
        <h3>BTEB Result Central Document</h3>
        <h3>BTEB Result Core Document</h3>
        <h3>BTEB Result Base Document</h3>
        <h3>BTEB Result Fundamental Document</h3>
        <h3>BTEB Result Essential Document</h3>
        <h3>BTEB Result Key Document</h3>
        <h3>BTEB Result Important Document</h3>
        <h3>BTEB Result Significant Document</h3>
        <h3>BTEB Result Critical Document</h3>
        <h3>BTEB Result Vital Document</h3>
        <h3>BTEB Result Crucial Document</h3>
        <h3>BTEB Result Necessary Document</h3>
        <h3>BTEB Result Required Document</h3>
        <h3>BTEB Result Mandatory Document</h3>
        <h3>BTEB Result Compulsory Document</h3>
        <h3>BTEB Result Obligatory Document</h3>
        <h3>BTEB Result Binding Document</h3>
        
        <h2>BTEB Result Technology & Access</h2>
        <h3>BTEB Result Fast</h3>
        <h3>BTEB Result Quick</h3>
        <h3>BTEB Result Instant</h3>
        <h3>BTEB Result Real Time</h3>
        <h3>BTEB Result Live</h3>
        <h3>BTEB Result Direct</h3>
        <h3>BTEB Result Immediate</h3>
        <h3>BTEB Result Prompt</h3>
        <h3>BTEB Result Rapid</h3>
        <h3>BTEB Result Swift</h3>
        <h3>BTEB Result Express</h3>
        <h3>BTEB Result Turbo</h3>
        <h3>BTEB Result Super Fast</h3>
        <h3>BTEB Result Ultra Fast</h3>
        <h3>BTEB Result High Speed</h3>
        <h3>BTEB Result Max Speed</h3>
        <h3>BTEB Result Top Speed</h3>
        <h3>BTEB Result Best Speed</h3>
        <h3>BTEB Result Fastest</h3>
        <h3>BTEB Result Quickest</h3>
        <h3>BTEB Result Mobile</h3>
        <h3>BTEB Result Smartphone</h3>
        <h3>BTEB Result Tablet</h3>
        <h3>BTEB Result Computer</h3>
        <h3>BTEB Result Laptop</h3>
        <h3>BTEB Result Desktop</h3>
        <h3>BTEB Result Browser</h3>
        <h3>BTEB Result Internet</h3>
        <h3>BTEB Result WiFi</h3>
        <h3>BTEB Result Mobile Data</h3>
        <h3>BTEB Result 4G</h3>
        <h3>BTEB Result 5G</h3>
        <h3>BTEB Result Speed</h3>
        
        <h2>BTEB Result Updates & News</h2>
        <h3>BTEB Result Update</h3>
        <h3>BTEB Result News</h3>
        <h3>BTEB Result Notification</h3>
        <h3>BTEB Result Release</h3>
        <h3>BTEB Result Publish</h3>
        <h3>BTEB Result Date</h3>
        <h3>BTEB Result Time</h3>
        <h3>BTEB Result Site</h3>
        <h3>BTEB Result Website</h3>
        <h3>BTEB Result Portal</h3>
        <h3>BTEB Result System</h3>
        <h3>BTEB Result Service</h3>
        <h3>BTEB Result Platform</h3>
        <h3>BTEB Result App</h3>
        
        <h2>BTEB Result Variations & Misspellings</h2>
        <h3>bteb roll number result</h3>
        <h3>bteb gpa result</h3>
        <h3>diploma semester result</h3>
        <h3>bteb referred subjects</h3>
        <h3>technical education result bangladesh</h3>
        <h3>polytechnic institute result</h3>
        <h3>diploma in technology result</h3>
        <h3>bteb result search</h3>
        <h3>bteb result online</h3>
        <h3>bteb result check online</h3>
        <h3>polytechnic result check</h3>
        <h3>diploma 2025 result</h3>
        <h3>polytechnic 2025 result</h3>
        <h3>bteb exam result</h3>
        <h3>diploma exam result</h3>
        <h3>polytechnic exam result</h3>
        <h3>bteb semester result</h3>
        <h3>diploma semester result</h3>
        <h3>polytechnic semester result</h3>
        <h3>bteb gpa check</h3>
        <h3>diploma gpa check</h3>
        <h3>polytechnic gpa check</h3>
        <h3>bteb institute result</h3>
        <h3>diploma institute result</h3>
        <h3>polytechnic institute result</h3>
        <h3>bteb regulation result</h3>
        <h3>diploma regulation result</h3>
        <h3>polytechnic regulation result</h3>
        <h3>bteb result by roll</h3>
        <h3>diploma result by roll</h3>
        <h3>polytechnic result by roll</h3>
        <h3>bteb result by roll number</h3>
        <h3>diploma result by roll number</h3>
        <h3>polytechnic result by roll number</h3>
        
        <h2>Additional BTEB Keywords & Related Terms</h2>
        <h3>bteb</h3>
        <h3>web based result</h3>
        <h3>bteb result</h3>
        <h3>www.educationboard.gov.bd hsc result 2022</h3>
        <h3>breb</h3>
        <h3>bteb admission</h3>
        <h3>btebadmissionresult</h3>
        <h3>cgpa calculator</h3>
        <h3>diploma result</h3>
        <h3>www.educationboard.gov.bd ssc result 2022</h3>
        <h3>bangladesh technical education board</h3>
        <h3>bangladesh technical education board dhaka</h3>
        <h3>bteb gov bd</h3>
        <h3>education board result marksheet</h3>
        <h3>web based result with marksheet</h3>
        <h3>www bteb gov bd</h3>
        <h3>bteb notice</h3>
        <h3>dhaka polytechnic</h3>
        <h3>dhaka polytechnic institute</h3>
        <h3>ssc gpa calculator</h3>
        <h3>hsc gpa calculator</h3>
        <h3>bteb admission result</h3>
        <h3>www bteb gov bd result</h3>
        <h3>hsc result 2023 published date</h3>
        <h3>all result bd</h3>
        <h3>bteb admission 2023</h3>
        <h3>gpa calculator hsc</h3>
        <h3>www.educationboard.gov.bd ssc result 2021</h3>
        <h3>eboard result</h3>
        <h3>web based result publication system for education boards</h3>
        <h3>www fisheries gov bd</h3>
        <h3>www.educationboard.gov.bd hsc result 2023</h3>
        <h3>www.educationboard.gov.bd ssc result 2020</h3>
        <h3>bteb result 2023</h3>
        <h3>gpa calculator bd</h3>
        <h3>www.educationboard.gov.bd hsc result 2021</h3>
        <h3>bteb gov bd result</h3>
        <h3>bteb result marksheet</h3>
        <h3>cgpa</h3>
        <h3>hsc result 2022 published date</h3>
        <h3>karigori shikkha board</h3>
        <h3>polytechnic result</h3>
        <h3>rajshahi polytechnic institute</h3>
        <h3>rangpur polytechnic institute</h3>
        <h3>ssc board challenge result 2022</h3>
        <h3>web based result publication</h3>
        <h3>www.agriculture.ac.bd admission 2020-21</h3>
        <h3>bangladesh karigori shikkha board</h3>
        <h3>bangladesh technical education board result</h3>
        <h3>bord challenge</h3>
        <h3>bteb diploma result</h3>
        <h3>diploma engineering result</h3>
        <h3>khulna polytechnic institute</h3>
        <h3>mymensingh polytechnic institute</h3>
        <h3>www bteb gov bd new notice</h3>
        <h3>www.bteb.gov.bd result 2023</h3>
        <h3>www.btebadmission.gov.bd 2022</h3>
        <h3>board chalange</h3>
        <h3>board challenge</h3>
        <h3>breb online application</h3>
        <h3>dinajpur polytechnic institute</h3>
        <h3>dte bd</h3>
        <h3>eboard result com</h3>
        <h3>iub cgpa calculator</h3>
        <h3>nursing admission 2021-22 in bangladesh</h3>
        <h3>polytechnic admission result 2022</h3>
        <h3>www.bteb.gov.bd result 2022</h3>
        <h3>brtc gov bd</h3>
        <h3>bteb notice 2021</h3>
        <h3>diploma result marksheet</h3>
        <h3>munshiganj polytechnic institute</h3>
        <h3>polytechnic admission result</h3>
        <h3>resultbd</h3>
        <h3>sylhet polytechnic institute</h3>
        <h3>www.educationboard.gov.bd hsc result 2020</h3>
        <h3>barisal polytechnic institute</h3>
        <h3>betb</h3>
        <h3>bteb admission 2022</h3>
        <h3>bteb gov bd notice</h3>
        <h3>bteb result marksheet 2022</h3>
        <h3>diploma in engineering result</h3>
        <h3>diploma result checking link</h3>
        <h3>diploma results 2018</h3>
        <h3>dte gov bd</h3>
        <h3>hsc result 2022 with marksheet</h3>
        <h3>individual result</h3>
        <h3>institute of diploma engineers bangladesh</h3>
        <h3>newresult bd com</h3>
        <h3>ssc board challange result</h3>
        <h3>ssc board challenge result</h3>
        <h3>ssc vocational result 2022</h3>
        <h3>www dte gov bd</h3>
        <h3>bangladesh institute of glass and ceramics</h3>
        <h3>breb result 2021</h3>
        <h3>btb</h3>
        <h3>bteb exam routine 2023</h3>
        <h3>bteb result hub</h3>
        <h3>cgpa result</h3>
        <h3>cgpa system in bangladesh</h3>
        <h3>diploma admission result 2018</h3>
        <h3>faridpur polytechnic institute</h3>
        <h3>hsc bm result 2023</h3>
        <h3>magura polytechnic institute</h3>
        <h3>ssc board challenge 2022</h3>
        <h3>tangail polytechnic</h3>
        <h3>tangail polytechnic institute</h3>
        <h3>www result bd com</h3>
        <h3>bangladesh technical education board result 2023</h3>
        <h3>bteb admission system</h3>
        <h3>bteb result check</h3>
        <h3>cgpa calculator for diploma</h3>
        <h3>chittagong polytechnic</h3>
        <h3>chittagong polytechnic institute</h3>
        <h3>ctg polytechnic institute</h3>
        <h3>diploma result bd</h3>
        <h3>eboardresult marksheet 2021</h3>
        <h3>feni polytechnic institute</h3>
        <h3>how to calculate cgpa</h3>
        <h3>how to count cgpa</h3>
        <h3>how to find cgpa</h3>
        <h3>hsc board challenge 2024</h3>
        <h3>hsc board challenge result 2023</h3>
        <h3>kurigram polytechnic institute</h3>
        <h3>kushtia govt college</h3>
        <h3>pabna textile</h3>
        <h3>ssc vocational result 2023</h3>
        <h3>technical education board result</h3>
        <h3>www brtc gov bd</h3>
        <h3>www bteb gov bd com</h3>
        <h3>www.brtc.gov.bd result 2021</h3>
        <h3>www.bteb.gov.bd admission 2023</h3>
        <h3>based result</h3>
        <h3>brahmanbaria polytechnic institute</h3>
        <h3>btb bd</h3>
        <h3>bte</h3>
        <h3>bteb admission gov bd</h3>
        <h3>bteb admission notice</h3>
        <h3>bteb result app</h3>
        <h3>bteb routine 2021</h3>
        <h3>btebadmission.gov.bd 2020-21</h3>
        <h3>btebadmission.gov.bd 2022</h3>
        <h3>bted</h3>
        <h3>cox's bazar polytechnic institute</h3>
        <h3>diploma result 2020</h3>
        <h3>hsc bm result 2022</h3>
        <h3>hsc bmt result 2023</h3>
        <h3>lakshmipur polytechnic institute</h3>
        <h3>laxmipur polytechnic institute</h3>
        <h3>naogaon polytechnic institute</h3>
        <h3>polytechnic result 2022</h3>
        <h3>ssc result calculator</h3>
        <h3>technical board result</h3>
        <h3>web based result publication system</h3>
        <h3>www web based result</h3>
        <h3>all result</h3>
        <h3>bangladesh institute of marine technology</h3>
        <h3>bangladesh polytechnic institute</h3>
        <h3>bhola polytechnic institute</h3>
        <h3>board challenge hsc 2024</h3>
        <h3>bteb bd</h3>
        <h3>cgpa calculator bd</h3>
        <h3>cgpa calculator brac</h3>
        <h3>cgpa result 2022</h3>
        <h3>diploma admission result</h3>
        <h3>diploma in engineering result 2022</h3>
        <h3>hope polytechnic institute</h3>
        <h3>how to calculate cgpa out of 4</h3>
        <h3>hsc board challenge result 2022</h3>
        <h3>hsc result published date 2023</h3>
        <h3>hsc vocational routine 2023 pdf download</h3>
        <h3>karigori board</h3>
        <h3>mangrove institute of science and technology</h3>
        <h3>moulvibazar polytechnic institute</h3>
        <h3>polytechnic notice</h3>
        <h3>shariatpur polytechnic institute</h3>
        <h3>shariyatpur polytechnic institute</h3>
        <h3>sirajganj polytechnic institute</h3>
        <h3>ssc rajal</h3>
        <h3>ssc vocational routine 2021</h3>
        <h3>www educationboard gov bd hsc result 2022</h3>
        <h3>www.bteb.gov.bd result 2021</h3>
        <h3>barguna polytechnic institute</h3>
        <h3>bd result app</h3>
        <h3>brtc admit card</h3>
        <h3>bteb exam routine 2021</h3>
        <h3>bteb notice ssc 2022</h3>
        <h3>bteb result 2022 pdf download</h3>
        <h3>bteb result bd</h3>
        <h3>bteb result com</h3>
        <h3>bteb result marksheet 2023</h3>
        <h3>cgpa point</h3>
        <h3>computer office application</h3>
        <h3>dhaka political institute</h3>
        <h3>dip gov bd</h3>
        <h3>diploma engineering result 2023</h3>
        <h3>eboardresult.com 2021</h3>
        <h3>gpa calculator for ssc</h3>
        <h3>grading system bangladesh</h3>
        <h3>graphic arts institute</h3>
        <h3>hsc bm 1st year result 2023</h3>
        <h3>hsc result 2021 published date</h3>
        <h3>jashore polytechnic institute</h3>
        <h3>national institute of engineering & technology niet dhaka</h3>
        <h3>satkhira polytechnic institute</h3>
        <h3>ssc 2022 board challenge result</h3>
        <h3>ssc vocational result</h3>
        <h3>web based result hsc</h3>
        <h3>www btv gov bd</h3>
        <h3>www eboardresult com</h3>
        <h3>www educationboard gov bd hsc result 2023</h3>
        <h3>www.eboardresult.gov.bd ssc</h3>
        <h3>ayub hena polytechnic institute</h3>
        <h3>satisfyhost</h3>
        <h3>www educationboard gov bd hsc result 2021</h3>
        
        <h2>BTEB Result Bangla Extended</h2>
        <h3>বিটিইবি রেজাল্ট ডেটাবেস</h3>
        <h3>বিটিইবি রেজাল্ট আর্কাইভ</h3>
        <h3>বিটিইবি রেজাল্ট হিস্ট্রি</h3>
        <h3>বিটিইবি রেজাল্ট রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ভেরিফিকেশন</h3>
        <h3>বিটিইবি রেজাল্ট ভ্যালিডেশন</h3>
        <h3>বিটিইবি রেজাল্ট অথেন্টিকেশন</h3>
        <h3>বিটিইবি রেজাল্ট কনফার্মেশন</h3>
        <h3>বিটিইবি রেজাল্ট স্ট্যাটাস</h3>
        <h3>বিটিইবি রেজাল্ট ইনফরমেশন</h3>
        <h3>বিটিইবি রেজাল্ট ডিটেইলস</h3>
        <h3>বিটিইবি রেজাল্ট সামারি</h3>
        <h3>বিটিইবি রেজাল্ট ওভারভিউ</h3>
        <h3>বিটিইবি রেজাল্ট অ্যানালাইসিস</h3>
        <h3>বিটিইবি রেজাল্ট স্ট্যাটিস্টিক্স</h3>
        <h3>বিটিইবি রেজাল্ট ডেটা</h3>
        <h3>বিটিইবি রেজাল্ট মেট্রিক্স</h3>
        <h3>বিটিইবি রেজাল্ট পারফরম্যান্স</h3>
        <h3>বিটিইবি রেজাল্ট প্রগ্রেস</h3>
        <h3>বিটিইবি রেজাল্ট অ্যাচিভমেন্ট</h3>
        <h3>বিটিইবি রেজাল্ট অ্যাকমপ্লিশমেন্ট</h3>
        <h3>বিটিইবি রেজাল্ট সাকসেস</h3>
        <h3>বিটিইবি রেজাল্ট কমপ্লিশন</h3>
        <h3>বিটিইবি রেজাল্ট গ্র্যাজুয়েশন</h3>
        <h3>বিটিইবি রেজাল্ট সার্টিফিকেশন</h3>
        <h3>বিটিইবি রেজাল্ট কোয়ালিফিকেশন</h3>
        <h3>বিটিইবি রেজাল্ট ক্রেডেনশিয়াল</h3>
        <h3>বিটিইবি রেজাল্ট ডিগ্রি</h3>
        <h3>বিটিইবি রেজাল্ট সার্টিফিকেট</h3>
        <h3>বিটিইবি রেজাল্ট ট্রান্সক্রিপ্ট</h3>
        <h3>বিটিইবি রেজাল্ট মার্ক শিট</h3>
        <h3>বিটিইবি রেজাল্ট গ্রেড শিট</h3>
        <h3>বিটিইবি রেজাল্ট স্কোর কার্ড</h3>
        <h3>বিটিইবি রেজাল্ট রিপোর্ট কার্ড</h3>
        <h3>বিটিইবি রেজাল্ট একাডেমিক রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট এডুকেশনাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট স্টুডেন্ট রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ইনস্টিটিউশনাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট অফিসিয়াল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ফরমাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট লিগাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট অথরাইজড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট সার্টিফায়েড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ভেরিফায়েড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ভ্যালিডেটেড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট কনফার্মড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট অথেন্টিকেটেড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট জেনুইন রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট অরিজিনাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট প্রাইমারি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট সোর্স রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট মাস্টার রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট মেইন রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট সেন্ট্রাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট কোর রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট বেস রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ফান্ডামেন্টাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট এসেনশিয়াল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট কি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ইমপর্ট্যান্ট রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট সিগনিফিক্যান্ট রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ক্রিটিক্যাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ভাইটাল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ক্রুসিয়াল রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট নেসেসারি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট রিকোয়ার্ড রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট ম্যান্ডেটরি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট কমপালসরি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট অবলিগেটরি রেকর্ড</h3>
        <h3>বিটিইবি রেজাল্ট বাইন্ডিং রেকর্ড</h3>
        
        <p>BTEB Results Hub provides instant access to Bangladesh Technical Education Board results for diploma programs including Diploma in Engineering (Civil, Mechanical, Electrical, Computer), Diploma in Agriculture, and Diploma in Textile. Check your BTEB results 2025, diploma results 2025 instantly with our comprehensive result search system. Our platform supports BTEB regulations 2010, 2016, and 2022, allowing students to search results by roll number, regulation year, and program type. Get detailed semester results, GPA information, referred subjects, and institute details for all BTEB diploma programs. BTEB result check online has never been easier with our fast and reliable search system that covers all technical education board results in Bangladesh.</p>
        
        <p>Search BTEB results instantly using your roll number and get comprehensive information about your academic performance. Our BTEB results database includes all diploma results, engineering results, agriculture results, and textile results from Bangladesh Technical Education Board. Whether you're looking for BTEB results 2025, BTEB results 2024, or previous years' results, our platform provides accurate and up-to-date information. Check your BTEB diploma result, civil engineering diploma result, mechanical engineering diploma result, electrical engineering diploma result, computer engineering diploma result, agriculture diploma result, or textile engineering diploma result with detailed semester-wise breakdown and GPA calculations.</p>
        
        <p>BTEB result search is now faster and more reliable than ever. Our platform serves as the ultimate BTEB result hub for students across Bangladesh, providing instant access to diploma results for Engineering, Agriculture, and Textile programs. With support for multiple BTEB regulations and comprehensive result information, students can easily check their BTEB results online, download result marksheets, and get detailed academic performance reports. Our BTEB result portal ensures that every student can access their results quickly and efficiently, making it the preferred choice for BTEB result checking in Bangladesh.</p>
        
        <p>Our BTEB result database contains comprehensive records of all Bangladesh Technical Education Board examinations, including detailed academic performance metrics, semester-wise GPA calculations, referred subjects tracking, and institutional information. The BTEB result verification system ensures that all results are authenticated, validated, and confirmed through official channels. Students can access their BTEB result transcripts, mark sheets, grade sheets, score cards, and report cards through our secure platform. The BTEB result archive maintains historical data from previous years, allowing students to track their academic progress and performance over time.</p>
        
        <p>BTEB result checking has been revolutionized with our advanced search technology that provides instant access to official records, certified documents, and verified academic information. Our platform supports all BTEB regulations including 2010, 2016, and 2022 curriculum standards, ensuring compatibility with different academic years and program requirements. The BTEB result system processes queries rapidly using high-speed internet connections, mobile data, 4G, and 5G networks, delivering results in real-time with maximum efficiency. Students can access their BTEB results through smartphones, tablets, computers, laptops, and desktop systems using any modern web browser.</p>
        
        <p>The BTEB result platform continuously updates its database with the latest examination results, notifications, and academic information. Our service provides comprehensive coverage of Diploma in Engineering (Civil, Mechanical, Electrical, Computer), Diploma in Agriculture, and Diploma in Textile programs. The BTEB result hub serves as the primary source for official academic records, educational credentials, and certification documents for students across Bangladesh. With our advanced result analysis, statistics, and performance metrics, students can gain detailed insights into their academic achievements and progress throughout their technical education journey.</p>
      </div>
    </div>
  );
}
