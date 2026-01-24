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
  | "Arts & Culture"
  | "Food & Housing"
  | "Housing Support"
  | "Public Safety";

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

export const TAMPA_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Metropolitan Ministries",
    description: "Emergency food assistance, housing support, and family stability services for Tampa residents.",
    longDescription: "Metropolitan Ministries provides a wide range of services to those in need, including emergency shelter, food assistance, and educational programs. In 2026, they continue to be a cornerstone of support for Tampa families facing homelessness or food insecurity.",
    category: "Food & Housing",
    audiences: ["Families", "Low-Income", "Everyone"],
    location: "2002 N Florida Ave, Tampa, FL 33602",
    lat: 27.9620,
    lng: -82.4595,
    phone: "(813) 209-1000",
    website: "https://www.metromin.org",
    featured: true
  },
  {
    id: "2",
    name: "Feeding Tampa Bay",
    description: "Large-scale food distribution network serving Hillsborough County.",
    longDescription: "Feeding Tampa Bay is the leading food rescue and distribution organization in the region. Their Causeway Center and mobile pantries provide millions of meals annually, focusing on food security and community health.",
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
    id: "3",
    name: "Bay Area Legal Services",
    description: "Free civil legal help for housing, domestic violence, and benefits access.",
    longDescription: "Bay Area Legal Services offers high-quality legal assistance to low-income residents. They specialize in civil law matters that affect safety, stability, and access to basic needs.",
    category: "Legal Aid",
    audiences: ["Low-Income", "Seniors", "Veterans"],
    location: "1302 N 19th St, Tampa, FL 33605",
    lat: 27.9585,
    lng: -82.4375,
    phone: "(813) 232-1343",
    website: "https://bals.org",
    featured: true
  },
  {
    id: "4",
    name: "Ibis Healthcare",
    description: "Unified behavioral health, mental health, and substance treatment services created from the Gracepoint and Cove merger.",
    longDescription: "Following the landmark 2025 merger, Ibis Healthcare provides comprehensive mental health, primary care, and crisis services to over 50,000 residents.",
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
    id: "5",
    name: "Tampa Hope (Catholic Charities)",
    description: "Comprehensive emergency shelter providing tents, cottages, and path-to-housing services for adults.",
    category: "Housing",
    audiences: ["Everyone", "Low-Income"],
    location: "3704 E 3rd Ave, Tampa, FL 33605",
    lat: 27.9535,
    lng: -82.4150,
    phone: "(813) 415-8002",
    website: "https://www.ccdosp.org/tampa-hope",
    featured: true
  }
];

export const TAMPA_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "City of Tampa Expands Affordable Housing Grants",
    excerpt: "The City Council has approved a $5M expansion of the housing grant program to support more low-income families.",
    date: "Jan 22, 2026",
    source: "City of Tampa News",
    category: "Housing",
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=800&auto=format&fit=crop",
    link: "/news"
  },
  {
    id: "n2",
    title: "Free Community Health Screenings This Month",
    excerpt: "Local health centers are offering free blood pressure and diabetes screenings at multiple locations across East Tampa.",
    date: "Jan 20, 2026",
    source: "Health Hub",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1505751172107-573225a91703?q=80&w=800&auto=format&fit=crop",
    link: "/news"
  },
  {
    id: "n3",
    title: "Local Job Fair Connects Residents With Employers",
    excerpt: "Over 50 local companies are participating in the upcoming Ybor City job fair, offering roles in tech, healthcare, and hospitality.",
    date: "Jan 18, 2026",
    source: "Tampa Employment Network",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    link: "/news"
  }
];

export const TAMPA_EVENTS: CommunityEvent[] = [
  {
    id: "e1",
    title: "Tampa Community Job Fair",
    description: "Connect with over 40 local employers looking to hire immediately. Career counseling also available.",
    date: "Jan 28, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Tampa Convention Center",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop",
    link: "/events"
  },
  {
    id: "e2",
    title: "Free Financial Literacy Workshop",
    description: "Learn how to manage your budget, improve your credit score, and plan for long-term financial stability.",
    date: "Feb 2, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Tampa Heights Community Center",
    category: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1591115765373-520b7a21765b?q=80&w=800&auto=format&fit=crop",
    link: "/events"
  },
  {
    id: "e3",
    title: "Neighborhood Food Distribution Day",
    description: "Fresh produce and shelf-stable goods available for families in East Tampa. No registration required.",
    date: "Feb 5, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Cyrus Greene Park, East Tampa",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    link: "/events"
  }
];
