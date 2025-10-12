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
    
    // Technology header (e.g., "Architecture Technology (61)")
    if (line.includes('Technology (') && line.includes(')')) {
      if (currentTech) {
        // Save previous technology
        if (currentSemester) {
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
          .replace(/textile-machine-design-maintenance/, 'textile-machine-design-maintenance');
        
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
  
  return booklistsObject;
}

// Run the parser
const result = generateUpdatedService();
console.log('Generated booklist service data');
console.log('First few lines:');
console.log(result.split('\n').slice(0, 20).join('\n'));
console.log('...');
console.log('Total lines:', result.split('\n').length);






