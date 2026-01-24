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
}

export const TAMPA_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Feeding Tampa Bay",
    description: "The largest food rescue and distribution organization in the region, providing food to those in need across 10 counties.",
    longDescription: "Feeding Tampa Bay is the driving force behind hunger relief in the Tampa Bay region. They provide food to more than 1 million people through a network of 400+ partners and various programs including mobile pantries and school programs.",
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
    longDescription: "Metropolitan Ministries serves poor and homeless families in Hillsborough, Pinellas, Pasco, and Polk counties. They provide food, shelter, and basic services to help families become self-sufficient.",
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
    name: "Crisis Center of Tampa Bay",
    description: "Provides 24/7 support for mental health, trauma, and crisis intervention services.",
    longDescription: "The Crisis Center of Tampa Bay is Hillsborough County's gateway to help. They provide 211 contact center services, trauma counseling, sexual assault services, and suicide prevention.",
    category: "Mental Health",
    audiences: ["Everyone", "Youth", "Veterans"],
    location: "One Crisis Center Plaza, Tampa, FL 33613",
    lat: 28.0682,
    lng: -82.4770,
    phone: "2-1-1 or (813) 964-1964",
    website: "https://www.crisiscenter.com",
    featured: true
  },
  {
    id: "4",
    name: "Boys & Girls Clubs of Tampa Bay",
    description: "Empowers young people to reach their full potential as productive, caring, and responsible citizens.",
    category: "Youth Programs",
    audiences: ["Youth"],
    location: "1307 N MacDill Ave, Tampa, FL 33607",
    lat: 27.9545,
    lng: -82.4862,
    phone: "(813) 769-7530",
    website: "https://www.bgctampa.org"
  },
  {
    id: "5",
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
    id: "6",
    name: "Bay Area Legal Services",
    description: "Providing high-quality legal assistance to low-income residents of the Tampa Bay area.",
    category: "Legal Aid",
    audiences: ["Low-Income", "Seniors", "Veterans"],
    location: "1302 N 19th St, Tampa, FL 33605",
    lat: 27.9585,
    lng: -82.4375,
    phone: "(813) 232-1343",
    website: "https://bals.org"
  },
  {
    id: "7",
    name: "Special Operations Warrior Foundation",
    description: "Provides full post-secondary educational support to the surviving children of fallen Special Operations Personnel.",
    category: "Education",
    audiences: ["Veterans", "Youth"],
    location: "11370 66th St N, Largo, FL 33773",
    lat: 27.8920,
    lng: -82.7290,
    phone: "(813) 805-9400",
    website: "https://specialops.org"
  },
  {
    id: "8",
    name: "Tampa Family Health Centers",
    description: "Providing affordable, high-quality healthcare to the Tampa community across multiple locations.",
    category: "Healthcare",
    audiences: ["Everyone", "Families", "Low-Income"],
    location: "Multiple Locations across Tampa",
    lat: 27.9600,
    lng: -82.4400,
    phone: "(813) 397-5300",
    website: "https://tampafamilyhc.com"
  },
  {
    id: "9",
    name: "Hillsborough County Social Services",
    description: "Government-run support programs for housing, utilities, and emergency assistance.",
    category: "Crisis Support",
    audiences: ["Low-Income", "Seniors", "Families"],
    location: "Various Community Resource Centers",
    lat: 27.9500,
    lng: -82.4600,
    phone: "(813) 272-5900",
    website: "https://www.hillsboroughcounty.org"
  },
  {
    id: "10",
    name: "A Kid's Place",
    description: "A safe haven for foster siblings to stay together in a loving home environment.",
    category: "Youth Programs",
    audiences: ["Youth"],
    location: "1715 Lithia Pinecrest Rd, Brandon, FL 33511",
    lat: 27.9000,
    lng: -82.2800,
    phone: "(813) 381-3839",
    website: "https://akidsplacetampa.org"
  },
  {
    id: "11",
    name: "St. Vincent de Paul CARES",
    description: "Providing hunger relief and housing services to prevent homelessness.",
    category: "Housing",
    audiences: ["Low-Income", "Veterans"],
    location: "12310 N Nebraska Ave, Tampa, FL 33612",
    lat: 28.0595,
    lng: -82.4515,
    phone: "(813) 977-7057",
    website: "https://www.svdp.care"
  },
  {
    id: "12",
    name: "Salvation Army Tampa",
    description: "Offers disaster relief, emergency assistance, and rehabilitation services.",
    category: "Crisis Support",
    audiences: ["Everyone", "Low-Income"],
    location: "1603 N Florida Ave, Tampa, FL 33602",
    lat: 27.9580,
    lng: -82.4600,
    phone: "(813) 226-0055",
    website: "https://salvationarmytampa.org"
  }
];
