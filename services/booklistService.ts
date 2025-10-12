export interface BooklistItem {
  name: string;
  code: string;
  url: string;
  slug: string;
  regulation: '2016' | '2022';
}

export interface Subject {
  code: string;
  name: string;
}

export interface SemesterData {
  semester: number;
  subjects: Subject[];
}

export interface TechnologyBooklist {
  technologyName: string;
  technologyCode: string;
  semesters: SemesterData[];
}

export class BooklistService {
  // Hardcoded list of all 2022 regulation technologies
  private static readonly HARDCODED_TECHNOLOGIES: BooklistItem[] = [
    {
      name: 'Aircraft Maintenance (Aerospace) Technology',
      code: '82',
      url: 'https://btebresultshub.com/booklists/aircraft-maintenance-aerospace-technology-technology-2022',
      slug: 'aircraft-maintenance-aerospace-technology-technology',
      regulation: '2022' as const
    },
    {
      name: 'Aircraft Maintenance (Avionics) Technology',
      code: '83',
      url: 'https://btebresultshub.com/booklists/aircraft-maintenance-avionics-technology-technology-2022',
      slug: 'aircraft-maintenance-avionics-technology-technology',
      regulation: '2022' as const
    },
    {
      name: 'Apparel Manufacturing',
      code: '14',
      url: 'https://btebresultshub.com/booklists/apparel-manufacturing-2022',
      slug: 'apparel-manufacturing',
      regulation: '2022' as const
    },
    {
      name: 'Architecture Technology',
      code: '61',
      url: 'https://btebresultshub.com/booklists/architecture-technology-2022',
      slug: 'architecture-technology',
      regulation: '2022' as const
    },
    {
      name: 'Automobile Technology',
      code: '62',
      url: 'https://btebresultshub.com/booklists/automobile-technology-2022',
      slug: 'automobile-technology',
      regulation: '2022' as const
    },
    {
      name: 'Ceramic Technology',
      code: '76',
      url: 'https://btebresultshub.com/booklists/ceramic-technology-2022',
      slug: 'ceramic-technology',
      regulation: '2022' as const
    },
    {
      name: 'Chemical Technology',
      code: '63',
      url: 'https://btebresultshub.com/booklists/chemical-technology-2022',
      slug: 'chemical-technology',
      regulation: '2022' as const
    },
    {
      name: 'Civil Technology',
      code: '64',
      url: 'https://btebresultshub.com/booklists/civil-technology-2022',
      slug: 'civil-technology',
      regulation: '2022' as const
    },
    {
      name: 'Civil(Wood) Technology',
      code: '65',
      url: 'https://btebresultshub.com/booklists/civilwood-technology-2022',
      slug: 'civilwood-technology',
      regulation: '2022' as const
    },
    {
      name: 'Computer Science & Technology',
      code: '66',
      url: 'https://btebresultshub.com/booklists/computer-science-technology-2022',
      slug: 'computer-science-technology',
      regulation: '2022' as const
    },
    {
      name: 'Construction Technology',
      code: '88',
      url: 'https://btebresultshub.com/booklists/construction-technology-2022',
      slug: 'construction-technology',
      regulation: '2022' as const
    },
    {
      name: 'Diploma In Agriculture',
      code: '23',
      url: 'https://btebresultshub.com/booklists/diploma-in-agriculture-2022',
      slug: 'diploma-in-agriculture',
      regulation: '2022' as const
    },
    {
      name: 'Diploma In Fisheries',
      code: '74',
      url: 'https://btebresultshub.com/booklists/diploma-in-fisheries-2022',
      slug: 'diploma-in-fisheries',
      regulation: '2022' as const
    },
    {
      name: 'Diploma In Forestry',
      code: '20',
      url: 'https://btebresultshub.com/booklists/diploma-in-forestry-2022',
      slug: 'diploma-in-forestry',
      regulation: '2022' as const
    },
    {
      name: 'Electrical Technology',
      code: '67',
      url: 'https://btebresultshub.com/booklists/electrical-technology-2022',
      slug: 'electrical-technology',
      regulation: '2022' as const
    },
    {
      name: 'Electromedical Technology',
      code: '86',
      url: 'https://btebresultshub.com/booklists/electromedical-technology-2022',
      slug: 'electromedical-technology',
      regulation: '2022' as const
    },
    {
      name: 'Electronics Technology',
      code: '68',
      url: 'https://btebresultshub.com/booklists/electronics-technology-2022',
      slug: 'electronics-technology',
      regulation: '2022' as const
    },
    {
      name: 'Environmental Technology',
      code: '90',
      url: 'https://btebresultshub.com/booklists/environmental-technology-2022',
      slug: 'environmental-technology',
      regulation: '2022' as const
    },
    {
      name: 'Fabric Manufacturing',
      code: '12',
      url: 'https://btebresultshub.com/booklists/fabric-manufacturing-2022',
      slug: 'fabric-manufacturing',
      regulation: '2022' as const
    },
    {
      name: 'Fashion Design',
      code: '16',
      url: 'https://btebresultshub.com/booklists/fashion-design-2022',
      slug: 'fashion-design',
      regulation: '2022' as const
    },
    {
      name: 'Food Technology',
      code: '69',
      url: 'https://btebresultshub.com/booklists/food-technology-2022',
      slug: 'food-technology',
      regulation: '2022' as const
    },
    {
      name: 'Glass Technology',
      code: '77',
      url: 'https://btebresultshub.com/booklists/glass-technology-2022',
      slug: 'glass-technology',
      regulation: '2022' as const
    },
    {
      name: 'Graphic Design Technology',
      code: '96',
      url: 'https://btebresultshub.com/booklists/graphic-design-technology-2022',
      slug: 'graphic-design-technology',
      regulation: '2022' as const
    },
    {
      name: 'Jute Product Manufacturing',
      code: '15',
      url: 'https://btebresultshub.com/booklists/jute-product-manufacturing-2022',
      slug: 'jute-product-manufacturing',
      regulation: '2022' as const
    },
    {
      name: 'Mechanical Technology',
      code: '70',
      url: 'https://btebresultshub.com/booklists/mechanical-technology-2022',
      slug: 'mechanical-technology',
      regulation: '2022' as const
    },
    {
      name: 'Mechatronics Technology',
      code: '92',
      url: 'https://btebresultshub.com/booklists/mechatronics-technology-2022',
      slug: 'mechatronics-technology',
      regulation: '2022' as const
    },
    {
      name: 'Merchandising & Market',
      code: '17',
      url: 'https://btebresultshub.com/booklists/merchandising-market-2022',
      slug: 'merchandising-market',
      regulation: '2022' as const
    },
    {
      name: 'Power Technology',
      code: '71',
      url: 'https://btebresultshub.com/booklists/power-technology-2022',
      slug: 'power-technology',
      regulation: '2022' as const
    },
    {
      name: 'Printing Technology',
      code: '95',
      url: 'https://btebresultshub.com/booklists/printing-technology-2022',
      slug: 'printing-technology',
      regulation: '2022' as const
    },
    {
      name: 'RAC Technology',
      code: '72',
      url: 'https://btebresultshub.com/booklists/rac-technology-2022',
      slug: 'rac-technology',
      regulation: '2022' as const
    },
    {
      name: 'Surveying Technology',
      code: '78',
      url: 'https://btebresultshub.com/booklists/surveying-technology-2022',
      slug: 'surveying-technology',
      regulation: '2022' as const
    },
    {
      name: 'Telecommunication Technology',
      code: '94',
      url: 'https://btebresultshub.com/booklists/telecommunication-technology-2022',
      slug: 'telecommunication-technology',
      regulation: '2022' as const
    },
    {
      name: 'Textile Machine Design & Maintenance',
      code: '18',
      url: 'https://btebresultshub.com/booklists/textile-machine-design-maintenance-2022',
      slug: 'textile-machine-design-maintenance',
      regulation: '2022' as const
    },
    {
      name: 'Wet Processing',
      code: '13',
      url: 'https://btebresultshub.com/booklists/wet-processing-2022',
      slug: 'wet-processing',
      regulation: '2022' as const
    },
    {
      name: 'Yarn Manufacturing',
      code: '11',
      url: 'https://btebresultshub.com/booklists/yarn-manufacturing-2022',
      slug: 'yarn-manufacturing',
      regulation: '2022' as const
    }
  ];

  // Detailed booklist data for each technology
  private static readonly TECHNOLOGY_BOOKLISTS: Record<string, TechnologyBooklist> = {
    'aircraft-maintenance-aerospace-technology-technology': {
      technologyName: 'Aircraft Maintenance (Aerospace) Technology',
      technologyCode: '82',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '28211', name: 'Basic Aerodynamics' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25913', name: 'Chemistry' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '28221', name: 'Aircraft Structure & Repair' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '28231', name: 'Aircraft Materials' },
            { code: '28232', name: 'Principles of Gas Turbine Engine' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '28241', name: 'Aircraft Fuel and Fire Protection System' },
            { code: '28242', name: 'Aircraft Pneumatic & Ice-Rain Protection' },
            { code: '28243', name: 'Aircraft Hardware' },
            { code: '28244', name: 'Aircraft Hydraulic & Flight Controls' },
            { code: '28245', name: 'Aircraft Gas Turbine Engine Construction and systems' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '28251', name: 'Gas Turbine Engine Starting and Monitoring' },
            { code: '28252', name: 'Aircraft Landing Gear' },
            { code: '28253', name: 'Airconditioning and Pressurization system' },
            { code: '28254', name: 'Aircraft Propellers' },
            { code: '28255', name: 'Helicopter Aerodynamics and Structures' },
            { code: '28356', name: 'Aircraft Digital Technique' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '28261', name: 'Aircraft Equipment and Furnishing' },
            { code: '28262', name: 'Helicopter Controls and Systems' },
            { code: '28263', name: 'Engineering Ethics' },
            { code: '28355', name: 'Aircraft Instrument System' },
            { code: '28363', name: 'Aircraft Electrical Power' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '28271', name: 'Aviation Legislation-Framework' },
            { code: '28272', name: 'Air Navigation Orders' },
            { code: '28273', name: 'Aircraft Maintenance Practices' },
            { code: '28371', name: 'Human Factors' },
            { code: '28372', name: 'Aircraft Cabin & Information System' },
            { code: '28373', name: 'Safety Management system and Reliability Program' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'aircraft-maintenance-avionics-technology-technology': {
      technologyName: 'Aircraft Maintenance (Avionics) Technology',
      technologyCode: '83',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '28211', name: 'Basic Aerodynamics' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25913', name: 'Chemistry' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '28221', name: 'Aircraft Structure & Repair' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '28231', name: 'Aircraft Materials' },
            { code: '28331', name: 'Aircraft DC Power System' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '28243', name: 'Aircraft Hardware' },
            { code: '28341', name: 'Aircraft AC Power' },
            { code: '28342', name: 'Aircraft Radio and Radar' },
            { code: '28343', name: 'Aircraft Communication System' },
            { code: '28344', name: 'Aircraft System I' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '28351', name: 'Turbine Engine Principles and Construction' },
            { code: '28352', name: 'Aircraft Electronics' },
            { code: '28353', name: 'Aircraft System- II' },
            { code: '28354', name: 'Aircraft Navigation System' },
            { code: '28355', name: 'Aircraft Instrument System' },
            { code: '28356', name: 'Aircraft Digital Technique' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '28263', name: 'Engineering Ethics' },
            { code: '28361', name: 'Aircraft Autopilot System' },
            { code: '28362', name: 'Electronics Instrument System' },
            { code: '28363', name: 'Aircraft Electrical Power' },
            { code: '28364', name: 'Propulsion' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '28271', name: 'Aviation Legislation-Framework' },
            { code: '28272', name: 'Air Navigation Orders' },
            { code: '28273', name: 'Aircraft Maintenance Practices' },
            { code: '28371', name: 'Human Factors' },
            { code: '28372', name: 'Aircraft Cabin & Information System' },
            { code: '28373', name: 'Safety Management system and Reliability Program' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'apparel-manufacturing': {
      technologyName: 'Apparel Manufacturing',
      technologyCode: '14',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21262', name: 'Advance Fabric Structure & Design' },
            { code: '21461', name: 'Commercial Issues in Apparel Business' },
            { code: '21462', name: 'Application of Computer in Apparel Manufacturing' },
            { code: '21463', name: 'Garments Washing & Dyeing' },
            { code: '21761', name: 'Fundamental of Merchandising' },
            { code: '25851', name: 'Principles of Marketing' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21471', name: 'Special Apparel Production' },
            { code: '21472', name: 'Compliance in Apparel Industry' },
            { code: '21875', name: 'Apparel Manufacturing Machinery and Maintenance' },
            { code: '25852', name: 'Industrial Management' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21481', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'architecture-technology': {
      technologyName: 'Architecture Technology',
      technologyCode: '61',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26111', name: 'Creativity and Concept Development' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26121', name: 'Architectural Design-I' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26611', name: 'Computer Office Application' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26131', name: 'Architectural Design-II' },
            { code: '26132', name: 'Architectural Graphics' },
            { code: '26133', name: 'Working Drawing-I' },
            { code: '26134', name: 'Climatology' },
            { code: '26135', name: 'Computer Aided Drawing -I' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25841', name: 'Accounting' },
            { code: '26141', name: 'Architectural Design-III' },
            { code: '26142', name: 'History of Architecture-I' },
            { code: '26143', name: 'Working Drawing -II' },
            { code: '26144', name: 'Computer Aided Drawing -II' },
            { code: '26434', name: 'Basic Construction Process' },
            { code: '26447', name: 'Basic Estimating & Costing' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '26151', name: 'Architectural Design-IV' },
            { code: '26152', name: 'History of Architecture-II' },
            { code: '26153', name: 'Model Making' },
            { code: '26154', name: 'Presentation and Visual Technique' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26457', name: 'Water Supply and Sanitary Engineering' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26161', name: 'Architectural Design-V' },
            { code: '26162', name: 'Computer Rendering and Animation-I' },
            { code: '26163', name: 'Landscape Design' },
            { code: '26164', name: 'Modern Architecture' },
            { code: '26165', name: 'Interior Design -I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26171', name: 'Architectural Project' },
            { code: '26172', name: 'Computer Rendering and Animation-II' },
            { code: '26173', name: 'Urban Planning' },
            { code: '26174', name: 'Professional Practice' },
            { code: '26175', name: 'Interior Design -II' },
            { code: '26435', name: 'Fundamental Surveying' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26181', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'automobile-technology': {
      technologyName: 'Automobile Technology',
      technologyCode: '62',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26211', name: 'Automobile Fundamentals' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26221', name: 'Automotive Engine System-I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27012', name: 'Machine Shop Practice I' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26231', name: 'Automotive Engine System-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27022', name: 'Mechanical Engineering Materials' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26241', name: 'Automotive Body Building' },
            { code: '27041', name: 'Engineering Mechanics' },
            { code: '27043', name: 'Metallurgy' },
            { code: '27131', name: 'Engineering Thermodynamics' },
            { code: '27142', name: 'Fuels & Lubricants' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26251', name: 'Automobile Air- Conditioning' },
            { code: '26252', name: 'Advance Automotive Mechanisms' },
            { code: '27051', name: 'Fluid Mechanics & Machineries' },
            { code: '27052', name: 'Mechanical Estimating & Costing' },
            { code: '27053', name: 'Advanced Welding-I' },
            { code: '27055', name: 'Manufacturing Process' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '26261', name: 'Engine Overhauling & Inspection' },
            { code: '26262', name: 'Suspension, Brake, Steering & Transmission System of Vehicle' },
            { code: '26263', name: 'Specialized Vehicles, Two & Three Wheelers' },
            { code: '27054', name: 'Foundry & Pattern Making' },
            { code: '27061', name: 'Strength of Materials' },
            { code: '27062', name: 'Mechanical Measurement & Metrology' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26271', name: 'Electrical, Electronic & Vehicle Networking System' },
            { code: '26272', name: 'Automotive Testing & Emission Control' },
            { code: '26273', name: 'Shop Equipment, Service Station Operation & Workshop Practice' },
            { code: '26274', name: 'Automobile Engineering Project' },
            { code: '27071', name: 'Design of Machine Elements' },
            { code: '29231', name: 'Mechatronics & PLC' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26281', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'ceramic-technology': {
      technologyName: 'Ceramic Technology',
      technologyCode: '76',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27611', name: 'Geological Engineering' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27621', name: 'Ceramic Model Making' },
            { code: '27622', name: 'Ceramic Engineering Materials-I' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27631', name: 'Model and Mould Fabrication-I' },
            { code: '27632', name: 'Ceramic Engineering Materials-II' },
            { code: '27633', name: 'Ceramic Plants and Equipment' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25841', name: 'Accounting' },
            { code: '27641', name: 'Ceramic Test and Calculation' },
            { code: '27642', name: 'Ceramic Engineering Chemistry' },
            { code: '27643', name: 'Refractories' },
            { code: '27644', name: 'Model and Mould Fabrication-II' },
            { code: '27645', name: 'Ceramic Body Preparation' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '27651', name: 'White Wares' },
            { code: '27652', name: 'Heavy Clay Products' },
            { code: '27653', name: 'Ceramic Instrumentation and Process Control' },
            { code: '27654', name: 'Ceramic Fabrication and Drying' },
            { code: '27655', name: 'Cement Manufacturing' },
            { code: '27656', name: 'Fuels and Combustion' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '27661', name: 'Tiles and Sanitary Wares' },
            { code: '27662', name: 'Drier, Kiln and Furnace' },
            { code: '27663', name: 'Ceramic Quality Control' },
            { code: '27664', name: 'Ceramic Glaze and Colour' },
            { code: '27665', name: 'Ceramic Decoration and Printing' },
            { code: '27745', name: 'Graphics Design' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27063', name: 'CAD & CAM' },
            { code: '27671', name: 'Ceramic Engineering Project' },
            { code: '27672', name: 'Advanced Ceramic Products' },
            { code: '27673', name: 'Kiln, Furnace Design and Construction' },
            { code: '27674', name: 'Glass Manufacturing' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27681', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'chemical-technology': {
      technologyName: 'Chemical Technology',
      technologyCode: '63',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26311', name: 'Chemical Engineering Fundamentals' },
            { code: '26312', name: 'Safety in Chemical Industry' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26321', name: 'Basic Stoichiometry' },
            { code: '26322', name: 'Chemical Engineering Drawing' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26331', name: 'Chemical Engineering Operation-I' },
            { code: '26332', name: 'Industrial Chemistry' },
            { code: '26333', name: 'Chemical Engineering Materials' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25841', name: 'Accounting' },
            { code: '26341', name: 'Chemical Engineering Operation-II' },
            { code: '26342', name: 'Chemical Process Industries-I' },
            { code: '26343', name: 'Oil, Fats & Waxes' },
            { code: '26344', name: 'Analytical Chemistry' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27041', name: 'Engineering Mechanics' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26351', name: 'Chemical Engineering Operation-III' },
            { code: '26352', name: 'Chemical Process Industries-II' },
            { code: '26353', name: 'Water Treatment Technology' },
            { code: '26354', name: 'Industrial Instrumentation & Process Control' },
            { code: '26355', name: 'Refrigeration & Cold Storage' },
            { code: '26356', name: 'Industrial Production Engineering' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '26361', name: 'Chemical Engineering Operation-IV' },
            { code: '26362', name: 'Chemical Process Industries-III' },
            { code: '26363', name: 'Petroleum & Petrochemicals' },
            { code: '26364', name: 'Industrial Stoichiometry & Thermodynamics' },
            { code: '26365', name: 'Instrumental Methods of Analysis' },
            { code: '26366', name: 'Jute & Textile Technology' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26371', name: 'Chemical Engineering Operation-V' },
            { code: '26372', name: 'Chemical Process Industries-IV' },
            { code: '26373', name: 'Natural Gas & Fertilizer' },
            { code: '26374', name: 'Plastic & Polymer Technology' },
            { code: '26375', name: 'Corrosion Technology' },
            { code: '26376', name: 'Chemical Engineering Project' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26381', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'civil-technology': {
      technologyName: 'Civil Technology',
      technologyCode: '64',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26421', name: 'Civil Engineering Drawing' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26432', name: 'Surveying-I' },
            { code: '26433', name: 'Construction Process-I' },
            { code: '26611', name: 'Computer Office Application' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26441', name: 'Construction Process-II' },
            { code: '26442', name: 'Estimating & Costing-I' },
            { code: '26443', name: 'Civil CAD-I' },
            { code: '26444', name: 'Surveying-II' },
            { code: '26445', name: 'Geotechnical Engineering' },
            { code: '26446', name: 'Hydrology' },
            { code: '26521', name: 'Wood Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26451', name: 'Foundation Engineering' },
            { code: '26452', name: 'Civil CAD-II' },
            { code: '26453', name: 'Surveying-III' },
            { code: '26454', name: 'Theory of Structure' },
            { code: '26455', name: 'Water Supply Engineering' },
            { code: '26456', name: 'Hydraulics' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26461', name: 'Water Resources Engineering' },
            { code: '26462', name: 'Advance Surveying' },
            { code: '26463', name: 'Transportation Engineering-I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '28863', name: 'Steel Structures' },
            { code: '28861', name: 'Advanced Construction' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26471', name: 'Civil Engineering Project' },
            { code: '26472', name: 'Sanitary Engineering' },
            { code: '26473', name: 'Transportation Engineering-II' },
            { code: '26474', name: 'Design of Structure-II' },
            { code: '26475', name: 'Estimating & Costing-II' },
            { code: '28871', name: 'Construction Management & Documentation' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26481', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'civilwood-technology': {
      technologyName: 'Civil(Wood) Technology',
      technologyCode: '65',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26421', name: 'Civil Engineering Drawing' },
            { code: '26521', name: 'Wood Workshop Practice' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26432', name: 'Surveying-I' },
            { code: '26433', name: 'Construction Process-I' },
            { code: '26611', name: 'Computer Office Application' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26441', name: 'Construction Process-II' },
            { code: '26442', name: 'Estimating & Costing-I' },
            { code: '26443', name: 'Civil CAD-I' },
            { code: '26444', name: 'Surveying-II' },
            { code: '26445', name: 'Geotechnical Engineering' },
            { code: '26541', name: 'Wood Engineering Machanics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26451', name: 'Foundation Engineering' },
            { code: '26454', name: 'Theory of Structure' },
            { code: '26455', name: 'Water Supply Engineering' },
            { code: '26551', name: 'Design & Drawing of Furniture' },
            { code: '26552', name: 'Wood Working Machine-I' },
            { code: '26553', name: 'Wood CAD & CAM' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26463', name: 'Transportation Engineering-I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '26456', name: 'Hydraulics' },
            { code: '26561', name: 'Wood Working Machine-II' },
            { code: '26562', name: 'Wood Processing' },
            { code: '26563', name: 'Wood Finishing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26472', name: 'Sanitary Engineering' },
            { code: '26473', name: 'Transportation Engineering-II' },
            { code: '26474', name: 'Design of Structure-II' },
            { code: '26475', name: 'Estimating & Costing-II' },
            { code: '26571', name: 'Wood Working Project' },
            { code: '26572', name: 'Furniture Fitting & Assembly' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26581', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'computer-science-technology': {
      technologyName: 'Computer Science & Technology',
      technologyCode: '66',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26621', name: 'Python Programming' },
            { code: '26622', name: 'Computer Graphics Design-I' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26631', name: 'Application Development Using Python' },
            { code: '26632', name: 'Computer Graphics Design-II' },
            { code: '26633', name: 'IT Support Services' },
            { code: '26831', name: 'Digital Electronics-I' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '26641', name: 'Java Programming' },
            { code: '26642', name: 'Data Structure & Algorithm' },
            { code: '26643', name: 'Computer Peripherals & Interfacing' },
            { code: '26644', name: 'Web Design & Development-I' },
            { code: '26841', name: 'Digital Electronics-II' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26651', name: 'Application Development Using Java' },
            { code: '26652', name: 'Web Design & Development-II' },
            { code: '26653', name: 'Computer Architecture & Microprocessor' },
            { code: '26654', name: 'Data Communication' },
            { code: '26655', name: 'Operating System' },
            { code: '26656', name: 'Project Work-I' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26661', name: 'Database Management System' },
            { code: '26662', name: 'Copmputer Networking' },
            { code: '26663', name: 'Sensor & IOT System' },
            { code: '26664', name: 'Microcontroller Based System Design & Development' },
            { code: '26665', name: 'Surveillance Security System' },
            { code: '26666', name: 'Web Development Project' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26671', name: 'Digital Marketing Technique' },
            { code: '26672', name: 'Network Administration & Services' },
            { code: '26673', name: 'Cyber Security & Ethics' },
            { code: '26674', name: 'Apps Development Project' },
            { code: '26675', name: 'Multimedia & Animation' },
            { code: '26676', name: 'Project Work-II' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '29081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'construction-technology': {
      technologyName: 'Construction Technology',
      technologyCode: '88',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26421', name: 'Civil Engineering Drawing' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26432', name: 'Surveying-I' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '28831', name: 'Construction Methodology-I' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26442', name: 'Estimating & Costing-I' },
            { code: '26443', name: 'Civil CAD-I' },
            { code: '26444', name: 'Surveying-II' },
            { code: '26445', name: 'Geotechnical Engineering' },
            { code: '26446', name: 'Hydrology' },
            { code: '28841', name: 'Construction Methodology-II' },
            { code: '28842', name: 'Construction Safety' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26451', name: 'Foundation Engineering' },
            { code: '26452', name: 'Civil CAD-II' },
            { code: '26453', name: 'Surveying-III' },
            { code: '26454', name: 'Theory of Structure' },
            { code: '26455', name: 'Water Supply Engineering' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26456', name: 'Hydraulics' },
            { code: '26461', name: 'Water Resources Engineering' },
            { code: '26463', name: 'Transportation Engineering-I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '28861', name: 'Advanced Construction' },
            { code: '28862', name: 'Building Facilities & Law' },
            { code: '28863', name: 'Steel Structures' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26472', name: 'Sanitary Engineering' },
            { code: '26473', name: 'Transportation Engineering-II' },
            { code: '26474', name: 'Design of Structure-II' },
            { code: '26475', name: 'Estimating & Costing-II' },
            { code: '28871', name: 'Construction Management & Documentation' },
            { code: '28872', name: 'Construction Engineering Project' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '28881', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'diploma-in-agriculture': {
      technologyName: 'Diploma In Agriculture',
      technologyCode: '23',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '22311', name: 'Introduction to Bangladesh Agriculture' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' },
            { code: '25915', name: 'Biology-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '22321', name: 'Production Technology of Agronomic Crops-I' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' },
            { code: '25925', name: 'Biology-II' },
            { code: '26611', name: 'Computer Office Application' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '22331', name: 'Production Technology of Agronomic Crops-II' },
            { code: '22332', name: 'Agricultural Economices' },
            { code: '22333', name: 'Soil Science-I' },
            { code: '22334', name: 'Cultivation of Vegetables' },
            { code: '22335', name: 'Agricultural Extention-I' },
            { code: '22336', name: 'Fish Culture Management' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '22341', name: 'Soil Science-II' },
            { code: '22342', name: 'Mansuration and Statistics' },
            { code: '22343', name: 'Fores and Forestry' },
            { code: '22344', name: 'Cultivation of Fruits' },
            { code: '22345', name: 'Fundamental and Ecological Entomology' },
            { code: '22346', name: 'Livestock and Poultry Production' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '22351', name: 'Agroforestry & Biodiversity' },
            { code: '22352', name: 'Crop Disease Management' },
            { code: '22353', name: 'Plant Nutrition and Fertilizer Management' },
            { code: '22354', name: 'Cultivation of Flowers & Ornamental Plants' },
            { code: '22355', name: 'Agriculture Mechanization' },
            { code: '22356', name: 'Irrigation and Water Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '22361', name: 'Organic Agriculture' },
            { code: '22362', name: 'Pest Management and Economic Entomology' },
            { code: '22363', name: 'Horticultural Nursery Management' },
            { code: '22364', name: 'Seed Technology' },
            { code: '22365', name: 'Food Processing' },
            { code: '22366', name: 'Agricultural Extension-II' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '22371', name: 'Farm Management' },
            { code: '22372', name: 'Agro Environment and Disaster Management' },
            { code: '22373', name: 'Food and Nutrition Management' },
            { code: '22374', name: 'Self Employment and Entrepreneurship Development' },
            { code: '22375', name: 'Postharvest Technology' },
            { code: '22376', name: 'Cultivation of Species Crops' },
            { code: '22377', name: 'Co-operative and Agricultural Marketing' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '22381', name: 'Field Attachment Training & Project Presentation' }
          ]
        }
      ]
    },
    'diploma-in-fisheries': {
      technologyName: 'Diploma In Fisheries',
      technologyCode: '74',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' },
            { code: '25915', name: 'Biology-I' },
            { code: '27411', name: 'Introduction and Probability of Fisheries Resources in Bangladesh' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' },
            { code: '25925', name: 'Biology-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27421', name: 'Limnology' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '27431', name: 'Introduction to Bangladesh Agriculture' },
            { code: '27432', name: 'Ichthyology' },
            { code: '27433', name: 'Aquatic Ecology' },
            { code: '27434', name: 'Aquaculture Engineering-1' },
            { code: '27435', name: 'Livestock and Poultry Production' },
            { code: '27436', name: 'Fish Physiology' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '27441', name: 'Fresh Water Aquaculture' },
            { code: '27442', name: 'Open Water Aquaculture Management' },
            { code: '27443', name: 'Fish Pathology & Parasitology' },
            { code: '27444', name: 'Fish Nursery Management' },
            { code: '27445', name: 'Fish Feed & Nutrition-I' },
            { code: '27446', name: 'Aquaculture Engineering- II' },
            { code: '27447', name: 'Aquatic Biodiversity Conservation & Management' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '27451', name: 'Modern Aquaculture' },
            { code: '27452', name: 'Fish Feed and Nutrition-II' },
            { code: '27453', name: 'Coastal Aquaculture Management' },
            { code: '27454', name: 'Fisheries Microbiology' },
            { code: '27455', name: 'Fisheries Extension' },
            { code: '27456', name: 'Fish Disease & Control' },
            { code: '27457', name: 'Fish Hatchery Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '27461', name: 'Shellfish Hatchery Management' },
            { code: '27462', name: 'Environmental Mangemant for Aquaculture' },
            { code: '27463', name: 'Fish Harvesting, Handling & Preservation' },
            { code: '27464', name: 'Fish Processing & Fishery Products' },
            { code: '27465', name: 'Marine Fisheries Resources' },
            { code: '27466', name: 'Agricultural Economics' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '27471', name: 'Fish Inspection & Quality Control' },
            { code: '27472', name: 'Fisheries Marketing and Cooperatives' },
            { code: '27473', name: 'Fisheries Resources Management and Planing' },
            { code: '27474', name: 'Good Aquaculture Practices' },
            { code: '27475', name: 'Genetics and Fish Breeding' },
            { code: '27476', name: 'Integrated Aquaculture' },
            { code: '27477', name: 'Self Employment and Entrepreneurship Development' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27481', name: 'Field Attachment Training & Project Presentation' }
          ]
        }
      ]
    },
    'diploma-in-forestry': {
      technologyName: 'Diploma In Forestry',
      technologyCode: '20',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '22011', name: 'Introduction to Forestry' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' },
            { code: '25915', name: 'Biology-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '22021', name: 'Geology & Soil Science' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' },
            { code: '25925', name: 'Biology-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '22022', name: 'Physical Exercises-I' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '22031', name: 'Forest Menstruation' },
            { code: '22032', name: 'Physical Exercises -II' },
            { code: '22033', name: 'Soil Conservation and Watershed Management' },
            { code: '22034', name: 'Principle and Practice of Silviculture' },
            { code: '22035', name: 'Forest Statistics' },
            { code: '22036', name: 'Project Work-I' },
            { code: '22037', name: 'Forest Ecology' },
            { code: '22038', name: 'Application of Computer in Forestry' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '22041', name: 'Forest Engineering-I' },
            { code: '22042', name: 'Physical Exercises -III' },
            { code: '22043', name: 'Forest Protection' },
            { code: '22044', name: 'Plantation Silviculture' },
            { code: '22045', name: 'Forest Based Rural Industries & Community Development' },
            { code: '22046', name: 'Project Work-II' },
            { code: '22047', name: 'Forest Utilization' },
            { code: '22048', name: 'Sociology' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '22051', name: 'Forest Engineering-II' },
            { code: '22052', name: 'Games and Sports-I' },
            { code: '22053', name: 'Silvicultural System' },
            { code: '22054', name: 'Forest Policy and Law-I' },
            { code: '22055', name: 'Forest Serveying and Settlement' },
            { code: '22056', name: 'Wildlife Management' },
            { code: '22057', name: 'Protected Area Management and Eco-tourism' },
            { code: '22058', name: 'Forest Genetics and Tree Improvement' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '22061', name: 'Forestry Extension' },
            { code: '22062', name: 'Games and Sports-II' },
            { code: '22063', name: 'Social Forestry' },
            { code: '22064', name: 'Forest Policy and Law-2' },
            { code: '22065', name: 'Forest Management' },
            { code: '22066', name: 'Forest Accounts and Procedures' },
            { code: '22067', name: 'Agroforestry' },
            { code: '22068', name: 'Entrepreneurship' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '22071', name: 'Biodiversity Conservation' },
            { code: '22072', name: 'Games and Sports-III' },
            { code: '22073', name: 'Rubber, Tea, Agar and Medicinal Plant Cultivation' },
            { code: '22074', name: 'Climate Change and Forestry' },
            { code: '22075', name: 'Mangrove Ecology And Costal Plantation' },
            { code: '22076', name: 'Forest Resources Economics' },
            { code: '22077', name: 'GIS And Remote Sensing In Forestry' },
            { code: '22078', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '74811', name: 'Field Attachment Training & Project Presentation' }
          ]
        }
      ]
    },
    'electrical-technology': {
      technologyName: 'Electrical Technology',
      technologyCode: '67',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '26712', name: 'Electrical Engineering Materials' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26721', name: 'Electrical Circuits-I' },
            { code: '26722', name: 'Electrical Engineering Drawing' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25931', name: 'Mathematics-III' },
            { code: '25913', name: 'Chemistry' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26731', name: 'Electrical Circuits-II' },
            { code: '26732', name: 'Electrical Appliances' },
            { code: '26833', name: 'Industrial Electronics' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25841', name: 'Accounting' },
            { code: '26741', name: 'Electrical Installation,Planning and Estimating' },
            { code: '26742', name: 'DC Machine' },
            { code: '26743', name: 'Electrical Engineering Project-I' },
            { code: '26845', name: 'Digital Electronics' },
            { code: '27044', name: 'Applied Mechanics' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26751', name: 'Generation of Electrical Power' },
            { code: '26752', name: 'Electrical & Electronic Measurements-I' },
            { code: '26753', name: 'Testing and Maintannance of Electrical Equipments' },
            { code: '26754', name: 'Electrical Engineering Project-II' },
            { code: '26853', name: 'Microprocessor & Microcontroller' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26667', name: 'Progamming in C' },
            { code: '26761', name: 'AC Machine-I' },
            { code: '26762', name: 'Transmission and Distribution of Eectrical Power-I' },
            { code: '26763', name: 'Electrical & Electronic Measurements-II' },
            { code: '26842', name: 'Communication Engineering' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26771', name: 'AC Machine-II' },
            { code: '26772', name: 'Transmission and Distribution of Ellectrical Power-II' },
            { code: '26773', name: 'Switch Gear and Protection' },
            { code: '26774', name: 'Electrical Engineering Project-III' },
            { code: '26875', name: 'Automation Engineering & PLC' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26781', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'electromedical-technology': {
      technologyName: 'Electromedical Technology',
      technologyCode: '86',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '28611', name: 'Human Anatomy and Physiology' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26721', name: 'Electrical Circuits-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '28621', name: 'Basic Biomedical Engineering' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26731', name: 'Electrical Circuits-II' },
            { code: '28631', name: 'Medical transducer and Sensors' },
            { code: '28632', name: 'Operating Room Equipment' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26741', name: 'Electrical Installation,Planning and Estimating' },
            { code: '26742', name: 'DC Machine' },
            { code: '26752', name: 'Electrical & Electronic Measurements-I' },
            { code: '26845', name: 'Digital Electronics' },
            { code: '28641', name: 'Dental Equipment' },
            { code: '28642', name: 'Anesthesia and Respiratory Equipment' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26667', name: 'Progamming in C' },
            { code: '26761', name: 'AC Machine-I' },
            { code: '26763', name: 'Electrical & Electronic Measurements-II' },
            { code: '28651', name: 'Radiology and Imaging Equipment' },
            { code: '28652', name: 'Fibre Optics and Laser in Medical Field' },
            { code: '28653', name: 'Physiotherapy and Rehabilitation Devices' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26764', name: 'Transmission and Distribution of Electrical Power' },
            { code: '26771', name: 'AC Machine-II' },
            { code: '28661', name: 'Diagonestic and Laboratory Equipment' },
            { code: '28662', name: 'Microprocesor and Biomedical Application' },
            { code: '28663', name: 'Testing and Maintenance Biomedical Equipment' },
            { code: '28664', name: 'CAD in Biomedical Engineering' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26773', name: 'Switch Gear and Protection' },
            { code: '28671', name: 'Advance Biomedical Equiment' },
            { code: '28672', name: 'ICU and CCU Equipment' },
            { code: '28673', name: 'Biomedical Engineering Project' },
            { code: '28674', name: 'Medical Physics and Nuclear Instruments' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '28681', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'electronics-technology': {
      technologyName: 'Electronics Technology',
      technologyCode: '68',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26721', name: 'Electrical Circuits-I' },
            { code: '26821', name: 'Electronic Devices and Circuits' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26731', name: 'Electrical Circuits-II' },
            { code: '26831', name: 'Digital Electronics-I' },
            { code: '26832', name: 'Power Electronics' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26741', name: 'Electrical Installation,Planning and Estimating' },
            { code: '26742', name: 'DC Machine' },
            { code: '26841', name: 'Digital Electronics-II' },
            { code: '26842', name: 'Communication Engineering' },
            { code: '26843', name: 'Networks, Filters and Transmission lines' },
            { code: '26844', name: 'Electronic servicing' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26667', name: 'Progamming in C' },
            { code: '26751', name: 'Generation of Electrical Power' },
            { code: '26752', name: 'Electrical & Electronic Measurements-I' },
            { code: '26851', name: 'Television Engineering' },
            { code: '26852', name: 'Electronic Appliancs' },
            { code: '28654', name: 'Bio-Medical Instruments' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26761', name: 'AC Machine-I' },
            { code: '26762', name: 'Transmission and Distribution of Eectrical Power-I' },
            { code: '26763', name: 'Electrical & Electronic Measurements-II' },
            { code: '26861', name: 'TV Studio and Broadcastig' },
            { code: '26862', name: 'Microcontroller and Embedded System' },
            { code: '26863', name: 'PCB Design and Prototyping' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26771', name: 'AC Machine-II' },
            { code: '26772', name: 'Transmission and Distribution of Ellectrical Power-II' },
            { code: '26871', name: 'Microwave Radar and Navigation Aids' },
            { code: '26872', name: 'Industrial Automation and PLC' },
            { code: '26873', name: 'Control System and Robotics' },
            { code: '26874', name: 'Electronic Project' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26881', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'environmental-technology': {
      technologyName: 'Environmental Technology',
      technologyCode: '90',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '29011', name: 'Basic Environmental Engineering' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26421', name: 'Civil Engineering Drawing' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26432', name: 'Surveying-I' },
            { code: '26433', name: 'Construction Process-I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '29031', name: 'Water Quality Engineering' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25831', name: 'Business Communication' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26442', name: 'Estimating & Costing-I' },
            { code: '26443', name: 'Civil CAD-I' },
            { code: '26444', name: 'Surveying-II' },
            { code: '26445', name: 'Geotechnical Engineering' },
            { code: '29042', name: 'Environmental Chemistry' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26441', name: 'Construction Process-II' },
            { code: '26454', name: 'Theory of Structure' },
            { code: '26455', name: 'Water Supply Engineering' },
            { code: '29051', name: 'Water and Waste Water Engineering' },
            { code: '29052', name: 'Environmental Microbiology' },
            { code: '29053', name: 'Geographic Information System (GIS) & Remote Sensing' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26456', name: 'Hydraulics' },
            { code: '26463', name: 'Transportation Engineering-I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '29061', name: 'Environmental Impact Assessment (EIA) & Environmental Regulation' },
            { code: '29062', name: 'Air Pollution & Control Engineering' },
            { code: '29063', name: 'Environmenatl Auditing' },
            { code: '29064', name: 'Health, Safety & Environment' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26472', name: 'Sanitary Engineering' },
            { code: '26475', name: 'Estimating & Costing-II' },
            { code: '28871', name: 'Construction Management & Documentation' },
            { code: '29071', name: 'Energy & Environmental Engineering' },
            { code: '29072', name: 'Solid and Hazardous Waste Engineering' },
            { code: '29073', name: 'Climate Change and Adaptability' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '29081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'fabric-manufacturing': {
      technologyName: 'Fabric Manufacturing',
      technologyCode: '12',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21164', name: 'Textile Calculation' },
            { code: '21261', name: 'Advanced Fabric Manufacturing-I' },
            { code: '21262', name: 'Advance Fabric Structure & Design' },
            { code: '21263', name: 'Application of Computer in Fabric Manufacturing' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21271', name: 'Advanced Fabric Manufacturing-II' },
            { code: '21272', name: 'Technical Textiles' },
            { code: '21863', name: 'Fabric Manufacturing Machinery and Maintenance' },
            { code: '25852', name: 'Industrial Management' },
            { code: '25853', name: 'Innovation & Entrepreneurship' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21281', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'fashion-design': {
      technologyName: 'Fashion Design',
      technologyCode: '16',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25811', name: 'Social Science' },
            { code: '21632', name: 'Fundamentals of Art & Design' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '25915', name: 'Biology-I' },
            { code: '21641', name: 'History of Art & Fashion' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21651', name: 'Principles of Design' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21661', name: 'Fashion Illustration & Accessories Design' },
            { code: '21662', name: 'Draping' },
            { code: '21663', name: 'Surface Ornamentation' },
            { code: '21664', name: 'Digital Fashion Design' },
            { code: '21665', name: 'Fashion Forecasting & Trend Analysis' },
            { code: '25851', name: 'Principles of Marketing' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21671', name: 'Computer Aided Design & Manufacturing' },
            { code: '21672', name: 'Fashion Design Portfolio and Collection' },
            { code: '21673', name: 'Fashion Photography' },
            { code: '21674', name: 'Fashion Merchandising' },
            { code: '21675', name: 'Sustainable Fashion' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '25831', name: 'Business Communication' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21681', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'food-technology': {
      technologyName: 'Food Technology',
      technologyCode: '69',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26911', name: 'Food Engineering Fundamentals' },
            { code: '26912', name: 'Food Safety & Hygiene Management' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '26921', name: 'Food Science & Nutrition' },
            { code: '26922', name: 'Food Plant Layout & Design' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '26931', name: 'Catering Management' },
            { code: '26932', name: 'Food Industrial Chemistry' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25841', name: 'Accounting' },
            { code: '26941', name: 'Food Microbiology-I' },
            { code: '26942', name: 'Food Preservation-I' },
            { code: '26943', name: 'Food Chemistry' },
            { code: '26944', name: 'Food Packaging' },
            { code: '26945', name: 'Dairy Products' },
            { code: '27041', name: 'Engineering Mechanics' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26355', name: 'Refrigeration & Cold Storage' },
            { code: '26951', name: 'Food Microbiology-II' },
            { code: '26952', name: 'Food Preservation-II' },
            { code: '26953', name: 'Food Biotechnology' },
            { code: '26954', name: 'Food & Beverage Products' },
            { code: '26955', name: 'Food Industrial Instrumentation & Process Control' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26364', name: 'Industrial Stoichiometry & Thermodynamics' },
            { code: '26365', name: 'Instrumental Methods of Analysis' },
            { code: '26961', name: 'Food Engineering Operation-I' },
            { code: '26962', name: 'Food Process Industries-I' },
            { code: '26963', name: 'Bakery Products' },
            { code: '26964', name: 'Food Adulteration & Toxicology' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26971', name: 'Food Engineering Operation-II' },
            { code: '26972', name: 'Food Process Industries-II' },
            { code: '26973', name: 'Food Quality Control & Assurance' },
            { code: '26974', name: 'Confectionery Products' },
            { code: '26975', name: 'Food Analysis' },
            { code: '26976', name: 'Food Engineering Project' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26981', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'glass-technology': {
      technologyName: 'Glass Technology',
      technologyCode: '77',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25913', name: 'Chemistry' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27711', name: 'Glass engineering materials - I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25912', name: 'Physics -I' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27721', name: 'Glass engineering materials - II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25922', name: 'Physics-II' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27731', name: 'Glass Mould & Die - I' },
            { code: '27732', name: 'Glass Plants & Equipment' },
            { code: '27733', name: 'Preparation of Glass Raw Materials' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26875', name: 'Automation Engineering & PLC' },
            { code: '27741', name: 'Glass Engineering Chemistry' },
            { code: '27742', name: 'Glass Mould & Die - II' },
            { code: '27743', name: 'Glass Fabrication - I' },
            { code: '27744', name: 'Fuels and Combustion' },
            { code: '27745', name: 'Graphics Design' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '27063', name: 'CAD & CAM' },
            { code: '27655', name: 'Cement Manufacturing' },
            { code: '27751', name: 'Glass Melting Furnace' },
            { code: '27752', name: 'Glass Fabrication - II' },
            { code: '27753', name: 'Ceramic Manufracturing - I' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '27643', name: 'Refractories' },
            { code: '27761', name: 'Ceramic Manufacturing - II' },
            { code: '27762', name: 'Heat Transfer & Thermodynamics' },
            { code: '27763', name: 'Glass Quality Control - I' },
            { code: '27764', name: 'Glass Products - I' },
            { code: '27765', name: 'Glass Industrial Safety' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27771', name: 'Glass Products - II' },
            { code: '27772', name: 'Glass Quality Control - II' },
            { code: '27773', name: 'Glass Decoration & Printing' },
            { code: '27774', name: 'Glass House Instrumentation' },
            { code: '27775', name: 'Furnace Design & Construction' },
            { code: '27776', name: 'Glass Engineering Project' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27781', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'graphic-design-technology': {
      technologyName: 'Graphic Design Technology',
      technologyCode: '96',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '29511', name: 'Printing Basics' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '29521', name: 'Offset Machine Operation' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '29531', name: 'Graphic Materials' },
            { code: '29631', name: 'Graphic Design-I' },
            { code: '29632', name: 'Basic Photography' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '29041', name: 'Environmental Studies' },
            { code: '29541', name: 'Screen Printing' },
            { code: '29542', name: 'Safety and Maintainance' },
            { code: '29641', name: 'Image Carrier Preparation' },
            { code: '29642', name: 'Graphic Design-II' },
            { code: '29643', name: 'Video and Sound Editing' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '29555', name: 'Digital Design & Printing' },
            { code: '29651', name: 'Advertising Design' },
            { code: '29652', name: 'Fabric Design' },
            { code: '29653', name: 'Design & Editing' },
            { code: '29654', name: 'Packaging Design-I' },
            { code: '29655', name: 'Graphic Design-III' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29561', name: 'Printing Costing & Estimating' },
            { code: '29661', name: 'Desktop Publishing' },
            { code: '29662', name: 'Web Design & Development' },
            { code: '29663', name: 'Graphic Design-IV' },
            { code: '29664', name: 'Image Manipulation' },
            { code: '29665', name: 'Graphic Professional Practice-I' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '29671', name: 'Animation' },
            { code: '29672', name: 'Packaging Design-II' },
            { code: '29673', name: 'Advanced Digital Photography' },
            { code: '29674', name: 'Graphic Design-V' },
            { code: '29675', name: 'Graphic Communication' },
            { code: '29676', name: 'Graphic Professional Practice-II' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '29681', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'jute-product-manufacturing': {
      technologyName: 'Jute Product Manufacturing',
      technologyCode: '15',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21561', name: 'Advanced Jute Spinning-I' },
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21562', name: 'Diversification of Jute products Manufacturing' },
            { code: '21563', name: 'Jute Calculation' },
            { code: '21564', name: 'Application of Computer in Jute Manufacturing' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21571', name: 'Advanced Jute Spinning-II' },
            { code: '21572', name: 'Jute Weaving and Finishing' },
            { code: '21874', name: 'Jute Processing Machinery and Maintenance' },
            { code: '25852', name: 'Industrial Management' },
            { code: '25853', name: 'Innovation & Entrepreneurship' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21581', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'mechanical-technology': {
      technologyName: 'Mechanical Technology',
      technologyCode: '70',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27012', name: 'Machine Shop Practice I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27021', name: 'Mechanical Engineering Drawing' },
            { code: '27022', name: 'Mechanical Engineering Materials' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25831', name: 'Business Communication' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27031', name: 'Machine Shop Practice II' },
            { code: '27231', name: 'RAC Cycles & Components' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27041', name: 'Engineering Mechanics' },
            { code: '27042', name: 'Machine Shop Practice III' },
            { code: '27043', name: 'Metallurgy' },
            { code: '27131', name: 'Engineering Thermodynamics' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26667', name: 'Progamming in C' },
            { code: '27051', name: 'Fluid Mechanics & Machineries' },
            { code: '27052', name: 'Mechanical Estimating & Costing' },
            { code: '27053', name: 'Advanced Welding-I' },
            { code: '27054', name: 'Foundry & Pattern Making' },
            { code: '27055', name: 'Manufacturing Process' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '26211', name: 'Automobile Fundamentals' },
            { code: '27061', name: 'Strength of Materials' },
            { code: '27062', name: 'Mechanical Measurement & Metrology' },
            { code: '27063', name: 'CAD & CAM' },
            { code: '27064', name: 'Advanced Welding-II' },
            { code: '27065', name: 'Plant Engineering & Maintainance' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27071', name: 'Design of Machine Elements' },
            { code: '27072', name: 'Tool Design' },
            { code: '27073', name: 'Heat Treatment of Metal' },
            { code: '27074', name: 'Mechanical Engineering Project' },
            { code: '27075', name: 'Production Planning & Control' },
            { code: '29231', name: 'Mechatronics & PLC' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'mechatronics-technology': {
      technologyName: 'Mechatronics Technology',
      technologyCode: '92',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27012', name: 'Machine Shop Practice I' },
            { code: '27021', name: 'Mechanical Engineering Drawing' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25811', name: 'Social Science' },
            { code: '25831', name: 'Business Communication' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26821', name: 'Electronic Devices and Circuits' },
            { code: '27022', name: 'Mechanical Engineering Materials' },
            { code: '29232', name: 'Basic Mechatronics' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26667', name: 'Progamming in C' },
            { code: '27031', name: 'Machine Shop Practice II' },
            { code: '27041', name: 'Engineering Mechanics' },
            { code: '27131', name: 'Engineering Thermodynamics' },
            { code: '29041', name: 'Environmental Studies' },
            { code: '29241', name: 'Electrical Circuits & Machine' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26845', name: 'Digital Electronics' },
            { code: '27051', name: 'Fluid Mechanics & Machineries' },
            { code: '27055', name: 'Manufacturing Process' },
            { code: '27151', name: 'Fundamental of Hybride & Electric Vehicle' },
            { code: '27152', name: 'Power Plant Enginnering' },
            { code: '29251', name: 'Programmable Logic Controller' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26833', name: 'Industrial Electronics' },
            { code: '27061', name: 'Strength of Materials' },
            { code: '27062', name: 'Mechanical Measurement & Metrology' },
            { code: '27063', name: 'CAD & CAM' },
            { code: '29261', name: 'Microprocessor & Microcontroller Aplications' },
            { code: '29262', name: 'Instrumentation & Control System' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27071', name: 'Design of Machine Elements' },
            { code: '27075', name: 'Production Planning & Control' },
            { code: '29271', name: 'Mechatronics Engineering Project' },
            { code: '29272', name: 'Industrial Automation System Design' },
            { code: '29273', name: 'Networks & Communications' },
            { code: '29274', name: 'Robotics, Manufacture & Process Engineering' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'merchandising-market': {
      technologyName: 'Merchandising & Market',
      technologyCode: '17',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21761', name: 'Fundamental of Merchandising' },
            { code: '21762', name: 'Product Analysis & Development' },
            { code: '21763', name: 'Application of Computer in Merchandising' },
            { code: '21764', name: 'Supply Chain Management' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21463', name: 'Garments Washing & Dyeing' },
            { code: '21771', name: 'Garments Consumption & Costing' },
            { code: '21772', name: 'Advanced Business Communication' },
            { code: '21773', name: 'Advanced Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21181', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'power-technology': {
      technologyName: 'Power Technology',
      technologyCode: '71',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '27111', name: 'Power Engineering Fundmental' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27121', name: 'Power Equipment Management & Safety' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27012', name: 'Machine Shop Practice I' },
            { code: '27131', name: 'Engineering Thermodynamics' },
            { code: '27231', name: 'RAC Cycles & Components' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26667', name: 'Progamming in C' },
            { code: '27041', name: 'Engineering Mechanics' },
            { code: '27043', name: 'Metallurgy' },
            { code: '27141', name: 'IC Engine Details' },
            { code: '27142', name: 'Fuels & Lubricants' },
            { code: '27143', name: 'Boiler Operation & Maintenance' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26241', name: 'Automotive Body Building' },
            { code: '27051', name: 'Fluid Mechanics & Machineries' },
            { code: '27053', name: 'Advanced Welding-I' },
            { code: '27151', name: 'Fundamental of Hybride & Electric Vehicle' },
            { code: '27152', name: 'Power Plant Enginnering' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26764', name: 'Transmission and Distribution of Electrical Power' },
            { code: '27061', name: 'Strength of Materials' },
            { code: '27062', name: 'Mechanical Measurement & Metrology' },
            { code: '27065', name: 'Plant Engineering & Maintainance' },
            { code: '27161', name: 'Engine Overhauling, Inspection & Testing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27071', name: 'Design of Machine Elements' },
            { code: '27073', name: 'Heat Treatment of Metal' },
            { code: '27171', name: 'Service Station Operation & Estimating' },
            { code: '27172', name: 'Automotive Electricity, Electronics & Comunication System' },
            { code: '27173', name: 'Power Engineering Project' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27181', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'printing-technology': {
      technologyName: 'Printing Technology',
      technologyCode: '95',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '29511', name: 'Printing Basics' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '29521', name: 'Offset Machine Operation' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '29531', name: 'Graphic Materials' },
            { code: '29631', name: 'Graphic Design-I' },
            { code: '29632', name: 'Basic Photography' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '29041', name: 'Environmental Studies' },
            { code: '29541', name: 'Screen Printing' },
            { code: '29542', name: 'Safety and Maintainance' },
            { code: '29641', name: 'Image Carrier Preparation' },
            { code: '29642', name: 'Graphic Design-II' },
            { code: '29643', name: 'Video and Sound Editing' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '29551', name: 'Flexo & Can Printing' },
            { code: '29552', name: 'Color Printing-I' },
            { code: '29553', name: 'Printing Quality Control' },
            { code: '29554', name: 'Ink & Paper' },
            { code: '29555', name: 'Digital Design & Printing' },
            { code: '29655', name: 'Graphic Design-III' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29561', name: 'Printing Costing & Estimating' },
            { code: '29562', name: 'Color Printing -II' },
            { code: '29563', name: 'Printing Professional Practice -I' },
            { code: '29564', name: 'Gravure Printing' },
            { code: '29654', name: 'Packaging Design-I' },
            { code: '29664', name: 'Image Manipulation' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '29571', name: 'Color Printing-III' },
            { code: '29572', name: 'Trouble Shooting Management in Printing Industry' },
            { code: '29573', name: 'Print Finishing' },
            { code: '29574', name: 'Printing Professional Practice -II' },
            { code: '29672', name: 'Packaging Design-II' },
            { code: '29675', name: 'Graphic Communication' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '29581', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'rac-technology': {
      technologyName: 'RAC Technology',
      technologyCode: '72',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '27011', name: 'Basic Workshop Practice' },
            { code: '27211', name: 'RAC Fundamental' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '27021', name: 'Mechanical Engineering Drawing' },
            { code: '27022', name: 'Mechanical Engineering Materials' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26211', name: 'Automobile Fundamentals' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27131', name: 'Engineering Thermodynamics' },
            { code: '27231', name: 'RAC Cycles & Components' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '27012', name: 'Machine Shop Practice I' },
            { code: '27041', name: 'Engineering Mechanics' },
            { code: '27241', name: 'Circuits and Electrical Machine in RAC' },
            { code: '27242', name: 'Transport RAC' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '26667', name: 'Progamming in C' },
            { code: '27043', name: 'Metallurgy' },
            { code: '27051', name: 'Fluid Mechanics & Machineries' },
            { code: '27052', name: 'Mechanical Estimating & Costing' },
            { code: '27251', name: 'HVAC' },
            { code: '27252', name: 'Commercial & Industrial RAC' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '27055', name: 'Manufacturing Process' },
            { code: '27061', name: 'Strength of Materials' },
            { code: '27063', name: 'CAD & CAM' },
            { code: '27065', name: 'Plant Engineering & Maintainance' },
            { code: '27261', name: 'Cooling &Heating Load Calculation' },
            { code: '27262', name: 'RAC Plant Installation Maintenance & Operation' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '27075', name: 'Production Planning & Control' },
            { code: '27271', name: 'RAC System Analysis' },
            { code: '27272', name: 'RAC Project' },
            { code: '27273', name: 'Advance RAC' },
            { code: '27274', name: 'RAC for Food Preservation' },
            { code: '29231', name: 'Mechatronics & PLC' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '27081', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'surveying-technology': {
      technologyName: 'Surveying Technology',
      technologyCode: '78',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26411', name: 'Civil Engineering Metarials' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27821', name: 'Basic Surveying' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '25915', name: 'Biology-I' },
            { code: '26434', name: 'Basic Construction Process' },
            { code: '27831', name: 'Leveling' },
            { code: '27832', name: 'Survey CAD' },
            { code: '27833', name: 'Introduction of Geography' },
            { code: '27834', name: 'Geodetic Surveying' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '26431', name: 'Structural Mechanics' },
            { code: '26447', name: 'Basic Estimating & Costing' },
            { code: '27841', name: 'Aerial Photography and Photogrammetry' },
            { code: '27842', name: 'Fundamentals of GIS' },
            { code: '27843', name: 'Advanced Surveying-I' },
            { code: '27844', name: 'Digital Cartography' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26454', name: 'Theory of Structure' },
            { code: '26621', name: 'Python Programming' },
            { code: '27851', name: 'Advanced GIS' },
            { code: '27852', name: 'Hydraulics & Hydrology' },
            { code: '27853', name: 'Advanced Surveying-II' },
            { code: '27854', name: 'Land Laws of Bangladesh' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '25852', name: 'Industrial Management' },
            { code: '26463', name: 'Transportation Engineering-I' },
            { code: '26464', name: 'Design of Structure-I' },
            { code: '27861', name: 'Principles of Topographic Survey' },
            { code: '27862', name: 'Application of Python Programming' },
            { code: '27863', name: 'Hydrographic Surveying' },
            { code: '27864', name: 'Survey Project-I' },
            { code: '27865', name: 'Preapartion and Maintainces of Land Records' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26473', name: 'Transportation Engineering-II' },
            { code: '26474', name: 'Design of Structure-II' },
            { code: '27871', name: 'Mine Surveying' },
            { code: '27872', name: 'Survey Project-II' },
            { code: '27873', name: 'Remote Sensing' },
            { code: '28871', name: 'Construction Management & Documentation' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '67881', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'telecommunication-technology': {
      technologyName: 'Telecommunication Technology',
      technologyCode: '94',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '29411', name: 'Basics of Telecommunication' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '26721', name: 'Electrical Circuits-I' },
            { code: '26811', name: 'Basic Electronics' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '25913', name: 'Chemistry' },
            { code: '25931', name: 'Mathematics-III' },
            { code: '26611', name: 'Computer Office Application' },
            { code: '26731', name: 'Electrical Circuits-II' },
            { code: '26821', name: 'Electronic Devices and Circuits' },
            { code: '29431', name: 'Telecom Workshop and Outside Plant' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '25841', name: 'Accounting' },
            { code: '26667', name: 'Progamming in C' },
            { code: '26741', name: 'Electrical Installation,Planning and Estimating' },
            { code: '26845', name: 'Digital Electronics' },
            { code: '29441', name: 'Radio and TV Engineering' },
            { code: '29442', name: 'IT Support and IoT Basics' },
            { code: '29443', name: 'Data Communications and Networking' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' },
            { code: '26742', name: 'DC Machine' },
            { code: '26751', name: 'Generation of Electrical Power' },
            { code: '26752', name: 'Electrical & Electronic Measurements-I' },
            { code: '26853', name: 'Microprocessor & Microcontroller' },
            { code: '29451', name: 'Multimedia and Webpage Design' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '26761', name: 'AC Machine-I' },
            { code: '26763', name: 'Electrical & Electronic Measurements-II' },
            { code: '26764', name: 'Transmission and Distribution of Electrical Power' },
            { code: '29041', name: 'Environmental Studies' },
            { code: '29462', name: 'Wireless and Mobile Communication' },
            { code: '29463', name: 'Signals and Switching System' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '25831', name: 'Business Communication' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '26771', name: 'AC Machine-II' },
            { code: '26773', name: 'Switch Gear and Protection' },
            { code: '29471', name: 'Microwave Engineering and Antennas' },
            { code: '29472', name: 'Optical Fiber Communication' },
            { code: '29473', name: 'Satellite Communication and RADAR' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '26781', name: 'Industrial Attachement & Project Presentation' }
          ]
        }
      ]
    },
    'textile-machine-design-maintenance': {
      technologyName: 'Textile Machine Design & Maintenance',
      technologyCode: '18',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '21011', name: 'Engineering Drawing' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '28511', name: 'Computer Office Application' },
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25915', name: 'Biology-I' },
            { code: '26711', name: 'Basic Electricity' },
            { code: '25831', name: 'Business Communication' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '26811', name: 'Basic Electronics' },
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21851', name: 'Basic Machine Maintenance' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21862', name: 'Yarn Manufacturing Machinery and Maintenance' },
            { code: '21863', name: 'Fabric Manufacturing Machinery and Maintenance' },
            { code: '21864', name: 'Utility Machinery' },
            { code: '21865', name: 'Engineering Mechanics' },
            { code: '21866', name: 'Textile Machine Metallurgy' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21871', name: 'Machine Control Engineering' },
            { code: '21872', name: 'Design of Machine Elements' },
            { code: '21873', name: 'Wet Process Machinery and Maintenance' },
            { code: '21874', name: 'Jute Processing Machinery and Maintenance' },
            { code: '21875', name: 'Apparel Manufacturing Machinery and Maintenance' },
            { code: '25852', name: 'Industrial Management' },
            { code: '25853', name: 'Innovation & Entrepreneurship' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21881', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'wet-processing': {
      technologyName: 'Wet Processing',
      technologyCode: '13',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21362', name: 'Advanced Wet Processing -I' },
            { code: '21363', name: 'Textiles Printing' },
            { code: '21364', name: 'Textile Finishing' },
            { code: '21365', name: 'Application of Computer in textile Wet Processing' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '25852', name: 'Industrial Management' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21371', name: 'Advanced Wet Processing -II' },
            { code: '21372', name: 'Textile Design & Color' },
            { code: '21373', name: 'Advanced printing & finishing' },
            { code: '21873', name: 'Wet Process Machinery and Maintenance' },
            { code: '25853', name: 'Innovation & Entrepreneurship' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21381', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    },
    'yarn-manufacturing': {
      technologyName: 'Yarn Manufacturing',
      technologyCode: '11',
      semesters: [
        {
          semester: 1,
          subjects: [
            { code: '21111', name: 'General Textile Processing -I' },
            { code: '25711', name: 'Bangla-I' },
            { code: '25712', name: 'English-I' },
            { code: '25811', name: 'Social Science' },
            { code: '25812', name: 'Physical Education & Life Skills Development' },
            { code: '25911', name: 'Mathematics -I' },
            { code: '25912', name: 'Physics -I' },
            { code: '25914', name: 'Chemistry-I' }
          ]
        },
        {
          semester: 2,
          subjects: [
            { code: '21011', name: 'Engineering Drawing' },
            { code: '21121', name: 'General Textile Processing -II' },
            { code: '25721', name: 'Bangla -II' },
            { code: '25722', name: 'English-II' },
            { code: '25921', name: 'Mathematics-II' },
            { code: '25922', name: 'Physics-II' },
            { code: '25924', name: 'Chemistry-II' }
          ]
        },
        {
          semester: 3,
          subjects: [
            { code: '21131', name: 'Natural Textile Fibre' },
            { code: '21132', name: 'Yarn Manufacturing-I' },
            { code: '21231', name: 'Fabric Manufacturing-I' },
            { code: '25831', name: 'Business Communication' },
            { code: '25915', name: 'Biology-I' },
            { code: '28511', name: 'Computer Office Application' },
            { code: '26711', name: 'Basic Electricity' }
          ]
        },
        {
          semester: 4,
          subjects: [
            { code: '21141', name: 'Man Made Fibre & Filament' },
            { code: '21142', name: 'Yarn Manufacturing-II' },
            { code: '21241', name: 'Fabric Manufacturing-II' },
            { code: '21341', name: 'Wet Processing-I' },
            { code: '21441', name: 'Apparel Manufacturing-I' },
            { code: '26811', name: 'Basic Electronics' },
            { code: '27011', name: 'Basic Workshop Practice' }
          ]
        },
        {
          semester: 5,
          subjects: [
            { code: '21151', name: 'Textile Testing & Quality Control-I' },
            { code: '21251', name: 'Fabric Structure & Design' },
            { code: '21351', name: 'Wet Processing-II' },
            { code: '21451', name: 'Apparel Manufacturing-II' },
            { code: '21861', name: 'General Maintenance & Utility Service' },
            { code: '25842', name: 'Accounting & Cost Management' }
          ]
        },
        {
          semester: 6,
          subjects: [
            { code: '21161', name: 'Textile Testing & Quality Control-II' },
            { code: '21162', name: 'Advanced Yarn Manufacturing-I' },
            { code: '21163', name: 'Spinning Process Control' },
            { code: '21164', name: 'Textile Calculation' },
            { code: '21165', name: 'Application of Computer in Yarn Manufacturing' },
            { code: '25851', name: 'Principles of Marketing' },
            { code: '29041', name: 'Environmental Studies' }
          ]
        },
        {
          semester: 7,
          subjects: [
            { code: '21171', name: 'Advanced Yarn Manufacturing-II' },
            { code: '21172', name: 'Special Yarn Production' },
            { code: '21173', name: 'Production Planning & Control' },
            { code: '21174', name: 'Textile Waste Recycling' },
            { code: '21862', name: 'Yarn Manufacturing Machinery and Maintenance' },
            { code: '25852', name: 'Industrial Management' },
            { code: '25853', name: 'Innovation & Entrepreneurship' }
          ]
        },
        {
          semester: 8,
          subjects: [
            { code: '21181', name: 'Industrial Training & Graduation Project Presentation' }
          ]
        }
      ]
    }
  };

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
}