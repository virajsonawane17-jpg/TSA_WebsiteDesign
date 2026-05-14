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
  descriptionEs?: string;
  longDescription?: string;
  longDescriptionEs?: string;
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
  titleEs?: string;
  excerpt: string;
  excerptEs?: string;
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
  titleEs?: string;
  description: string;
  descriptionEs?: string;
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
    descriptionEs: "La organización de rescate y distribución de alimentos más grande de la región, proporcionando alimentos a quienes lo necesitan en 10 condados.",
    longDescription: "Feeding Tampa Bay is the driving force behind hunger relief in the Tampa Bay region. In 2026, they continue to serve over 1 million people through their Causeway Center and mobile pantries, integrating health and job training into their food security mission.",
    longDescriptionEs: "Feeding Tampa Bay es la fuerza impulsora detrás del alivio del hambre en la región de Tampa Bay. En 2026, continúan atendiendo a más de 1 millón de personas a través de su Centro Causeway y despensas móviles, integrando salud y capacitación laboral en su misión de seguridad alimentaria.",
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
    descriptionEs: "Una organización sin fines de lucro de base y financiada por donantes que proporciona alimentos, vivienda y habilidades de vida para personas sin hogar y en riesgo.",
    longDescription: "Serving Hillsborough, Pasco, and Pinellas, Metropolitan Ministries provides over 2.3 million meals annually and emergency shelter for families. Their 2026 initiatives focus on long-term self-sufficiency and family stability.",
    longDescriptionEs: "Sirviendo a Hillsborough, Pasco y Pinellas, Metropolitan Ministries proporciona más de 2.3 millones de comidas anuales y refugio de emergencia para familias. Sus iniciativas de 2026 se centran en la autosuficiencia a largo plazo y la estabilidad familiar.",
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
    descriptionEs: "Servicios unificados de salud conductual, mental y tratamiento de sustancias creados a partir de la fusión de Gracepoint y Cove.",
    longDescription: "Following the landmark 2025 merger, Ibis Healthcare provides comprehensive mental health, primary care, and crisis services to over 50,000 residents. Their new Mariposa facility specialized in women's health opened in early 2026.",
    longDescriptionEs: "Tras la histórica fusión de 2025, Ibis Healthcare proporciona servicios integrales de salud mental, atención primaria y crisis a más de 50,000 residentes. Su nueva instalación Mariposa, especializada en salud de la mujer, abrió a principios de 2026.",
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
    descriptionEs: "Refugio de emergencia integral que proporciona carpas, cabañas y servicios de acceso a vivienda permanente para adultos.",
    longDescription: "Tampa Hope offers a safe haven for over 300 adults, providing meals, hygiene, and case management with a focus on reaching permanent housing within four months of entry.",
    longDescriptionEs: "Tampa Hope ofrece un refugio seguro para más de 300 adultos, proporcionando comidas, higiene y gestión de casos con el objetivo de alcanzar una vivienda permanente en cuatro meses a partir del ingreso.",
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
    descriptionEs: "Proporciona apoyo las 24 horas, los 7 días de la semana para salud mental, trauma e intervención en crisis.",
    longDescription: "The Crisis Center of Tampa Bay is Hillsborough County's gateway to help. They provide 211 contact center services, trauma counseling, sexual assault services, and suicide prevention.",
    longDescriptionEs: "El Centro de Crisis de Tampa Bay es la puerta de acceso a la ayuda del Condado de Hillsborough. Proporcionan servicios de centro de contacto 211, asesoramiento para traumas, servicios de agresión sexual y prevención del suicidio.",
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
    descriptionEs: "Empodera a los jóvenes para alcanzar su máximo potencial como ciudadanos productivos, solidarios y responsables.",
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
    descriptionEs: "Programa de intervención juvenil que utiliza deportes, agricultura y mentoría para empoderar a los residentes del este de Tampa.",
    longDescription: "G3 Life Applications focuses on holistic youth development. Their recent 70-acre farm expansion provides urban agriculture training alongside their successful sports mentorship programs.",
    longDescriptionEs: "G3 Life Applications se enfoca en el desarrollo integral de los jóvenes. Su reciente expansión de 70 acres de granja proporciona capacitación en agricultura urbana junto con sus exitosos programas de mentoría deportiva.",
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
    descriptionEs: "Organización sin fines de lucro impulsada por la comunidad que proporciona seguridad alimentaria y participación social para la población mayor de Tampa.",
    longDescription: "Hopechest addresses the unique needs of seniors in Tampa Bay, ensuring they have access to nutritious food and a vibrant community network to combat isolation.",
    longDescriptionEs: "Hopechest aborda las necesidades únicas de los adultos mayores en Tampa Bay, asegurando que tengan acceso a alimentos nutritivos y una red comunitaria vibrante para combatir el aislamiento.",
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
    descriptionEs: "Organización sin fines de lucro reciente de 2025 enfocada en la mentoría deportiva juvenil y el empoderamiento educativo.",
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
    descriptionEs: "El principal centro gubernamental para conectar a los residentes con servicios humanos, ayuda contra el desalojo y asistencia de emergencia.",
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
    descriptionEs: "Ayuda a las familias a mantener u obtener empleo proporcionando transporte confiable.",
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
    descriptionEs: "Proporcionando asistencia legal de alta calidad a los residentes de bajos ingresos del área de Tampa Bay.",
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
      titleEs: "Gasparilla 2026: Guía Completa del Festival Pirata",
      excerpt: "The legendary pirate invasion returns to Tampa's shores. Here is everything you need to know about parking, parade routes, and safety.",
      excerptEs: "La legendaria invasión pirata regresa a las costas de Tampa. Aquí está todo lo que necesitas saber sobre el estacionamiento, las rutas del desfile y la seguridad.",
      date: "Jan 20, 2026",
      source: "Patch Tampa",
      category: "Events",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-5-1769318907712.jpg",
      link: "https://patch.com/florida/tampa"
    },
    {
      id: "n2",
      title: "New Affordable Housing Units Open in West Tampa",
      titleEs: "Nuevas Unidades de Vivienda Asequible Abren en West Tampa",
      excerpt: "Hillsborough County officials celebrated the ribbon-cutting of a 120-unit complex dedicated to low-income families and veterans.",
      excerptEs: "Funcionarios del Condado de Hillsborough celebraron la inauguración de un complejo de 120 unidades dedicado a familias de bajos ingresos y veteranos.",
      date: "Jan 18, 2026",
      source: "Tampa Bay Times",
      category: "Housing",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-3-1769318907789.webp",
      link: "https://www.tampabay.com"
    },
    {
      id: "n3",
      title: "Feeding Tampa Bay Expands Mobile Pantry Schedule",
      titleEs: "Feeding Tampa Bay Amplía el Horario de las Despensas Móviles",
      excerpt: "In response to rising food costs, the region's largest food bank is adding three new stops in underserved neighborhoods.",
      excerptEs: "En respuesta al aumento del costo de los alimentos, el banco de alimentos más grande de la región agrega tres nuevas paradas en vecindarios desatendidos.",
      date: "Jan 15, 2026",
      source: "Creative Loafing",
      category: "Community",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-10-1769318908163.jpg",
      link: "https://www.cltampa.com"
    },
    {
      id: "n4",
      title: "Tampa Bay Tech Programs Receive $2M Innovation Grant",
      titleEs: "Programas Tecnológicos de Tampa Bay Reciben Subvención de $2M",
      excerpt: "Local career and technical education programs will benefit from new equipment and scholarship opportunities.",
      excerptEs: "Los programas locales de educación profesional y técnica se beneficiarán de nuevos equipos y oportunidades de becas.",
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
    title: "Tampa Family Resource Fair",
    titleEs: "Feria de Recursos Familiares de Tampa",
    description: "Connect with local nonprofits, health services, and community organizations at this free family-friendly resource fair.",
    descriptionEs: "Conéctate con organizaciones locales sin fines de lucro, servicios de salud y organizaciones comunitarias en esta feria de recursos familiar y gratuita.",
    date: "May 17, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Curtis Hixon Waterfront Park, Tampa",
    category: "Family",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=75",
    link: "https://www.tampa.gov/calendar",
    featured: true
  },
  {
    id: "e2",
    title: "Youth Leadership Workshop",
    titleEs: "Taller de Liderazgo Juvenil",
    description: "An immersive workshop helping Tampa Bay teens develop leadership skills, public speaking, and career readiness.",
    descriptionEs: "Un taller inmersivo que ayuda a los adolescentes de Tampa Bay a desarrollar habilidades de liderazgo, oratoria y preparación profesional.",
    date: "May 21, 2026",
    time: "1:00 PM - 5:00 PM",
    location: "Tampa Bay YMCA, Tampa",
    category: "Youth",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=75",
    link: "https://www.bgctampa.org"
  },
  {
    id: "e3",
    title: "Mental Health Awareness Community Walk",
    titleEs: "Caminata Comunitaria de Concienciación sobre Salud Mental",
    description: "Join neighbors in walking along Bayshore to raise awareness about mental health resources available across Tampa Bay.",
    descriptionEs: "Únete a los vecinos caminando por Bayshore para crear conciencia sobre los recursos de salud mental disponibles en Tampa Bay.",
    date: "May 28, 2026",
    time: "8:00 AM - 11:00 AM",
    location: "Bayshore Boulevard, Tampa",
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=75",
    link: "https://www.crisiscenter.com"
  },
  {
    id: "e4",
    title: "Summer Job Fair — Hillsborough County",
    titleEs: "Feria de Empleo de Verano — Condado de Hillsborough",
    description: "Connect with local employers and career counselors. Open to all residents seeking employment or career advancement.",
    descriptionEs: "Conéctate con empleadores locales y asesores profesionales. Abierto a todos los residentes que buscan empleo o avance profesional.",
    date: "Jun 4, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Tampa Convention Center",
    category: "Employment",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=75",
    link: "https://www.tampachamber.com"
  }
];
