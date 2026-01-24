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
  neighborhood?: string;
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
    name: "Feeding Tampa Bay",
    description: "Large-scale food distribution network serving Hillsborough County.",
    longDescription: "Feeding Tampa Bay is the driving force behind hunger relief in the Tampa Bay region. In 2026, they continue to serve over 1 million people through their Causeway Center and mobile pantries, integrating health and job training into their food security mission.",
    category: "Food Assistance",
    audiences: ["Everyone", "Families", "Seniors", "Low-Income"],
    location: "3624 Causeway Blvd, Tampa, FL 33619",
    neighborhood: "Citywide",
    lat: 27.9255,
    lng: -82.4170,
    phone: "(813) 254-1190",
    website: "https://feedingtampabay.org",
    featured: true
  },
  {
    id: "2",
    name: "Metropolitan Ministries",
    description: "Emergency food assistance, housing support, and family stability services for Tampa residents.",
    longDescription: "Serving Hillsborough, Pasco, and Pinellas, Metropolitan Ministries provides over 2.3 million meals annually and emergency shelter for families. Their 2026 initiatives focus on long-term self-sufficiency and family stability.",
    category: "Housing",
    audiences: ["Families", "Low-Income"],
    location: "2002 N Florida Ave, Tampa, FL 33602",
    neighborhood: "East Tampa",
    lat: 27.9620,
    lng: -82.4595,
    phone: "(813) 209-1000",
    website: "https://www.metromin.org",
    featured: true
  },
  {
    id: "8",
    name: "Bay Area Legal Services",
    description: "Free civil legal help for housing, domestic violence, and benefits access.",
    longDescription: "Providing high-quality legal assistance to low-income residents of the Tampa Bay area. Our services include assistance with domestic violence, housing, consumer, and veteran-specific legal issues.",
    category: "Legal Aid",
    audiences: ["Low-Income", "Seniors", "Veterans"],
    location: "1302 N 19th St, Tampa, FL 33605",
    neighborhood: "Citywide",
    lat: 27.9585,
    lng: -82.4375,
    phone: "(813) 232-1343",
    website: "https://bals.org",
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
    neighborhood: "North Tampa",
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
    neighborhood: "East Tampa",
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
    neighborhood: "North Tampa",
    lat: 28.0682,
    lng: -82.4770,
    phone: "2-1-1 or (813) 964-1964",
    website: "https://www.crisiscenter.com"
  }
];

export const TAMPA_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "City of Tampa Expands Affordable Housing Grants",
    excerpt: "New funding initiatives launched to support first-time homebuyers and affordable rental developments across the city.",
    date: "Jan 22, 2026",
    source: "City of Tampa",
    category: "Housing",
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec239397148?q=80&w=800&auto=format&fit=crop",
    link: "/news/housing-grants"
  },
  {
    id: "n2",
    title: "Free Community Health Screenings This Month",
    excerpt: "Multiple locations in East Tampa and Ybor City will host free health clinics providing basic screenings and immunizations.",
    date: "Jan 20, 2026",
    source: "Hillsborough Health",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
    link: "/news/health-screenings"
  },
  {
    id: "n3",
    title: "Local Job Fair Connects Residents With Employers",
    excerpt: "Over 50 local companies to participate in the upcoming West Tampa career expo this weekend.",
    date: "Jan 18, 2026",
    source: "Tampa Bay Times",
    category: "Employment",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop",
    link: "/news/job-fair"
  }
];

export const TAMPA_EVENTS: CommunityEvent[] = [
  {
    id: "e1",
    title: "Tampa Community Job Fair",
    description: "Meet with over 40 local employers across various industries including healthcare, logistics, and hospitality.",
    date: "Jan 28, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Tampa Convention Center",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop",
    link: "/events/job-fair"
  },
  {
    id: "e2",
    title: "Free Financial Literacy Workshop",
    description: "Learn essential skills for budgeting, saving, and managing credit from local financial experts.",
    date: "Feb 2, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Robert W. Saunders, Sr. Public Library",
    category: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    link: "/events/finance-workshop"
  },
  {
    id: "e3",
    title: "Neighborhood Food Distribution Day",
    description: "Community-led food drive providing fresh produce and pantry staples to families in need.",
    date: "Feb 7, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Copeland Park",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1488459711615-228f0954035d?q=80&w=800&auto=format&fit=crop",
    link: "/events/food-distribution"
  }
];
