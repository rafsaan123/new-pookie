'use client';

import { useState, useEffect, useTransition } from 'react';
import { searchResult } from './actions';

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
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [regulation, setRegulation] = useState<string>('2022');
  const [program, setProgram] = useState<string>('Diploma in Engineering');
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Prevent hydration mismatch and handle URL params
  useEffect(() => {
    setMounted(true);
    
    // Check for result data in URL params (from server action redirect)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const success = urlParams.get('success');
      const dataParam = urlParams.get('data');
      
      if (success === 'true' && dataParam) {
        try {
          const resultData = JSON.parse(decodeURIComponent(dataParam));
          setResult(resultData);
          
          // Track successful result
          if (window.gtag) {
            window.gtag('event', 'result_found', {
              regulation: regulation,
              program: program,
              institute: resultData.institute?.name || 'Unknown'
            });
          }
          
          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);
        } catch (error) {
          console.error('Error parsing result data:', error);
        }
      }
    }
  }, [regulation, program]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                BTEB Results 2025 - Check Diploma & Polytechnic Results Online
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Search your BTEB results instantly</span>
            </div>
          </div>
        </div>
      </header>

      {/* SEO Content Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Bangladesh Technical Education Board (BTEB) Results 2025 - Diploma & Polytechnic Results
            </h2>
            <p className="text-gray-600 text-sm max-w-4xl mx-auto">
              Check your <strong>BTEB results 2025</strong> instantly with our fast and reliable result search system. 
              Get your <strong>diploma results</strong> and <strong>polytechnic results</strong> for Engineering programs. 
              View detailed semester results, GPA scores, and referred subjects information online. Search by roll number for instant access to your academic performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Result Search Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Search BTEB Results 2025 - Diploma & Polytechnic Result Check
            </h2>

            <form action={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter BTEB Roll Number"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Enter BTEB roll number to search results"
                    required
                  />
                  <select
                    name="regulation"
                    value={regulation}
                    onChange={(e) => setRegulation(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select BTEB regulation year"
                  >
                    <option value="2010">2010</option>
                    <option value="2016">2016</option>
                    <option value="2022">2022</option>
                  </select>
                  <select
                    name="program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select diploma program type"
                  >
                    <option value="Diploma in Engineering">Diploma in Engineering</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full px-4 py-2 rounded-md text-white ${
                    isPending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  aria-label="Search BTEB results"
                >
                  {isPending ? 'Searching BTEB Results...' : 'Search BTEB Results 2025'}
                </button>
              </div>
            </form>

            {mounted && error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {mounted && isPending && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {mounted && result && (
              <div className="mt-6 space-y-4">
                {/* Institute Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Institute Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-600">Institute Name</p>
                      <p className="font-medium text-sm">{result.institute.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">District</p>
                      <p className="font-medium text-sm">{result.institute.district}</p>
                    </div>
                  </div>
                </div>

                {/* Semester Results */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Semester Results</h3>
                  <div className="space-y-2">
                    {result.semester_results
                      .sort((a, b) => b.semester - a.semester)
                      .map((semester) => (
                        <div key={semester.semester} className="bg-white p-3 rounded border">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Semester {semester.semester}
                          </h4>
                          {semester.exam_results.map((exam, index) => (
                            <div key={index}>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-xs text-gray-600">GPA</p>
                                  <p className="font-bold text-gray-800">
                                    {exam.gpa || 'Referred'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Exam Date</p>
                                  <p className="font-medium text-xs">{formatDate(exam.date)}</p>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Additional Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">Roll Number</p>
                      <p className="font-medium">{result.roll}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Regulation</p>
                      <p className="font-medium">{result.regulation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Exam</p>
                      <p className="font-medium">{result.exam}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Data Source</p>
                      <p className="font-medium text-green-600">Pookie Backend API</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              BTEB Result Search Features - Diploma & Polytechnic Results 2025
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Instant BTEB Result Search</h3>
                  <p className="text-gray-600">Search BTEB results 2025 instantly with roll number, regulation, and program selection. Get your diploma results and polytechnic results in seconds.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Comprehensive BTEB Database</h3>
                  <p className="text-gray-600">Access BTEB results from multiple databases with API fallback for maximum coverage. Get accurate diploma results and polytechnic results for all programs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Fast & Reliable BTEB Search</h3>
                  <p className="text-gray-600">Fast and reliable BTEB result search with comprehensive error handling. Get your diploma results and polytechnic results instantly without any delays.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Detailed BTEB Results</h3>
                  <p className="text-gray-600">View detailed semester results, GPA information, and referred subjects for all BTEB diploma programs and polytechnic programs including Engineering, Technology, and Agriculture.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Check BTEB Results 2025</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">1.</span>
                  <span>Enter your BTEB roll number in the search field</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">2.</span>
                  <span>Select your BTEB regulation year (2010, 2016, or 2022)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">3.</span>
                  <span>Choose your diploma program type (Engineering, Technology, or Agriculture)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold text-blue-600">4.</span>
                  <span>Click &quot;Search BTEB Results 2025&quot; to get your diploma results and polytechnic results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            BTEB Results 2025 - Complete Guide to Diploma & Polytechnic Results
          </h2>
          
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              The <strong>Bangladesh Technical Education Board (BTEB)</strong> is responsible for conducting examinations 
              and publishing results for various diploma programs and polytechnic programs including <strong>Diploma in Engineering</strong>, 
              <strong>Diploma in Technology</strong>, and <strong>Diploma in Agriculture</strong>. Our platform provides 
              instant access to <strong>BTEB results 2025</strong>, <strong>diploma results 2025</strong>, <strong>polytechnic results 2025</strong> and previous years&apos; results.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              Available BTEB Programs for Result Check - Diploma & Polytechnic Results
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Diploma in Engineering</strong> - Civil, Electrical, Mechanical, Computer, and other engineering disciplines</li>
              <li><strong>Diploma in Technology</strong> - Various technology-based diploma programs</li>
              <li><strong>Diploma in Agriculture</strong> - Agricultural science and technology programs</li>
              <li><strong>Polytechnic Institute Results</strong> - All polytechnic institute results under BTEB</li>
              <li><strong>Technical Education Results</strong> - Complete technical education result database</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              BTEB Regulation Years
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>BTEB Regulation 2010</strong> - For students enrolled under 2010 curriculum</li>
              <li><strong>BTEB Regulation 2016</strong> - For students enrolled under 2016 curriculum</li>
              <li><strong>BTEB Regulation 2022</strong> - For students enrolled under 2022 curriculum</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              What You Can Check in BTEB Results
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Semester-wise results and GPA scores</li>
              <li>Institute information and district details</li>
              <li>Referred subjects (if any)</li>
              <li>Exam dates and publication information</li>
              <li>Overall academic performance</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
              Frequently Asked Questions (FAQ) - BTEB Results 2025
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">How to check BTEB results 2025?</h4>
                <p className="text-sm text-gray-600">Enter your BTEB roll number, select regulation year (2010, 2016, or 2022), choose your program type, and click search to get your diploma results or polytechnic results instantly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">What is BTEB result check?</h4>
                <p className="text-sm text-gray-600">BTEB result check is the process of searching and viewing your Bangladesh Technical Education Board examination results online using your roll number and other details.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">How to get diploma results online?</h4>
                <p className="text-sm text-gray-600">Use our platform to search diploma results by entering your roll number, selecting regulation, and program type. Get instant access to your diploma in engineering</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">What are polytechnic results?</h4>
                <p className="text-sm text-gray-600">Polytechnic results are examination results from polytechnic institutes under BTEB, including diploma programs in engineering, technology, and agriculture fields.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">How to check BTEB results by roll number?</h4>
                <p className="text-sm text-gray-600">Simply enter your BTEB roll number in the search field, select your regulation year and program type, then click search to view your results instantly.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">What information is shown in BTEB results?</h4>
                <p className="text-sm text-gray-600">BTEB results show semester-wise GPA, institute information, referred subjects (if any), exam dates, and overall academic performance for diploma and polytechnic programs.</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              <strong>Note:</strong> This is an unofficial platform for checking BTEB results. For official results, 
              please visit the official BTEB website. Results are fetched from reliable sources and updated regularly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
