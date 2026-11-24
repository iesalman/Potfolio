export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  stack: string[];
  keyFeatures: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    security: string;
  };
  metrics?: { label: string; value: string }[];
  githubPlaceholder: string;
  livePlaceholder: string;
  previewType: 'cinescope' | 'nexusmart' | 'taskflow';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    icon: string;
    description: string;
    level?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  topics: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  affiliation: string;
  tag: string;
  isPlaceholder: boolean;
}

export const PERSONAL_INFO = {
  name: "Eyad Seleman",
  brand: "EYAD.SELEMAN",
  role: "Full-Stack MEAN Stack Developer",
  headline: "Building fast, scalable, and secure web applications from database to user interface using MongoDB, Express.js, Angular, and Node.js.",
  about: "I am Eyad Seleman, a Full-Stack Web Developer specializing in the MEAN Stack (MongoDB, Express.js, Angular, and Node.js). With a degree in Computer & Information Science and intensive hands-on training from the National Telecommunication Institute (NTI), I focus on turning complex ideas into responsive, high-performance Single Page Applications (SPAs) backed by clean, well-structured RESTful APIs.\n\nBeyond writing maintainable TypeScript and JavaScript code, I prioritize web application security—implementing JWT authentication, role-based access control, and OWASP best practices to ensure every product is reliable and production-ready.",
  location: "Mansoura, Dakahlia, Egypt",
  availabilityStatus: "Available for Full-Time & Freelance Opportunities",
  highlights: [
    "Computer & Information Science Graduate",
    "NTI MEAN Stack Certified",
    "Open to Full-Time & Freelance Roles"
  ],
  aboutCards: [
    {
      title: "Full-Stack Development",
      description: "Cohesive end-to-end software delivery covering frontend SPAs, backend business logic, and database schemas.",
      icon: "Layers"
    },
    {
      title: "RESTful API Development",
      description: "Clean, self-documenting endpoints with robust input validation, error handling, and predictable JSON responses.",
      icon: "Server"
    },
    {
      title: "Secure Application Architecture",
      description: "Implementing JWT authentication, RBAC authorization, and mitigation of OWASP Top 10 vulnerabilities.",
      icon: "ShieldCheck"
    },
    {
      title: "Responsive UI Engineering",
      description: "Performant, mobile-first, and accessible interfaces leveraging Angular, modern CSS, and component design systems.",
      icon: "Smartphone"
    }
  ],
  links: {
    github: "https://github.com/eyadseleman-placeholder",
    linkedin: "https://linkedin.com/in/eyadseleman-placeholder",
    email: "eyad.seleman.dev@placeholder.com"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "cinescope",
    title: "CineScope",
    tagline: "Movies & Media Database Platform",
    category: "Media / Entertainment",
    description: "A dynamic media discovery web application featuring category filtering (Action, Drama, Comedy), a showcase of recent releases, thumbnail previews, and full CRUD functionality for managing titles, genres, cast details, and release years.",
    stack: ["Angular", "Node.js", "Express.js", "MongoDB", "TypeScript", "RESTful API"],
    keyFeatures: [
      "Dynamic categorization & multi-criteria filtering (Action, Drama, Comedy, Sci-Fi)",
      "Curated trending showcase with animated high-resolution media previews",
      "Full administrative CRUD operations for catalog, metadata, and cast records",
      "Optimized MongoDB indexing for fast sub-50ms title and genre queries",
      "Responsive Angular SPA with reactive state management and lazy-loaded routes"
    ],
    architecture: {
      frontend: "Angular Single Page Application with RxJS observables & standalone components",
      backend: "Node.js & Express.js REST API with modular controllers and middleware",
      database: "MongoDB with Mongoose schemas, text search indices, and validation rules",
      security: "JWT protected admin mutation routes, payload sanitization, and CORS controls"
    },
    metrics: [
      { label: "Query Latency", value: "< 45ms" },
      { label: "CRUD Endpoints", value: "14 Routes" },
      { label: "Architecture", value: "RESTful SPA" }
    ],
    githubPlaceholder: "https://github.com/eyadseleman/cinescope-mean",
    livePlaceholder: "https://cinescope-demo.eyadseleman.dev",
    previewType: "cinescope"
  },
  {
    id: "nexusmart",
    title: "NexusMart",
    tagline: "Full-Stack E-Commerce Web App",
    category: "E-Commerce / Retail",
    description: "An end-to-end online store with JWT user authentication, dynamic product search and filtering, shopping cart state management, and a protected admin dashboard for inventory control.",
    stack: ["Angular", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "RxJS"],
    keyFeatures: [
      "Secure JWT authentication with role-based access control (Customer vs. Admin)",
      "Real-time reactive cart state management powered by RxJS Subject streams",
      "Faceted product filtering by category, price range, brand, and stock status",
      "Comprehensive Admin dashboard for inventory creation, modification, and order audits",
      "Stripe-ready mock checkout pipeline with order invoice generation"
    ],
    architecture: {
      frontend: "Angular reactive forms with custom validators, route guards, and HTTP interceptors",
      backend: "Express.js backend with bcrypt password hashing, auth guards, and async handlers",
      database: "MongoDB normalized schemas for Users, Products, and Order History",
      security: "HttpOnly cookies / Bearer JWT tokens, rate limiting, and sanitization"
    },
    metrics: [
      { label: "Auth Flow", value: "JWT + RBAC" },
      { label: "State Engine", value: "RxJS Store" },
      { label: "Admin Panel", value: "Protected Dashboard" }
    ],
    githubPlaceholder: "https://github.com/eyadseleman/nexusmart-ecommerce",
    livePlaceholder: "https://nexusmart-demo.eyadseleman.dev",
    previewType: "nexusmart"
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    tagline: "Team Workflow & Task Manager",
    category: "Productivity / SaaS",
    description: "A productivity SPA enabling teams to create, assign, and track tasks across statuses using Angular reactive forms, route guards, and RESTful API endpoints.",
    stack: ["MEAN Stack", "RxJS", "Bootstrap", "TypeScript", "Node.js", "MongoDB"],
    keyFeatures: [
      "Kanban-style multi-column status tracking (Backlog, In Progress, Review, Completed)",
      "Angular Reactive Forms with instant client-side validation and dirty state tracking",
      "Protected navigation with Angular Route Guards ensuring authenticated session access",
      "RESTful API with batch status updates and real-time payload broadcasting",
      "Clean, modern UI designed with responsive Bootstrap and custom CSS enhancements"
    ],
    architecture: {
      frontend: "Angular SPA with modular components, shared services, and RxJS pipelines",
      backend: "Node.js/Express service architecture with centralized error handling",
      database: "MongoDB collections with relational object references for assigned users",
      security: "Token authentication, route interception, and role verification"
    },
    metrics: [
      { label: "Board Type", value: "Interactive Kanban" },
      { label: "Form Engine", value: "Angular Reactive" },
      { label: "API Sync", value: "Real-Time REST" }
    ],
    githubPlaceholder: "https://github.com/eyadseleman/taskflow-mean",
    livePlaceholder: "https://taskflow-demo.eyadseleman.dev",
    previewType: "taskflow"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Front-End Development",
    description: "Engineering responsive, type-safe Single Page Applications with dynamic state management.",
    skills: [
      { name: "Angular", icon: "Code2", description: "Modular components, services, dependency injection & lifecycle hooks" },
      { name: "TypeScript", icon: "FileCode", description: "Strict static typing, interfaces, generics & compiler configuration" },
      { name: "JavaScript (ES6+)", icon: "Cpu", description: "Async/await, closures, modern syntax, prototypes & DOM APIs" },
      { name: "RxJS", icon: "Activity", description: "Observables, Subject streams, operators & reactive programming" },
      { name: "HTML5", icon: "Layout", description: "Semantic markup, modern web standards & accessibility primitives" },
      { name: "CSS3", icon: "Palette", description: "Flexbox, CSS Grid, custom properties, animations & media queries" },
      { name: "Bootstrap", icon: "Grid", description: "Rapid responsive layout scaffolding & utility systems" },
      { name: "Responsive Web Design", icon: "Smartphone", description: "Mobile-first layouts adaptable across all viewport dimensions" }
    ]
  },
  {
    title: "Back-End Development",
    description: "Architecting robust, modular servers and predictable RESTful API contracts.",
    skills: [
      { name: "Node.js", icon: "Server", description: "Event-driven asynchronous runtime, event loop & stream handling" },
      { name: "Express.js", icon: "Terminal", description: "Routing controllers, custom middleware & HTTP request pipelines" },
      { name: "RESTful APIs", icon: "Send", description: "Stateless architectures, HTTP verbs, status codes & JSON contracts" },
      { name: "Middleware Architecture", icon: "Sliders", description: "Auth interceptors, logging, error handling & request sanitization" }
    ]
  },
  {
    title: "Databases",
    description: "Designing high-performance NoSQL schemas, indices, and data validation layers.",
    skills: [
      { name: "MongoDB", icon: "Database", description: "Document-oriented database, aggregation pipelines & replica concepts" },
      { name: "Mongoose", icon: "Binary", description: "ODM schemas, validation rules, pre/post hooks & population" },
      { name: "NoSQL Schema Design", icon: "GitFork", description: "Embedded vs. referenced data modeling tailored for access patterns" },
      { name: "Query Optimization", icon: "Zap", description: "Index strategies, projection queries & lean execution profiling" }
    ]
  },
  {
    title: "Security & Tools",
    description: "Hardening applications against threats and maintaining professional engineering workflows.",
    skills: [
      { name: "JWT Authentication", icon: "Key", description: "Token generation, expiration lifecycle, refresh rotation & Bearer verification" },
      { name: "Role-Based Access Control (RBAC)", icon: "Shield", description: "Granular route guards, role authorization & permission matrices" },
      { name: "OWASP Top 10 Fundamentals", icon: "Lock", description: "Protection against injection, XSS, CSRF, broken auth & data exposure" },
      { name: "Git", icon: "GitBranch", description: "Distributed version control, branching strategies & clean commit histories" },
      { name: "GitHub", icon: "Github", description: "Remote repositories, code reviews, pull requests & collaboration" },
      { name: "Postman", icon: "CheckCircle", description: "API contract testing, environment configs & automated collection runs" },
      { name: "VS Code", icon: "TerminalSquare", description: "Advanced debugging, linting integrations & workspace optimization" }
    ]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "degree",
    degree: "Bachelor's Degree in Computer & Information Science",
    institution: "Faculty of Computers and Information",
    period: "Graduated: 2026",
    description: "Rigorous academic curriculum establishing deep foundations in core computer science disciplines, system architecture, algorithmic thinking, and modern software engineering paradigms.",
    topics: [
      "Software Engineering & Architecture",
      "Data Structures & Algorithms",
      "Database Management Systems (RDBMS & NoSQL)",
      "Web Technologies & Distributed Systems",
      "Operating Systems & Computer Networks"
    ]
  },
  {
    id: "nti",
    degree: "MEAN Stack Web Developer Accelerator Program",
    institution: "National Telecommunication Institute (NTI)",
    period: "2026",
    description: "Intensive government-backed professional accelerator program providing rigorous, project-based mastery of full-stack JavaScript/TypeScript engineering across the entire MEAN lifecycle.",
    topics: [
      "End-to-End MEAN Architecture",
      "Angular Single Page Application (SPA) Engineering",
      "Node.js & Express.js Backend Services",
      "MongoDB Schema Design & Query Pipelines",
      "JWT Security & Agile Project Delivery"
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "nti-exp",
    role: "MEAN Stack Web Developer (Project-Based & Training)",
    organization: "National Telecommunication Institute (NTI)",
    location: "Egypt",
    period: "2026",
    type: "Professional Training & Project Delivery",
    achievements: [
      "Architected and deployed full-stack web applications using Angular, Node.js, Express.js, and MongoDB.",
      "Built modular front-end interfaces with TypeScript, RxJS, reactive forms, and route guards.",
      "Engineered secure RESTful APIs with JWT authentication, Mongoose validation, and Postman endpoint testing."
    ],
    technologies: ["Angular", "Node.js", "Express.js", "MongoDB", "TypeScript", "RxJS", "JWT", "Postman"]
  },
  {
    id: "freelance-exp",
    role: "Freelance Full-Stack Web Developer",
    organization: "Independent Practice",
    location: "Remote / Mansoura, Egypt",
    period: "2025 – Present",
    type: "Client Projects & Product Engineering",
    achievements: [
      "Developed custom responsive web applications, dynamic dashboards, and CRUD-driven platforms tailored to client requirements.",
      "Handled full project lifecycles from database modeling and API integration to front-end deployment and Git version control."
    ],
    technologies: ["JavaScript / TypeScript", "Angular", "Node.js", "Express", "MongoDB", "REST APIs", "Git"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "full-stack",
    title: "Full-Stack Web Application Development",
    description: "End-to-end development of custom web platforms using MongoDB, Express.js, Angular, and Node.js. Delivering cohesive, maintainable architectures from database schema to interactive UI.",
    deliverables: [
      "Complete end-to-end MEAN stack architecture",
      "Structured MVC / Service-Repository code pattern",
      "Responsive, cross-browser compatible layouts",
      "Production-ready deployment setups"
    ],
    icon: "Layers"
  },
  {
    id: "spa-engineering",
    title: "Single Page Application (SPA) Engineering",
    description: "Building fast, interactive, and mobile-responsive front-end interfaces with Angular and TypeScript, optimized for instantaneous navigation and reactive user feedback.",
    deliverables: [
      "Modular Angular architecture with Standalone Components",
      "RxJS reactive streams for state and asynchronous events",
      "Form validation with Angular Reactive Forms",
      "Protected client-side routing with Angular Route Guards"
    ],
    icon: "Sparkles"
  },
  {
    id: "rest-apis",
    title: "RESTful API & Backend Architecture",
    description: "Designing scalable server-side logic, third-party integrations, and secure authentication systems with Express.js and Node.js.",
    deliverables: [
      "Predictable, documented RESTful JSON endpoints",
      "JWT-based authentication and role-based authorization",
      "Custom middleware for rate limiting and request validation",
      "Comprehensive Postman collection test coverage"
    ],
    icon: "Server"
  },
  {
    id: "db-optimization",
    title: "Database Design & Optimization",
    description: "Structuring efficient MongoDB schemas, indexing, and data validation with Mongoose to ensure speed, referential consistency, and scale.",
    deliverables: [
      "Optimal NoSQL schema modeling (Embedding vs. Referencing)",
      "Mongoose schema definitions with strict type validation",
      "Compound and single-field index optimization",
      "High-speed aggregation pipelines"
    ],
    icon: "Database"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "mentor-nti",
    quote: "Eyad demonstrates exceptional clarity in full-stack architecture. In the NTI MEAN Stack program, his implementation of Angular reactive forms and secure JWT-based Express APIs stood out for clean code structure and meticulous attention to error handling.",
    name: "NTI Technical Mentor & Senior Instructor",
    role: "Technical Lead & Software Architect",
    affiliation: "National Telecommunication Institute (NTI)",
    tag: "Technical Mentor Feedback Placeholder",
    isPlaceholder: true
  },
  {
    id: "client-freelance",
    quote: "Working with Eyad on our web application was a seamless experience. He translated complex requirements into an intuitive dashboard with reliable MongoDB database modeling, delivered ahead of schedule with clear documentation.",
    name: "Freelance Project Client",
    role: "Product Owner / Client",
    affiliation: "Remote Web Project",
    tag: "Client Feedback Placeholder",
    isPlaceholder: true
  }
];
