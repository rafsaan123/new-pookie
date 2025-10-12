import { MetadataRoute } from 'next'
import { BooklistService } from '../services/booklistService'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://btebresultshub.com'
  
  // Get all booklist technologies
  const booklistData = BooklistService.getBooklistData()
  const technologies = booklistData.data?.technologies || []
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cgpa-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booklists`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // Dynamic booklist pages
  const booklistPages = technologies.map((tech) => ({
    url: `${baseUrl}/booklists/${tech.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...booklistPages]
}