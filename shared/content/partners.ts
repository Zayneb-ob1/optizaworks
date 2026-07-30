export type PartnerCategory =
  | "Economic chambers & agencies"
  | "Public institutions & agencies"
  | "Education & training"
  | "Local government & justice";

export interface Partner {
  name: string;
  shortName: string;
  logo: string;
  category: PartnerCategory;
  website: string;
  featured?: boolean;
}

export const partners: Partner[] = [
  {
    name: "Chambre de Commerce, d’Industrie et de Services Souss-Massa",
    shortName: "CCISSM",
    logo: "/partners/ccissm.png",
    category: "Economic chambers & agencies",
    website: "https://ccis-agadir.ma/",
  },
  {
    name: "Chambre d’Artisanat de la Région Souss-Massa",
    shortName: "CARSM",
    logo: "/partners/carsm.svg",
    category: "Economic chambers & agencies",
    website: "https://casm.ma/",
  },
  {
    name: "Chambre d’Agriculture de la Région Dakhla-Oued Eddahab",
    shortName: "CAG Dakhla",
    logo: "/partners/cag-dakhla.jpg",
    category: "Economic chambers & agencies",
    website: "https://agridakhla.com/",
  },
  {
    name: "Agence Nationale des Plantes Médicinales et Aromatiques",
    shortName: "ANPMA",
    logo: "/partners/anpma.png",
    category: "Economic chambers & agencies",
    website: "https://anpma.gov.ma/",
  },
  {
    name: "Chambre d’Artisanat de la Région Rabat-Salé-Kénitra",
    shortName: "CARRSK",
    logo: "/partners/carrsk.png",
    category: "Economic chambers & agencies",
    website: "https://www.carrsk.ma/",
  },
  {
    name: "Agence Régionale d’Exécution des Projets Dakhla-Oued Eddahab",
    shortName: "AREP Dakhla",
    logo: "/partners/arep-dakhla.png",
    category: "Public institutions & agencies",
    website: "https://arepdoe.ma/",
  },
  {
    name: "Agence Urbaine de Dakhla-Oued Eddahab",
    shortName: "Agence Urbaine Dakhla",
    logo: "/partners/agence-urbaine-dakhla.png",
    category: "Public institutions & agencies",
    website: "https://www.audakhla.ma/",
  },
  {
    name: "Initiative Nationale pour le Développement Humain Tanger-Assilah",
    shortName: "INDH Tangier",
    logo: "/partners/indh-tanger.png",
    category: "Public institutions & agencies",
    website: "https://indh-tangerassilah.ma/",
  },
  {
    name: "Office des Changes",
    shortName: "Office des Changes",
    logo: "/partners/office-des-changes.jpg",
    category: "Public institutions & agencies",
    website: "https://www.oc.gov.ma/fr",
  },
  {
    name: "École Mohammadia d’Ingénieurs",
    shortName: "EMI",
    logo: "/partners/emi.png",
    category: "Education & training",
    website: "https://www.emi.ac.ma/",
  },
  {
    name: "Institut Spécialisé de Technologie Appliquée Hôtelière et Touristique de Tanger",
    shortName: "ISTAHT Tangier",
    logo: "/partners/istaht-tanger.png",
    category: "Education & training",
    website: "https://istahttanger.ma/",
  },
  {
    name: "Institut Spécialisé de Technologie Appliquée Hôtelière et Touristique de Touarga",
    shortName: "ISTAHT Touarga",
    logo: "/partners/istaht-touarga.jpeg",
    category: "Education & training",
    website: "https://concours-formation.tourisme.gov.ma/",
  },
  {
    name: "Centre de Qualification Professionnelle Maritime de Nador",
    shortName: "CQPM Nador",
    logo: "/partners/cqpm-nador.jpg",
    category: "Education & training",
    website: "https://www.mpm.gov.ma/wps/portal/Dispositif-de-formation",
  },
  {
    name: "École Nationale de Commerce et de Gestion de Settat",
    shortName: "ENCG Settat",
    logo: "/partners/encg-settat.png",
    category: "Education & training",
    website: "https://www.encgs.ac.ma/",
  },
  {
    name: "Commune Urbaine d’Errachidia",
    shortName: "Commune d’Errachidia",
    logo: "/partners/commune-errachidia.png",
    category: "Local government & justice",
    website:
      "https://dgct.performancecommunes.ma/igat/fr/public/commune.php?c=ERRACHIDIA",
  },
  {
    name: "Conseil Régional de l’Oriental",
    shortName: "Région de l’Oriental",
    logo: "/partners/region-oriental.png",
    category: "Local government & justice",
    website: "https://conseilregionoriental.ma/fr",
  },
  {
    name: "Conseil Supérieur du Pouvoir Judiciaire",
    shortName: "CSPJ",
    logo: "/partners/conseil-pouvoir-judiciaire.jpeg",
    category: "Local government & justice",
    website: "https://www.cspj.ma/fr",
  },
];
