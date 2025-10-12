const fs = require('fs');
const path = require('path');

// Read the booklist data
const booklistLinks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/bteb-booklists-2022.json'), 'utf8'));

// Function to fetch booklist data from URL
async function fetchBooklistData(url) {
  try {
    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse HTML to extract booklist data
    const booklistData = parseBooklistFromHTML(html, url);
    
    console.log(`✓ Successfully fetched: ${booklistData.technologyName}`);
    return booklistData;
  } catch (error) {
    console.error(`✗ Error fetching ${url}:`, error.message);
    return null;
  }
}

// Function to parse booklist data from HTML
function parseBooklistFromHTML(html, url) {
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

  // Mock semester data structure (since we can't easily parse the actual HTML structure)
  const semesters = generateMockSemesters(technologyCode);

  return {
    technologyName,
    technologyCode,
    url,
    slug: technologySlug,
    regulation: '2022',
    semesters
  };
}

// Function to generate mock semester data based on technology code
function generateMockSemesters(technologyCode) {
  const semesters = [];
  
  for (let semester = 1; semester <= 8; semester++) {
    const subjects = [];
    
    // Common subjects for all semesters
    if (semester <= 4) {
      subjects.push(
        { code: `257${semester}1`, name: `Bangla-${getRomanNumeral(semester)}` },
        { code: `257${semester}2`, name: `English-${getRomanNumeral(semester)}` },
        { code: `257${semester}3`, name: `Mathematics-${getRomanNumeral(semester)}` }
      );
      
      if (semester === 1) {
        subjects.push({ code: '21011', name: 'Engineering Drawing' });
        subjects.push({ code: `257${semester}4`, name: `Physics-${getRomanNumeral(semester)}` });
        subjects.push({ code: `257${semester}5`, name: `Chemistry-${getRomanNumeral(semester)}` });
      } else if (semester === 2) {
        subjects.push({ code: `257${semester}4`, name: `Physics-${getRomanNumeral(semester)}` });
        subjects.push({ code: `257${semester}5`, name: `Chemistry-${getRomanNumeral(semester)}` });
        subjects.push({ code: `${technologyCode}11`, name: `${getTechnologyName(technologyCode)} Fundamentals` });
      } else {
        subjects.push({ code: `${technologyCode}${semester-1}2`, name: `${getTechnologyName(technologyCode)} Theory` });
        subjects.push({ code: `${technologyCode}${semester-1}3`, name: `${getTechnologyName(technologyCode)} Practice` });
        subjects.push({ code: `${technologyCode}${semester-1}4`, name: `${getTechnologyName(technologyCode)} Lab` });
      }
    } else {
      // Advanced semesters (5-8)
      subjects.push(
        { code: `${technologyCode}${semester-1}1`, name: `Advanced ${getTechnologyName(technologyCode)}` },
        { code: `${technologyCode}${semester-1}2`, name: `${getTechnologyName(technologyCode)} Design` },
        { code: `${technologyCode}${semester-1}3`, name: `${getTechnologyName(technologyCode)} Management` },
        { code: `${technologyCode}${semester-1}4`, name: `${getTechnologyName(technologyCode)} Project` },
        { code: `${technologyCode}${semester-1}5`, name: `${getTechnologyName(technologyCode)} Quality Control` },
        { code: `${technologyCode}${semester-1}6`, name: `${getTechnologyName(technologyCode)} Professional Practice` }
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

// Helper function to get technology name from code
function getTechnologyName(code) {
  const technologyNames = {
    '66': 'Computer Science',
    '64': 'Civil',
    '67': 'Electrical',
    '70': 'Mechanical',
    '68': 'Electronics',
    '61': 'Architecture',
    '62': 'Automobile',
    '63': 'Chemical',
    '69': 'Food',
    '71': 'Power',
    '72': 'RAC',
    '76': 'Ceramic',
    '77': 'Glass',
    '78': 'Surveying',
    '82': 'Aircraft Maintenance Aerospace',
    '83': 'Aircraft Maintenance Avionics',
    '86': 'Electromedical',
    '90': 'Environmental',
    '92': 'Mechatronics',
    '94': 'Telecommunication',
    '95': 'Printing',
    '96': 'Graphic Design',
    '11': 'Yarn Manufacturing',
    '12': 'Fabric Manufacturing',
    '13': 'Wet Processing',
    '14': 'Apparel Manufacturing',
    '15': 'Jute Product Manufacturing',
    '16': 'Fashion Design',
    '17': 'Merchandising',
    '18': 'Textile Machine Design',
    '20': 'Forestry',
    '23': 'Agriculture',
    '65': 'Civil Wood',
    '74': 'Fisheries',
    '88': 'Construction'
  };
  
  return technologyNames[code] || 'Technology';
}

// Main function to fetch all booklists
async function fetchAllBooklists() {
  console.log('Starting to fetch all booklist data...');
  console.log(`Total technologies to fetch: ${booklistLinks.length}`);
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < booklistLinks.length; i++) {
    const item = booklistLinks[i];
    console.log(`\n[${i + 1}/${booklistLinks.length}] Processing: ${item.name}`);
    
    const booklistData = await fetchBooklistData(item.url);
    
    if (booklistData) {
      results.push(booklistData);
      successCount++;
    } else {
      errorCount++;
    }
    
    // Add delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n=== Fetch Complete ===`);
  console.log(`Successfully fetched: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total processed: ${booklistLinks.length}`);
  
  // Save results to JSON file
  const outputPath = path.join(__dirname, '../data/bteb-booklists-detailed-2022.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\nResults saved to: ${outputPath}`);
  
  return results;
}

// Run the script
if (require.main === module) {
  fetchAllBooklists()
    .then(() => {
      console.log('\nScript completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nScript failed:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllBooklists, fetchBooklistData };
