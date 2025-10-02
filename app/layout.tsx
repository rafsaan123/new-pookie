import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BTEB Results 2025 - Check Diploma Results Online | Bangladesh Technical Education Board',
  description: 'Check BTEB results 2025 instantly. Search diploma results by roll number for Engineering, Technology & Agriculture programs. Get GPA, semester results & referred subjects online.',
  keywords: [
    'bteb results',
    'bteb result 2025',
    'diploma result',
    'diploma results 2025',
    'bangladesh technical education board',
    'bteb result check',
    'diploma engineering result',
    'diploma technology result',
    'diploma agriculture result',
    'bteb roll number result',
    'bteb gpa result',
    'diploma semester result',
    'bteb referred subjects',
    'technical education result bangladesh'
  ],
  authors: [{ name: 'BTEB Result Search' }],
  creator: 'BTEB Result Search',
  publisher: 'BTEB Result Search',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bteb-results.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BTEB Results 2025 - Check Diploma Results Online',
    description: 'Check BTEB results 2025 instantly. Search diploma results by roll number for Engineering, Technology & Agriculture programs.',
    url: 'https://bteb-results.vercel.app',
    siteName: 'BTEB Result Search',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BTEB Results 2025 - Check Diploma Results Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTEB Results 2025 - Check Diploma Results Online',
    description: 'Check BTEB results 2025 instantly. Search diploma results by roll number for Engineering, Technology & Agriculture programs.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BTEB Result Search",
    "description": "Check BTEB results 2025 instantly. Search diploma results by roll number for Engineering, Technology & Agriculture programs.",
    "url": "https://bteb-results.vercel.app",
    "applicationCategory": "EducationApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "BTEB Result Search",
      "url": "https://bteb-results.vercel.app"
    },
    "featureList": [
      "BTEB Result Search",
      "Diploma Result Check",
      "Engineering Results",
      "Technology Results",
      "Agriculture Results",
      "GPA Calculation",
      "Semester Results",
      "Referred Subjects"
    ],
    "keywords": "bteb results, diploma result, bangladesh technical education board, bteb result check, diploma engineering result"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://bteb-results.vercel.app" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
