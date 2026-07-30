export interface NewsItem {
  date: string;
  title: string;
  description: string;
  slug?: string;
  dateKey?: string;
}

export const news: NewsItem[] = [
  {
    date: "July 2026",
    title: "Participation in a GovTech program",
    description:
      "A look back at our application and discussions with evaluators during a call for projects dedicated to public digital transformation.",
  },
  {
    date: "June 2026",
    title: "CONEKE Finance improvements",
    description:
      "Budget dashboards were updated with new monitoring indicators for public organizations.",
  },
  {
    date: "May 2026",
    title: "Optizaworks at Technopark Agadir",
    description:
      "Meetings with institutional partners focused on the digital transformation of local administrations.",
  },
  {
    date: "April 2026",
    title: "CONEKE HR deployed for a new client",
    description:
      "The personnel administration module went into production for a regional professional body.",
  },
  {
    date: "March 2026",
    title: "Our technical team is growing",
    description:
      "New specialists joined to support the growth of CONEKE and SecureCode AI projects.",
  },
  {
    date: "February 2026",
    title: "Optizaworks institutional website redesigned",
    description:
      "A clearer new website presenting our offer, products, and verified references.",
  },
];
