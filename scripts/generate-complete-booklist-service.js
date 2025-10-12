const fs = require('fs');
const path = require('path');

// Parse the book.json file and convert it to our service format
function parseBookJsonToService() {
  const bookJsonPath = path.join(__dirname, '../app/booklists/book.json');
  const content = fs.readFileSync(bookJsonPath, 'utf8');
  
  const technologies = [];
  const lines = content.split('\n');
  
  let currentTech = null;
  let currentSemester = null;
  let currentSubjects = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Technology header (e.g., "Architecture Technology (61)" or "Apparel Manufacturing (14)")
    if (line.match(/^[A-Z].*\(\d+\)$/)) {
      if (currentTech) {
        // Save previous technology
        if (currentSemester && currentSubjects.length > 0) {
          currentTech.semesters.push({
            semester: currentSemester,
            subjects: currentSubjects
          });
        }
        technologies.push(currentTech);
      }
      
      // Extract technology name and code
      const match = line.match(/^(.+?)\s+\((\d+)\)$/);
      if (match) {
        const name = match[1].trim();
        const code = match[2].trim();
        const slug = name.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/civil-wood/, 'civil-wood')
          .replace(/computer-science/, 'computer-science')
          .replace(/merchandising-market/, 'merchandising-market')
          .replace(/textile-machine-design-maintenance/, 'textile-machine-design-maintenance')
          .replace(/diploma-in-agriculture/, 'diploma-in-agriculture')
          .replace(/diploma-in-fisheries/, 'diploma-in-fisheries')
          .replace(/diploma-in-forestry/, 'diploma-in-forestry')
          .replace(/aircraft-maintenance-aerospace/, 'aircraft-maintenance-aerospace-technology')
          .replace(/aircraft-maintenance-avionics/, 'aircraft-maintenance-avionics-technology')
          .replace(/apparel-manufacturing/, 'apparel-manufacturing')
          .replace(/jute-product-manufacturing/, 'jute-product-manufacturing')
          .replace(/wet-processing/, 'wet-processing')
          .replace(/yarn-manufacturing/, 'yarn-manufacturing')
          .replace(/fabric-manufacturing/, 'fabric-manufacturing')
          .replace(/fashion-design/, 'fashion-design');
        
        currentTech = {
          technologyName: name,
          technologyCode: code,
          slug: slug,
          regulation: '2022',
          semesters: []
        };
        currentSemester = null;
        currentSubjects = [];
      }
    }
    // Semester header (e.g., "1st Semester")
    else if (line.includes('Semester')) {
      if (currentSemester && currentSubjects.length > 0) {
        currentTech.semesters.push({
          semester: currentSemester,
          subjects: currentSubjects
        });
      }
      
      const semesterMatch = line.match(/(\d+)(?:st|nd|rd|th)?\s+Semester/);
      if (semesterMatch) {
        currentSemester = parseInt(semesterMatch[1]);
        currentSubjects = [];
      }
    }
    // Subject line (e.g., "21011	Engineering Drawing")
    else if (currentSemester && line.includes('\t')) {
      const parts = line.split('\t');
      if (parts.length >= 2) {
        const code = parts[0].trim();
        const name = parts[1].trim();
        if (code && name && code !== 'Subject Code' && name !== 'Subject Name') {
          currentSubjects.push({ code, name });
        }
      }
    }
  }
  
  // Save the last technology
  if (currentTech) {
    if (currentSemester && currentSubjects.length > 0) {
      currentTech.semesters.push({
        semester: currentSemester,
        subjects: currentSubjects
      });
    }
    technologies.push(currentTech);
  }
  
  return technologies;
}

// Generate the updated booklist service
function generateUpdatedService() {
  const technologies = parseBookJsonToService();
  
  console.log(`Parsed ${technologies.length} technologies from book.json`);
  
  // Generate the TECHNOLOGY_BOOKLISTS object
  let booklistsObject = '  private static readonly TECHNOLOGY_BOOKLISTS: Record<string, TechnologyBooklist> = {\n';
  
  technologies.forEach((tech, index) => {
    booklistsObject += `    '${tech.slug}': {\n`;
    booklistsObject += `      technologyName: '${tech.technologyName}',\n`;
    booklistsObject += `      technologyCode: '${tech.technologyCode}',\n`;
    booklistsObject += `      semesters: [\n`;
    
    tech.semesters.forEach((semester, semIndex) => {
      booklistsObject += `        {\n`;
      booklistsObject += `          semester: ${semester.semester},\n`;
      booklistsObject += `          subjects: [\n`;
      
      semester.subjects.forEach((subject, subIndex) => {
        booklistsObject += `            { code: '${subject.code}', name: '${subject.name.replace(/'/g, "\\'")}' }`;
        if (subIndex < semester.subjects.length - 1) {
          booklistsObject += ',';
        }
        booklistsObject += '\n';
      });
      
      booklistsObject += `          ]\n`;
      booklistsObject += `        }`;
      if (semIndex < tech.semesters.length - 1) {
        booklistsObject += ',';
      }
      booklistsObject += '\n';
    });
    
    booklistsObject += `      ]\n`;
    booklistsObject += `    }`;
    if (index < technologies.length - 1) {
      booklistsObject += ',';
    }
    booklistsObject += '\n';
  });
  
  booklistsObject += '  };';
  
  return { booklistsObject, technologies };
}

// Generate the HARDCODED_TECHNOLOGIES array
function generateTechnologiesList(technologies) {
  let technologiesList = '  private static readonly HARDCODED_TECHNOLOGIES: BooklistItem[] = [\n';
  
  technologies.forEach((tech, index) => {
    technologiesList += `    {\n`;
    technologiesList += `      name: '${tech.technologyName}',\n`;
    technologiesList += `      code: '${tech.technologyCode}',\n`;
    technologiesList += `      url: 'https://btebresultshub.com/booklists/${tech.slug}-2022',\n`;
    technologiesList += `      slug: '${tech.slug}',\n`;
    technologiesList += `      regulation: '2022' as const\n`;
    technologiesList += `    }`;
    if (index < technologies.length - 1) {
      technologiesList += ',';
    }
    technologiesList += '\n';
  });
  
  technologiesList += '  ];';
  
  return technologiesList;
}

// Run the parser and generate files
const { booklistsObject, technologies } = generateUpdatedService();
const technologiesList = generateTechnologiesList(technologies);

console.log('Generated booklist service data');
console.log(`Total technologies: ${technologies.length}`);
console.log('Technologies found:');
technologies.forEach(tech => {
  console.log(`- ${tech.technologyName} (${tech.technologyCode}) - ${tech.semesters.length} semesters`);
});

// Write the complete service file
const serviceContent = `import { BooklistItem, TechnologyBooklist, Subject, SemesterData } from './types';

export class BooklistService {
  // Hardcoded list of all 2022 regulation technologies
  private static readonly HARDCODED_TECHNOLOGIES: BooklistItem[] = [
${technologiesList.split('\n').slice(1, -1).join('\n')}
  ];

  // Detailed booklist data for each technology
${booklistsObject}

  /**
   * Get all available technologies (2022 regulation only)
   */
  public static getBooklistData(): { data: { technologies: BooklistItem[] } | null; error: string } {
    try {
      return {
        data: { technologies: this.HARDCODED_TECHNOLOGIES },
        error: ''
      };
    } catch (error) {
      return {
        data: null,
        error: 'Failed to load booklist data'
      };
    }
  }

  /**
   * Search technologies by name or code
   */
  public static searchTechnologies(technologies: BooklistItem[], searchTerm: string): BooklistItem[] {
    if (!searchTerm.trim()) {
      return technologies;
    }

    const term = searchTerm.toLowerCase();
    return technologies.filter(tech => 
      tech.name.toLowerCase().includes(term) || 
      tech.code.toLowerCase().includes(term)
    );
  }

  /**
   * Get technology by slug
   */
  public static getTechnologyBySlug(slug: string): BooklistItem | null {
    return this.HARDCODED_TECHNOLOGIES.find(tech => tech.slug === slug) || null;
  }

  /**
   * Get detailed booklist for a specific technology
   */
  public static getTechnologyBooklist(slug: string): { data: TechnologyBooklist | null; error: string } {
    try {
      const booklist = this.TECHNOLOGY_BOOKLISTS[slug];
      if (booklist) {
        return {
          data: booklist,
          error: ''
        };
      } else {
        return {
          data: null,
          error: 'Technology booklist not found'
        };
      }
    } catch (error) {
      return {
        data: null,
        error: 'Failed to load technology booklist'
      };
    }
  }
}`;

// Write the service file
const servicePath = path.join(__dirname, '../services/booklistService.ts');
fs.writeFileSync(servicePath, serviceContent);

console.log(`\n✅ Successfully generated booklistService.ts with ${technologies.length} technologies`);
console.log(`📁 File saved to: ${servicePath}`);
console.log(`📊 Total semesters across all technologies: ${technologies.reduce((sum, tech) => sum + tech.semesters.length, 0)}`);
console.log(`📚 Total subjects across all technologies: ${technologies.reduce((sum, tech) => sum + tech.semesters.reduce((semSum, sem) => semSum + sem.subjects.length, 0), 0)}`);
