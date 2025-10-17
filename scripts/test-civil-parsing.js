const fs = require('fs');
const path = require('path');

// Test parsing the Civil Technology HTML
async function testCivilParsing() {
  const htmlPath = path.join(__dirname, '../data/test-civil-technology.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  console.log('HTML length:', html.length);
  
  // Look for different JSON patterns
  const patterns = [
    /"bookListData":\s*({[^}]+})/,
    /bookListData.*?({.*?})/,
    /"result":\s*({[^}]+})/,
    /"data":\s*(\[[^\]]+\])/,
    /"books":\s*(\[[^\]]+\])/
  ];
  
  patterns.forEach((pattern, index) => {
    const match = html.match(pattern);
    if (match) {
      console.log(`\nPattern ${index + 1} found:`, match[1].substring(0, 200) + '...');
    } else {
      console.log(`\nPattern ${index + 1}: No match`);
    }
  });
  
  // Look for the specific data we saw in the HTML
  const specificMatch = html.match(/"data":\s*\[(.*?)\]/s);
  if (specificMatch) {
    console.log('\nFound data array:', specificMatch[1].substring(0, 500) + '...');
  }
  
  // Look for semester patterns
  const semesterMatches = html.match(/"semester":\s*\d+/g);
  console.log('\nSemester matches:', semesterMatches);
  
  // Look for subject code patterns
  const subjectMatches = html.match(/"subCode":\s*"[^"]+"/g);
  console.log('\nSubject code matches:', subjectMatches?.slice(0, 10));
  
  // Look for subject name patterns
  const nameMatches = html.match(/"subName":\s*"[^"]+"/g);
  console.log('\nSubject name matches:', nameMatches?.slice(0, 10));
}

testCivilParsing();









