import { partners, type PartnerCategory } from "@/shared/content/partners";

export const projectTypes = ["web", "software", "branding", "app"] as const;

export type ProjectType = (typeof projectTypes)[number];

export type Project = {
  slug: string;
  title: string;
  category: ProjectType;
  categoryLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  imageFit?: "cover" | "contain";
  services: string[];
  year: string;
  website?: string;
  clientLogo?: string;
};

const featuredProjects: Project[] = [
  {
    slug: "office-des-changes",
    title: "Office des Changes",
    category: "web",
    categoryLabel: "Institutional Website",
    summary:
      "A national public portal bringing regulation, economic data, digital services, and institutional news into one clear experience.",
    challenge:
      "The institution serves several distinct audiences and publishes a large volume of regulatory, statistical, and service-related information.",
    solution:
      "We structured the experience around clear audience pathways, prominent e-services, searchable resources, and a flexible publishing system.",
    outcome:
      "A central digital presence where citizens, businesses, professionals, and partners can reach essential information and online services.",
    image: "/projects/client-sites/office-changes.webp",
    clientLogo: "/partners/office-des-changes.jpg",
    website: "https://www.oc.gov.ma/fr",
    services: ["UX/UI Design", "Web Development", "Content Architecture"],
    year: "Live",
  },
  {
    slug: "indh-tanger-assilah",
    title: "INDH Tanger-Assilah",
    category: "web",
    categoryLabel: "Public-Sector Website",
    summary:
      "A bilingual regional portal presenting human-development programs, public initiatives, project opportunities, and local news.",
    challenge:
      "Programs and field activity needed to be understandable and accessible to citizens, associations, project leaders, and institutional partners.",
    solution:
      "We created a content-led public portal with French and Arabic access, structured news, program information, media, and youth-platform resources.",
    outcome:
      "One official channel for discovering initiatives, following regional activity, and accessing participation opportunities.",
    image: "/projects/client-sites/indh-tanger.webp",
    clientLogo: "/partners/indh-tanger.png",
    website: "https://indh-tangerassilah.ma/",
    services: ["Web Design", "Web Development", "Multilingual Content"],
    year: "Live",
  },
  {
    slug: "ecole-mohammadia-ingenieurs",
    title: "École Mohammadia d’Ingénieurs",
    category: "web",
    categoryLabel: "Education Website",
    summary:
      "The official academic website for Morocco’s historic engineering school, connecting programs, research, students, and school news.",
    challenge:
      "A broad academic community needed a simple way to reach programs, admissions information, research resources, announcements, and student services.",
    solution:
      "We organized institutional and academic content into a responsive information architecture supported by prominent news and direct audience pathways.",
    outcome:
      "A unified online home for prospective students, current students, faculty, researchers, and institutional partners.",
    image: "/projects/client-sites/emi.webp",
    clientLogo: "/partners/emi.png",
    website: "https://www.emi.ac.ma/",
    services: ["Information Architecture", "Web Development", "Content Management"],
    year: "Live",
  },
  {
    slug: "encg-settat",
    title: "ENCG Settat",
    category: "web",
    categoryLabel: "Education Website",
    summary:
      "An institutional university website bringing education, research, student life, events, and school communications together.",
    challenge:
      "Students, candidates, faculty, and partners each needed quick access to different parts of a large and frequently updated information base.",
    solution:
      "We designed clear navigation around the school’s principal audiences and created flexible layouts for programs, announcements, events, and institutional content.",
    outcome:
      "A structured public website that supports daily communication while presenting the school’s academic identity consistently.",
    image: "/projects/client-sites/encg-settat.webp",
    clientLogo: "/partners/encg-settat.png",
    website: "https://www.encgs.ac.ma/",
    services: ["UX/UI Design", "Web Development", "CMS Integration"],
    year: "Live",
  },
];

const featuredPartnerNames = new Set([
  "INDH Tangier",
  "Office des Changes",
  "EMI",
  "ENCG Settat",
]);

const projectSlugs: Record<string, string> = {
  CCISSM: "cciss-souss-massa",
  CARSM: "artisanat-souss-massa",
  "CAG Dakhla": "agriculture-dakhla",
  ANPMA: "anpma",
  CARRSK: "artisanat-rabat-sale-kenitra",
  "AREP Dakhla": "arep-dakhla",
  "Agence Urbaine Dakhla": "agence-urbaine-dakhla",
  "ISTAHT Tangier": "istaht-tanger",
  "ISTAHT Touarga": "istaht-touarga",
  "CQPM Nador": "cqpm-nador",
  "Commune d’Errachidia": "commune-errachidia",
  "Région de l’Oriental": "region-oriental",
  CSPJ: "cspj",
};

const categoryContent: Record<
  PartnerCategory,
  Pick<Project, "categoryLabel" | "challenge" | "solution" | "outcome" | "services">
> = {
  "Economic chambers & agencies": {
    categoryLabel: "Economic Institution Website",
    challenge:
      "Professionals, members, and regional partners need direct access to services, publications, opportunities, and current institutional information.",
    solution:
      "We organized the digital experience around clear service pathways, accessible content, responsive layouts, and a practical content-management structure.",
    outcome:
      "A dependable official website that supports everyday communication and makes key resources easier to discover.",
    services: ["UX/UI Design", "Web Development", "Content Management"],
  },
  "Public institutions & agencies": {
    categoryLabel: "Public Institution Website",
    challenge:
      "Citizens, professionals, and institutional partners need a clear and trustworthy route to public information and digital services.",
    solution:
      "We shaped a responsive, content-led experience with clear navigation, structured resources, and flexible publishing tools.",
    outcome:
      "A credible public digital channel that improves access to institutional news, programs, documentation, and services.",
    services: ["Information Architecture", "Web Development", "CMS Integration"],
  },
  "Education & training": {
    categoryLabel: "Education Website",
    challenge:
      "Candidates, students, staff, and partners each need quick access to different parts of a frequently changing academic information base.",
    solution:
      "We created clear audience pathways for programs, admissions, announcements, resources, and institutional communication.",
    outcome:
      "A structured online home that supports daily communication and presents the institution consistently across devices.",
    services: ["UX/UI Design", "Web Development", "Academic Content"],
  },
  "Local government & justice": {
    categoryLabel: "Public-Sector Website",
    challenge:
      "Public information must remain easy to find for citizens while meeting the clarity and trust expected from an official institution.",
    solution:
      "We built a clear information structure, responsive interface, and maintainable publishing experience around essential public content.",
    outcome:
      "An accessible official presence that helps audiences find institutional information and services with less friction.",
    services: ["Information Architecture", "Web Development", "Accessibility"],
  },
};

const institutionalProjects: Project[] = partners
  .filter((partner) => !featuredPartnerNames.has(partner.shortName))
  .map((partner) => {
    const content = categoryContent[partner.category];

    return {
      slug: projectSlugs[partner.shortName],
      title: partner.shortName,
      category: "web",
      categoryLabel: content.categoryLabel,
      summary: `The official digital platform for ${partner.name}, created to make its information, services, and updates easier to access.`,
      challenge: content.challenge,
      solution: content.solution,
      outcome: content.outcome,
      image: partner.logo,
      imageFit: "contain",
      services: content.services,
      year: "Live",
      website: partner.website,
    };
  });

export const projects: Project[] = [
  ...featuredProjects,
  ...institutionalProjects,
];
