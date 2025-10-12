'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Calculator = dynamic(() => import('./Calculator'), { ssr: false });

export default function CGPACalculatorClient() {
  useEffect(() => {
    // Ads are now loaded directly via dangerouslySetInnerHTML
    // No additional JavaScript needed
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-3">
              CGPA Calculator
            </h1>
            <p className="text-gray-500 font-light text-sm">
              BTEB Diploma & Polytechnic (2010/2016/2022)
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Tool */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Calculator />
      </main>

      {/* Ad 1 - After calculator */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
             <div id="cgpa-ad-1" className="min-h-[90px] flex items-center justify-center">
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
              BTEB CGPA Calculation Guide
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Use this free BTEB CGPA calculator to compute your diploma CGPA according to official
              semester weightings for the 2010, 2016, and 2022 regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manual Entry</h3>
              <p className="text-gray-600 text-sm">
                Enter your semester GPA values manually for precise CGPA calculation using official BTEB weightings.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Auto Fill</h3>
              <p className="text-gray-600 text-sm">
                Automatically fetch your semester results using your roll number and regulation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Official Weightings</h3>
              <p className="text-gray-600 text-sm">
                Uses official BTEB semester weightings for accurate CGPA calculation across all regulations.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Supported Programs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Diploma in Engineering</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Polytechnic Diploma Programs</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">Technology Programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad 2 - After information section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
             <div id="cgpa-ad-2" className="min-h-[90px] flex items-center justify-center">
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

      {/* Ad 3 - Bottom of page */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
             <div id="cgpa-ad-3" className="min-h-[90px] flex items-center justify-center">
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
