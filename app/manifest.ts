import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BTEB Results 2025 - Check Diploma & Polytechnic Results Online',
    short_name: 'BTEB Results',
    description: 'Check BTEB results 2025 instantly. Search diploma and polytechnic results by roll number for Engineering, Technology & Agriculture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'utilities'],
    lang: 'en',
    orientation: 'portrait',
  }
}
