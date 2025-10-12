'use client';

import { useState, useEffect } from 'react';
import { BooklistService, BooklistItem } from '../../services/booklistService';
import Link from 'next/link';

interface BooklistsClientProps {
  initialData: BooklistItem[];
  initialError: string;
}

export default function BooklistsClient({ initialData, initialError }: BooklistsClientProps) {
  const [booklistData] = useState<BooklistItem[]>(initialData);
  const [error] = useState<string>(initialError);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load ads after hydration
    const loadAds = () => {
      const adContainers = ['booklist-ad-1', 'booklist-ad-2', 'booklist-ad-3'];
      adContainers.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = '';
          
          // Create script elements
          const script1 = document.createElement('script');
          script1.type = 'text/javascript';
          script1.textContent = `atOptions = {
            'key' : 'f9fd39af8932f3a0a9c36fefbb67ec82',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };`;
          
          const script2 = document.createElement('script');
          script2.type = 'text/javascript';
               script2.src = 'https://www.highperformanceformat.com/f9fd39af8932f3a0a9c36fefbb67ec82/invoke.js';
          
          container.appendChild(script1);
          container.appendChild(script2);
        }
      });
    };
    
    // Load ads after a short delay to ensure DOM is ready
    setTimeout(loadAds, 100);
  }, []);

  const openBooklist = (slug: string) => {
    window.location.href = `/booklists/${slug}`;
  };

  // Categorize technologies
  const categories = {
    'all': 'All Technologies',
    'engineering': 'Engineering',
    'textile': 'Textile',
    'agriculture': 'Agriculture',
    'specialized': 'Specialized'
  };

  const categorizeTechnology = (tech: BooklistItem) => {
    const name = tech.name.toLowerCase();
    if (name.includes('civil') || name.includes('electrical') || name.includes('mechanical') || 
        name.includes('computer') || name.includes('electronics') || name.includes('architecture') ||
        name.includes('automobile') || name.includes('chemical') || name.includes('food') ||
        name.includes('power') || name.includes('rac') || name.includes('mechatronics') ||
        name.includes('environmental') || name.includes('telecommunication') || name.includes('surveying') ||
        name.includes('construction') || name.includes('electromedical')) {
      return 'engineering';
    } else if (name.includes('fabric') || name.includes('fashion') || name.includes('wet') ||
               name.includes('yarn') || name.includes('apparel') || name.includes('jute') ||
               name.includes('merchandising') || name.includes('textile')) {
      return 'textile';
    } else if (name.includes('agriculture') || name.includes('fisheries') || name.includes('forestry')) {
      return 'agriculture';
    } else {
      return 'specialized';
    }
  };

  const filteredByCategory = selectedCategory === 'all' 
    ? booklistData 
    : booklistData.filter(tech => categorizeTechnology(tech) === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-3">
              BTEB Technology Booklists
            </h1>
            <p className="text-gray-500 font-light">
              2022 Regulation Curriculum
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  selectedCategory === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredByCategory.map((tech, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => openBooklist(tech.slug)}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-medium text-sm">
                    {tech.code}
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Technology Code: {tech.code}
                </p>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}
      </main>

      {/* Ad 1 - After technologies grid */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
            <div id="booklist-ad-1" className="min-h-[90px] flex items-center justify-center">
              <div className="text-gray-400 text-sm">Advertisement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad 2 - Middle section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
            <div id="booklist-ad-2" className="min-h-[90px] flex items-center justify-center">
              <div className="text-gray-400 text-sm">Advertisement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad 3 - Bottom of page */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Advertisement</p>
            <div id="booklist-ad-3" className="min-h-[90px] flex items-center justify-center">
              <div className="text-gray-400 text-sm">Advertisement</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
