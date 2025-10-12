const fs = require('fs');
const path = require('path');

// Test fetching a single booklist to see the HTML structure
async function testSingleBooklist() {
  const testUrl = 'https://btebresultshub.com/booklists/civil-technology-2022';
  
  try {
    console.log(`Testing: ${testUrl}`);
    
    const response = await fetch(testUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    console.log('HTML length:', html.length);
    console.log('\nFirst 1000 characters:');
    console.log(html.substring(0, 1000));
    
    // Save HTML to file for inspection
    const htmlPath = path.join(__dirname, '../data/test-civil-technology.html');
    fs.writeFileSync(htmlPath, html);
    console.log(`\nHTML saved to: ${htmlPath}`);
    
    // Look for semester patterns
    const semesterMatches = html.match(/semester\s*\d+/gi);
    console.log('\nSemester matches:', semesterMatches);
    
    // Look for subject code patterns
    const subjectMatches = html.match(/\d{5}\s*[-:]\s*[^<\n]+/g);
    console.log('\nSubject matches:', subjectMatches?.slice(0, 10));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSingleBooklist();




