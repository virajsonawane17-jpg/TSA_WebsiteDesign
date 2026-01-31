export type Category = 
  | "Food Assistance"
  | "Housing"
  | "Mental Health"
  | "Youth Programs"
  | "Healthcare"
  | "Education"
  | "Employment"
  | "Veterans"
  | "Legal Aid"
  | "Crisis Support"
  | "Seniors"
  | "Arts & Culture";

export type Audience = 
  | "Families"
  | "Seniors"
  | "Youth"
  | "Veterans"
  | "Low-Income"
  | "Everyone";

export interface Resource {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: Category;
  audiences: Audience[];
  location: string;
  lat: number;
  lng: number;
  phone: string;
  email?: string;
  website: string;
  featured?: boolean;
  /** Set when loaded from DB; used for "Recently Added" on insights. */
  created_at?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  source: string;
  category: string;
  imageUrl?: string;
  link: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
  link: string;
  featured?: boolean;
}

/** CommunityEvent with optional source (e.g. from City of Tampa API). */
export type CommunityEventWithSource = CommunityEvent & { source?: "tampa_gov" };

export const TAMPA_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Feeding Tampa Bay",
    description: "The largest food rescue and distribution organization in the region, providing food to those in need across 10 counties.",
    longDescription: "Feeding Tampa Bay is the driving force behind hunger relief in the Tampa Bay region. In 2026, they continue to serve over 1 million people through their Causeway Center and mobile pantries, integrating health and job training into their food security mission.",
    category: "Food Assistance",
    audiences: ["Everyone", "Families", "Seniors", "Low-Income"],
    location: "3624 Causeway Blvd, Tampa, FL 33619",
    lat: 27.9255,
    lng: -82.4170,
    phone: "(813) 254-1190",
    website: "https://feedingtampabay.org",
    featured: true
  },
  {
    id: "2",
    name: "Metropolitan Ministries",
    description: "A grassroots, donor-supported nonprofit providing food, housing, and life-skills for the homeless and at-risk.",
    longDescription: "Serving Hillsborough, Pasco, and Pinellas, Metropolitan Ministries provides over 2.3 million meals annually and emergency shelter for families. Their 2026 initiatives focus on long-term self-sufficiency and family stability.",
    category: "Housing",
    audiences: ["Families", "Low-Income"],
    location: "2002 N Florida Ave, Tampa, FL 33602",
    lat: 27.9620,
    lng: -82.4595,
    phone: "(813) 209-1000",
    website: "https://www.metromin.org",
    featured: true
  },
  {
    id: "3",
    name: "Ibis Healthcare",
    description: "Unified behavioral health, mental health, and substance treatment services created from the Gracepoint and Cove merger.",
    longDescription: "Following the landmark 2025 merger, Ibis Healthcare provides comprehensive mental health, primary care, and crisis services to over 50,000 residents. Their new Mariposa facility specialized in women's health opened in early 2026.",
    category: "Mental Health",
    audiences: ["Everyone", "Youth", "Low-Income"],
    location: "5707 N 22nd St, Tampa, FL 33610",
    lat: 27.9995,
    lng: -82.4350,
    phone: "(813) 272-2244",
    website: "https://ibishealthcare.org",
    featured: true
  },
  {
    id: "4",
    name: "Tampa Hope (Catholic Charities)",
    description: "Comprehensive emergency shelter providing tents, cottages, and path-to-housing services for adults.",
    longDescription: "Tampa Hope offers a safe haven for over 300 adults, providing meals, hygiene, and case management with a focus on reaching permanent housing within four months of entry.",
    category: "Housing",
    audiences: ["Everyone", "Low-Income"],
    location: "3704 E 3rd Ave, Tampa, FL 33605",
    lat: 27.9535,
    lng: -82.4150,
    phone: "(813) 415-8002",
    website: "https://www.ccdosp.org/tampa-hope",
    featured: true
  },
  {
    id: "5",
    name: "Crisis Center of Tampa Bay",
    description: "Provides 24/7 support for mental health, trauma, and crisis intervention services.",
    longDescription: "The Crisis Center of Tampa Bay is Hillsborough County's gateway to help. They provide 211 contact center services, trauma counseling, sexual assault services, and suicide prevention.",
    category: "Crisis Support",
    audiences: ["Everyone", "Youth", "Veterans"],
    location: "One Crisis Center Plaza, Tampa, FL 33613",
    lat: 28.0682,
    lng: -82.4770,
    phone: "2-1-1 or (813) 964-1964",
    website: "https://www.crisiscenter.com",
    featured: true
  },
  {
    id: "6",
    name: "Boys & Girls Clubs of Tampa Bay",
    description: "Empowers young people to reach their full potential as productive, caring, and responsible citizens.",
    category: "Youth Programs",
    audiences: ["Youth"],
    location: "1307 N MacDill Ave, Tampa, FL 33607",
    lat: 27.9545,
    lng: -82.4862,
    phone: "(813) 769-7530",
    website: "https://www.bgctampa.org",
    featured: true
  },
  {
    id: "7",
    name: "G3 Life Applications",
    description: "Youth intervention program using sports, agriculture, and mentorship to empower East Tampa residents.",
    longDescription: "G3 Life Applications focuses on holistic youth development. Their recent 70-acre farm expansion provides urban agriculture training alongside their successful sports mentorship programs.",
    category: "Youth Programs",
    audiences: ["Youth", "Low-Income"],
    location: "East Tampa Community Center, Tampa, FL",
    lat: 27.9700,
    lng: -82.4200,
    phone: "(813) 555-0123",
    website: "https://g3lifeapps.org",
    featured: true
  },
  {
    id: "8",
    name: "Hopechest Tampa",
    description: "Community-driven nonprofit providing food security and social engagement for Tampa's senior population.",
    longDescription: "Hopechest addresses the unique needs of seniors in Tampa Bay, ensuring they have access to nutritious food and a vibrant community network to combat isolation.",
    category: "Seniors",
    audiences: ["Seniors", "Low-Income"],
    location: "1234 Senior Way, Tampa, FL 33604",
    lat: 28.0100,
    lng: -82.4600,
    phone: "(813) 555-0199",
    website: "https://ourhopechest.org",
    featured: true
  },
  {
    id: "9",
    name: "AACE (Athletes Activating Champions)",
    description: "Recent 2025 nonprofit startup focusing on youth sports mentorship and educational empowerment.",
    category: "Youth Programs",
    audiences: ["Youth"],
    location: "Tampa Heights, Tampa, FL",
    lat: 27.9650,
    lng: -82.4550,
    phone: "(813) 555-0245",
    website: "https://aacetoempower.org",
    featured: true
  },
  {
    id: "10",
    name: "Help Me, Hillsborough",
    description: "The primary government hub for connecting residents to human services, eviction aid, and emergency assistance.",
    category: "Crisis Support",
    audiences: ["Everyone", "Low-Income", "Families"],
    location: "Lee Davis Community Center, 3402 N 22nd St, Tampa, FL 33605",
    lat: 27.9750,
    lng: -82.4350,
    phone: "(813) 272-5220",
    website: "https://hcfl.gov/residents/human-services/help-me-hillsborough"
  },
  {
    id: "11",
    name: "Wheels of Success",
    description: "Helps families maintain or obtain employment by providing reliable transportation.",
    category: "Employment",
    audiences: ["Low-Income", "Families"],
    location: "4610 N Florida Ave, Tampa, FL 33603",
    lat: 27.9880,
    lng: -82.4595,
    phone: "(813) 490-9443",
    website: "https://www.wheelsofsuccess.org"
  },
  {
    id: "12",
    name: "Bay Area Legal Services",
    description: "Providing high-quality legal assistance to low-income residents of the Tampa Bay area.",
    category: "Legal Aid",
    audiences: ["Low-Income", "Seniors", "Veterans"],
    location: "1302 N 19th St, Tampa, FL 33605",
    lat: 27.9585,
    lng: -82.4375,
    phone: "(813) 232-1343",
    website: "https://bals.org"
  }
];

export const TAMPA_NEWS: NewsItem[] = [
    {
      id: "n1",
      title: "Gasparilla 2026: Complete Guide to the Pirate Fest",
      excerpt: "The legendary pirate invasion returns to Tampa's shores. Here is everything you need to know about parking, parade routes, and safety.",
      date: "Jan 20, 2026",
      source: "Patch Tampa",
      category: "Events",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-5-1769318907712.jpg",
      link: "https://patch.com/florida/tampa"
    },
    {
      id: "n2",
      title: "New Affordable Housing Units Open in West Tampa",
      excerpt: "Hillsborough County officials celebrated the ribbon-cutting of a 120-unit complex dedicated to low-income families and veterans.",
      date: "Jan 18, 2026",
      source: "Tampa Bay Times",
      category: "Housing",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-3-1769318907789.webp",
      link: "https://www.tampabay.com"
    },
    {
      id: "n3",
      title: "Feeding Tampa Bay Expands Mobile Pantry Schedule",
      excerpt: "In response to rising food costs, the region's largest food bank is adding three new stops in underserved neighborhoods.",
      date: "Jan 15, 2026",
      source: "Creative Loafing",
      category: "Community",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-10-1769318908163.jpg",
      link: "https://www.cltampa.com"
    },
    {
      id: "n4",
      title: "Tampa Bay Tech Programs Receive $2M Innovation Grant",
      excerpt: "Local career and technical education programs will benefit from new equipment and scholarship opportunities.",
      date: "Jan 12, 2026",
      source: "WFLA News Channel 8",
      category: "Education",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-9-1769318907142.jpg",
      link: "https://www.wfla.com"
    }
];

export const TAMPA_EVENTS: CommunityEvent[] = [
  {
    id: "e1",
    title: "Gasparilla Children's Parade",
    description: "A family-friendly celebration along Bayshore Boulevard featuring a bicycle rodeo, preschooler stroll, and parade.",
    date: "Jan 24, 2026",
    time: "12:00 PM - 7:30 PM",
    location: "Bayshore Blvd, Tampa",
    category: "Family",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/Image-1-1769318907736.jpg",
    link: "https://gasparillapiratefest.com",
    featured: true
  },
  {
    id: "e2",
    title: "Gasparilla Pirate Fest & Parade",
    description: "The main event: the world's only pirate invasion and the third-largest parade in the United States.",
    date: "Jan 31, 2026",
    time: "10:00 AM - 8:00 PM",
    location: "Downtown Tampa / Bayshore",
    category: "Festival",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-5-1769318907712.jpg",
    link: "https://gasparillapiratefest.com",
    featured: true
  },
  {
    id: "e3",
    title: "Ybor City Saturday Market",
    description: "Explore locally grown produce, gourmet foods, and unique arts and crafts in historic Ybor City.",
    date: "Jan 24, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "Centennial Park, Ybor City",
    category: "Community",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-8-resized-1769318907254.webp",
    link: "https://www.ybormarket.com"
  },
  {
    id: "e4",
    title: "Community Career Fair",
    description: "Connect with local employers and career counselors. Open to all residents seeking employment.",
    date: "Feb 5, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Tampa Convention Center",
    category: "Employment",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-4-1769318908177.jpg",
    link: "https://www.tampachamber.com"
  }
];
