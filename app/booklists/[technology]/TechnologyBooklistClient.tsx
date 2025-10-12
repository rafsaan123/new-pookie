'use client';

import { useState, useEffect } from 'react';
import { BooklistService, TechnologyBooklist } from '../../../services/booklistService';
import Link from 'next/link';

interface TechnologyBooklistClientProps {
  initialData: TechnologyBooklist | null;
  initialError: string;
  technologySlug: string;
}

export default function TechnologyBooklistClient({ initialData, initialError, technologySlug }: TechnologyBooklistClientProps) {
  const [booklist, setBooklist] = useState<TechnologyBooklist | null>(initialData);
  const [error, setError] = useState<string>(initialError);

  useEffect(() => {
    // Ads are now loaded directly via dangerouslySetInnerHTML
    // No additional JavaScript needed
  }, []);

  const getTechnologyName = (slug: string) => {
    const tech = BooklistService.getTechnologyBySlug(slug);
    return tech ? tech.name : 'Unknown Technology';
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Booklist</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Link href="/booklists" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Booklists
          </Link>
        </div>
      </div>
    );
  }

  if (!booklist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Booklist Not Found</h2>
          <p className="text-gray-600 mb-4">The requested technology booklist could not be found.</p>
          <Link href="/booklists" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Booklists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
              <span className="text-lg font-medium text-gray-700">{booklist.technologyCode}</span>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-3">
              {booklist.technologyName}
            </h1>
            <p className="text-gray-500 font-light">
              2022 Regulation Curriculum
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Semester-wise Subjects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">Semester-wise Subjects</h2>
            <Link href="/booklists" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Booklists
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {booklist.semesters.map((semesterData) => (
              <div key={semesterData.semester} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-medium text-sm mr-3">
                    {semesterData.semester}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Semester {semesterData.semester}</h3>
                </div>
                
                <div className="space-y-3">
                  {semesterData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{subject.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Code: {subject.code}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Ad 1 - After semester subjects */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
             <div id="tech-ad-1" className="min-h-[90px] flex items-center justify-center">
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
                     document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></scr' + 'ipt>');
                   </script>
                 `
               }} />
             </div>
          </div>
        </div>
      </section>

      {/* Ad 2 - Middle section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
             <div id="tech-ad-2" className="min-h-[90px] flex items-center justify-center">
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
                     document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></scr' + 'ipt>');
                   </script>
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
             <div id="tech-ad-3" className="min-h-[90px] flex items-center justify-center">
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
                     document.write('<scr' + 'ipt type="text/javascript" src="https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js"></scr' + 'ipt>');
                   </script>
                 `
               }} />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}