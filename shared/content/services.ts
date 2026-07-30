export type ServiceIcon =
  | "code"
  | "database"
  | "brain"
  | "cloud"
  | "compass"
  | "layout"
  | "shield"
  | "headphones";

export type Service = {
  slug: string;
  title: string;
  description: string;
  details: string;
  includes: string[];
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    slug: "web-mobile-development",
    title: "Web & Mobile Development",
    description: "Custom websites, business platforms, and mobile applications.",
    details:
      "Institutional websites, business platforms, and native or cross-platform mobile applications designed around a precise scope and real operational needs.",
    includes: [
      "UX/UI design",
      "Custom development",
      "API integration",
      "Testing & deployment",
    ],
    icon: "code",
  },
  {
    slug: "erp-crm",
    title: "ERP & CRM",
    description: "Integrated management systems for teams and complex operations.",
    details:
      "Integrated management solutions for public organizations, SMEs, and enterprise teams, covering the processes that keep the business moving.",
    includes: [
      "Finance & accounting",
      "HR & payroll",
      "Procurement workflows",
      "Data migration",
    ],
    icon: "database",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Audits, hardening, and compliance built into every layer.",
    details:
      "Security audits, system hardening, and compliance support for robust deployments, with safeguards considered from the beginning.",
    includes: [
      "Vulnerability audits",
      "Infrastructure hardening",
      "Regulatory compliance",
      "Team awareness",
    ],
    icon: "shield",
  },
  {
    slug: "ai-data",
    title: "AI & Data",
    description: "Automation and data products that support better decisions.",
    details:
      "Document automation, practical AI workflows, and useful data products that turn information into clearer, faster decisions.",
    includes: [
      "AI document analysis",
      "Data dashboards",
      "Predictive models",
      "Natural language processing",
    ],
    icon: "brain",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Scalable infrastructure, delivery pipelines, and monitoring.",
    details:
      "Hosting, continuous integration, and scalable infrastructure designed to keep products reliable as usage and complexity grow.",
    includes: [
      "Cloud architecture",
      "CI/CD pipelines",
      "Containerization",
      "Monitoring & backups",
    ],
    icon: "cloud",
  },
  {
    slug: "digital-transformation",
    title: "Consulting & Digital Transformation",
    description: "A practical roadmap from systems diagnosis to adoption.",
    details:
      "Strategic information-system planning and change support, from the first audit through delivery, governance, and team adoption.",
    includes: [
      "IT systems audit",
      "Digital roadmap",
      "Project management",
      "Change management",
    ],
    icon: "compass",
  },
  {
    slug: "ux-ui-design",
    title: "UX/UI & Design",
    description: "Clear, coherent interfaces centered on the people using them.",
    details:
      "User-centered interfaces and design systems that make complex tools easier to understand, use, maintain, and evolve.",
    includes: [
      "User research",
      "Wireframing & prototyping",
      "Design systems",
      "Usability testing",
    ],
    icon: "layout",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description: "Continuous technical support that keeps systems available.",
    details:
      "Application maintenance and ongoing technical assistance to protect availability, resolve issues, and support product evolution.",
    includes: [
      "Level 1/2/3 support",
      "Feature evolution",
      "System monitoring",
      "Guaranteed SLAs",
    ],
    icon: "headphones",
  },
];
