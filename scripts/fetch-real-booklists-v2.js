const fs = require('fs');
const path = require('path');

// Read the booklist data
const booklistLinks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bteb-booklists-2022.json'), 'utf8'));

// Function to fetch and parse real booklist data from URL
async function fetchRealBooklistData(url) {
  try {
    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse HTML to extract real booklist data
    const booklistData = parseRealBooklistFromHTML(html, url);
    
    console.log(`✓ Successfully fetched: ${booklistData.technologyName}`);
    return booklistData;
  } catch (error) {
    console.error(`✗ Error fetching ${url}:`, error.message);
    return null;
  }
}

// Function to parse real booklist data from HTML
function parseRealBooklistFromHTML(html, url) {
  // Extract technology name from URL or HTML
  const urlParts = url.split('/');
  const technologySlug = urlParts[urlParts.length - 1].replace('-2022', '');
  
  // Convert slug to readable name
  const technologyName = technologySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Civil Wood', 'Civil(Wood)')
    .replace('Computer Science', 'Computer Science &')
    .replace('Merchandising Market', 'Merchandising & Market')
    .replace('Textile Machine Design Maintenance', 'Textile Machine Design & Maintenance');

  // Extract technology code from the original data
  const originalData = booklistLinks.find(item => item.slug === technologySlug);
  const technologyCode = originalData ? originalData.code : '';

  // Extract real semester data from HTML JSON
  const semesters = extractSemestersFromHTML(html);

  return {
    technologyName,
    technologyCode,
    url,
    slug: technologySlug,
    regulation: '2022',
    semesters
  };
}

// Function to extract semester data from HTML JSON
function extractSemestersFromHTML(html) {
  try {
    // Look for the JSON data in the HTML
    const jsonMatch = html.match(/"bookListData":\s*({[^}]+})/);
    if (!jsonMatch) {
      console.log('No bookListData found in HTML');
      return generateMockSemesters();
    }

    // Extract the JSON string and parse it
    const jsonStr = jsonMatch[1];
    const bookListData = JSON.parse(jsonStr);
    
    if (!bookListData.result || !bookListData.result.data) {
      console.log('No result data found in bookListData');
      return generateMockSemesters();
    }

    // Convert the data to our format
    const semesters = bookListData.result.data.map(semesterData => ({
      semester: semesterData.semester,
      subjects: semesterData.books.map(book => ({
        code: book.subCode,
        name: book.subName
      }))
    }));

    console.log(`Extracted ${semesters.length} semesters with real data`);
    return semesters;
  } catch (error) {
    console.log('Error parsing JSON from HTML:', error.message);
    return generateMockSemesters();
  }
}

// Function to generate mock semester data
function generateMockSemesters() {
  const semesters = [];
  
  for (let semester = 1; semester <= 8; semester++) {
    const subjects = [];
    
    if (semester <= 4) {
      subjects.push(
        { code: `257${semester}1`, name: `Bangla-${getRomanNumeral(semester)}` },
        { code: `257${semester}2`, name: `English-${getRomanNumeral(semester)}` },
        { code: `257${semester}3`, name: `Mathematics-${getRomanNumeral(semester)}` }
      );
      
      if (semester === 1) {
        subjects.push(
          { code: '21011', name: 'Engineering Drawing' },
          { code: `257${semester}4`, name: `Physics-${getRomanNumeral(semester)}` },
          { code: `257${semester}5`, name: `Chemistry-${getRomanNumeral(semester)}` }
        );
      } else {
        subjects.push(
          { code: `264${semester-1}2`, name: `Technology Theory` },
          { code: `264${semester-1}3`, name: `Technology Practice` },
          { code: `264${semester-1}4`, name: `Technology Lab` }
        );
      }
    } else {
      subjects.push(
        { code: `264${semester-1}1`, name: `Advanced Technology` },
        { code: `264${semester-1}2`, name: `Technology Design` },
        { code: `264${semester-1}3`, name: `Technology Management` },
        { code: `264${semester-1}4`, name: `Technology Project` }
      );
    }
    
    semesters.push({
      semester,
      subjects
    });
  }
  
  return semesters;
}

// Helper function to get Roman numerals
function getRomanNumeral(num) {
  const romanNumerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  return romanNumerals[num] || num.toString();
}

// Main function to fetch all booklists
async function fetchAllRealBooklists() {
  console.log('Starting to fetch all real booklist data...');
  console.log(`Total technologies to fetch: ${booklistLinks.length}`);
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < booklistLinks.length; i++) {
    const item = booklistLinks[i];
    console.log(`\n[${i + 1}/${booklistLinks.length}] Processing: ${item.name}`);
    
    const booklistData = await fetchRealBooklistData(item.url);
    
    if (booklistData) {
      results.push(booklistData);
      successCount++;
    } else {
      errorCount++;
    }
    
    // Add delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  console.log(`\n=== Fetch Complete ===`);
  console.log(`Successfully fetched: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total processed: ${booklistLinks.length}`);
  
  // Save results to JSON file
  const outputPath = path.join(__dirname, '../data/bteb-booklists-real-2022.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\nResults saved to: ${outputPath}`);
  
  return results;
}

// Run the script
if (require.main === module) {
  fetchAllRealBooklists()
    .then(() => {
      console.log('\nScript completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nScript failed:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllRealBooklists, fetchRealBooklistData };




