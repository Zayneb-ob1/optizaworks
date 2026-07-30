export const adminResources = [
  "projects",
  "organizations",
  "services",
  "products",
  "news",
  "faqs",
] as const;

export type AdminResource = (typeof adminResources)[number];

export type AdminField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select" | "url";
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  help?: string;
  wide?: boolean;
};

type AdminResourceDefinition = {
  label: string;
  singular: string;
  description: string;
  titleField: string;
  subtitleField?: string;
  fields: AdminField[];
};

const publishingFields: AdminField[] = [
  { name: "sortOrder", label: "Sort order", type: "number", required: true },
  { name: "published", label: "Published", type: "checkbox" },
];

export const resourceDefinitions: Record<AdminResource, AdminResourceDefinition> = {
  projects: {
    label: "Projects",
    singular: "project",
    description: "Manage portfolio entries, case-study content, and featured work.",
    titleField: "title",
    subtitleField: "categoryLabel",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, help: "Lowercase letters, numbers, and hyphens only." },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { label: "Web", value: "web" },
          { label: "Software", value: "software" },
          { label: "Branding", value: "branding" },
          { label: "App", value: "app" },
        ],
      },
      { name: "categoryLabel", label: "Category label", type: "text", required: true },
      { name: "year", label: "Year / status", type: "text", required: true },
      { name: "organizationId", label: "Organization", type: "select" },
      { name: "image", label: "Cover image path", type: "text", required: true, placeholder: "/projects/example.webp" },
      {
        name: "imageFit",
        label: "Image fit",
        type: "select",
        required: true,
        options: [
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ],
      },
      { name: "website", label: "Live website", type: "url" },
      { name: "clientLogo", label: "Client logo path", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", required: true, wide: true },
      { name: "challenge", label: "Challenge", type: "textarea", required: true, wide: true },
      { name: "solution", label: "Approach", type: "textarea", required: true, wide: true },
      { name: "outcome", label: "Outcome", type: "textarea", required: true, wide: true },
      { name: "services", label: "Services", type: "textarea", required: true, wide: true, help: "One service per line." },
      { name: "featured", label: "Featured on home", type: "checkbox" },
      ...publishingFields,
    ],
  },
  organizations: {
    label: "Organizations",
    singular: "organization",
    description: "Manage institutional logos and official website destinations.",
    titleField: "shortName",
    subtitleField: "name",
    fields: [
      { name: "shortName", label: "Short name", type: "text", required: true },
      { name: "name", label: "Full name", type: "text", required: true, wide: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "website", label: "Official website", type: "url", required: true },
      { name: "logo", label: "Logo path", type: "text", required: true, placeholder: "/partners/example.png" },
      { name: "featured", label: "Featured on home", type: "checkbox" },
      ...publishingFields,
    ],
  },
  services: {
    label: "Services",
    singular: "service",
    description: "Manage the service carousel, navigation previews, and service page.",
    titleField: "title",
    subtitleField: "description",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        required: true,
        options: ["code", "database", "brain", "cloud", "compass", "layout", "shield", "headphones"].map((value) => ({ label: value, value })),
      },
      { name: "description", label: "Short description", type: "textarea", required: true, wide: true },
      { name: "details", label: "Full details", type: "textarea", required: true, wide: true },
      { name: "includes", label: "Included capabilities", type: "textarea", required: true, wide: true, help: "One item per line." },
      ...publishingFields,
    ],
  },
  products: {
    label: "Products",
    singular: "product",
    description: "Manage the CONEKE product modules shown across the website.",
    titleField: "name",
    subtitleField: "category",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "code", label: "Code", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true, wide: true },
      { name: "features", label: "Features", type: "textarea", required: true, wide: true, help: "One feature per line." },
      ...publishingFields,
    ],
  },
  news: {
    label: "News",
    singular: "news item",
    description: "Publish company updates and project milestones.",
    titleField: "title",
    subtitleField: "dateLabel",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "dateLabel", label: "Display date", type: "text", required: true, placeholder: "July 2026" },
      { name: "description", label: "Description", type: "textarea", required: true, wide: true },
      ...publishingFields,
    ],
  },
  faqs: {
    label: "FAQs",
    singular: "FAQ",
    description: "Keep common pre-sales questions accurate and concise.",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text", required: true, wide: true },
      { name: "answer", label: "Answer", type: "textarea", required: true, wide: true },
      ...publishingFields,
    ],
  },
};

export function isAdminResource(value: string): value is AdminResource {
  return adminResources.includes(value as AdminResource);
}
