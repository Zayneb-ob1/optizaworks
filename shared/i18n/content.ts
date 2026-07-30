import type { Faq } from "@/shared/content/faqs";
import type { NewsItem } from "@/shared/content/news";
import type { Product } from "@/shared/content/products";
import type { Project } from "@/shared/content/projects";
import type { Service } from "@/shared/content/services";
import type { Locale } from "@/shared/i18n/config";

const serviceTranslations: Record<
  string,
  Pick<Service, "title" | "description" | "details" | "includes">
> = {
  "web-mobile-development": {
    title: "Développement web et mobile",
    description: "Sites web sur mesure, plateformes métier et applications mobiles.",
    details:
      "Sites institutionnels, plateformes métier et applications natives ou multiplateformes conçus selon un périmètre précis et des besoins opérationnels réels.",
    includes: [
      "Conception UX/UI",
      "Développement sur mesure",
      "Intégration d’API",
      "Tests et déploiement",
    ],
  },
  "erp-crm": {
    title: "ERP & CRM",
    description: "Systèmes de gestion intégrés pour les équipes et les opérations complexes.",
    details:
      "Solutions de gestion intégrées pour les organismes publics, les PME et les équipes d’entreprise, couvrant les processus essentiels à leur activité.",
    includes: [
      "Finance et comptabilité",
      "RH et paie",
      "Processus d’achats",
      "Migration de données",
    ],
  },
  cybersecurity: {
    title: "Cybersécurité",
    description: "Audits, durcissement et conformité intégrés à chaque couche.",
    details:
      "Audits de sécurité, durcissement des systèmes et accompagnement à la conformité pour des déploiements robustes, avec des protections pensées dès le départ.",
    includes: [
      "Audits de vulnérabilités",
      "Durcissement de l’infrastructure",
      "Conformité réglementaire",
      "Sensibilisation des équipes",
    ],
  },
  "ai-data": {
    title: "IA et données",
    description: "Automatisation et produits de données au service de meilleures décisions.",
    details:
      "Automatisation documentaire, workflows IA pragmatiques et produits de données utiles pour transformer l’information en décisions plus claires et plus rapides.",
    includes: [
      "Analyse documentaire par IA",
      "Tableaux de bord",
      "Modèles prédictifs",
      "Traitement du langage naturel",
    ],
  },
  "cloud-devops": {
    title: "Cloud et DevOps",
    description: "Infrastructure évolutive, pipelines de livraison et supervision.",
    details:
      "Hébergement, intégration continue et infrastructure évolutive conçus pour garantir la fiabilité des produits à mesure que leur utilisation et leur complexité augmentent.",
    includes: [
      "Architecture cloud",
      "Pipelines CI/CD",
      "Conteneurisation",
      "Supervision et sauvegardes",
    ],
  },
  "digital-transformation": {
    title: "Conseil et transformation numérique",
    description: "Une feuille de route concrète, du diagnostic des systèmes à l’adoption.",
    details:
      "Planification stratégique du système d’information et accompagnement au changement, du premier audit à la livraison, la gouvernance et l’adoption par les équipes.",
    includes: [
      "Audit des systèmes d’information",
      "Feuille de route numérique",
      "Gestion de projet",
      "Conduite du changement",
    ],
  },
  "ux-ui-design": {
    title: "UX/UI et design",
    description: "Des interfaces claires et cohérentes, centrées sur leurs utilisateurs.",
    details:
      "Des interfaces et systèmes de design centrés sur l’utilisateur, qui rendent les outils complexes plus simples à comprendre, utiliser, maintenir et faire évoluer.",
    includes: [
      "Recherche utilisateur",
      "Wireframes et prototypage",
      "Systèmes de design",
      "Tests d’utilisabilité",
    ],
  },
  "maintenance-support": {
    title: "Maintenance et support",
    description: "Un support technique continu pour maintenir la disponibilité des systèmes.",
    details:
      "Maintenance applicative et assistance technique continue pour préserver la disponibilité, résoudre les incidents et accompagner l’évolution du produit.",
    includes: [
      "Support niveaux 1/2/3",
      "Évolution fonctionnelle",
      "Supervision des systèmes",
      "SLA garantis",
    ],
  },
};

export function localizeService(service: Service, locale: Locale): Service {
  if (locale !== "fr") return service;
  const translated = serviceTranslations[service.slug];
  return translated ? { ...service, ...translated } : service;
}

const projectCategoryTranslations: Record<string, string> = {
  "Institutional Website": "Site institutionnel",
  "Public-Sector Website": "Site du secteur public",
  "Education Website": "Site éducatif",
  "Economic Institution Website": "Site d’une institution économique",
  "Public Institution Website": "Site d’une institution publique",
};

const projectServiceTranslations: Record<string, string> = {
  "UX/UI Design": "Design UX/UI",
  "Web Development": "Développement web",
  "Content Architecture": "Architecture de contenu",
  "Web Design": "Design web",
  "Multilingual Content": "Contenu multilingue",
  "Information Architecture": "Architecture de l’information",
  "Content Management": "Gestion de contenu",
  "CMS Integration": "Intégration CMS",
  "Academic Content": "Contenu académique",
  Accessibility: "Accessibilité",
};

const projectStoryTranslations: Record<
  string,
  Pick<Project, "summary" | "challenge" | "solution" | "outcome">
> = {
  "office-des-changes": {
    summary:
      "Un portail public national qui réunit réglementation, données économiques, services numériques et actualités institutionnelles dans une expérience claire.",
    challenge:
      "L’institution s’adresse à plusieurs publics distincts et publie un volume important d’informations réglementaires, statistiques et liées aux services.",
    solution:
      "Nous avons structuré l’expérience autour de parcours clairs, de services en ligne visibles, de ressources consultables et d’un système de publication flexible.",
    outcome:
      "Une présence numérique centrale où citoyens, entreprises, professionnels et partenaires accèdent aux informations et services en ligne essentiels.",
  },
  "indh-tanger-assilah": {
    summary:
      "Un portail régional bilingue présentant les programmes de développement humain, les initiatives publiques, les opportunités de projets et l’actualité locale.",
    challenge:
      "Les programmes et les actions de terrain devaient être compréhensibles et accessibles aux citoyens, associations, porteurs de projets et partenaires institutionnels.",
    solution:
      "Nous avons créé un portail public centré sur le contenu, avec accès en français et en arabe, actualités structurées, informations sur les programmes, médias et ressources pour les plateformes des jeunes.",
    outcome:
      "Un canal officiel unique pour découvrir les initiatives, suivre l’activité régionale et accéder aux possibilités de participation.",
  },
  "ecole-mohammadia-ingenieurs": {
    summary:
      "Le site académique officiel de l’École Mohammadia d’Ingénieurs, reliant formations, recherche, étudiants et actualités de l’établissement.",
    challenge:
      "Une vaste communauté académique avait besoin d’un accès simple aux formations, admissions, ressources de recherche, annonces et services étudiants.",
    solution:
      "Nous avons organisé les contenus institutionnels et académiques dans une architecture responsive, soutenue par des actualités visibles et des parcours adaptés à chaque public.",
    outcome:
      "Un espace numérique unifié pour les futurs étudiants, les étudiants actuels, les enseignants, les chercheurs et les partenaires institutionnels.",
  },
  "encg-settat": {
    summary:
      "Un site universitaire institutionnel réunissant enseignement, recherche, vie étudiante, événements et communications de l’école.",
    challenge:
      "Étudiants, candidats, enseignants et partenaires avaient chacun besoin d’un accès rapide à différentes parties d’une base d’information vaste et souvent actualisée.",
    solution:
      "Nous avons conçu une navigation claire autour des principaux publics de l’école et des mises en page flexibles pour les formations, annonces, événements et contenus institutionnels.",
    outcome:
      "Un site public structuré qui facilite la communication quotidienne tout en présentant l’identité académique de l’école avec cohérence.",
  },
};

const genericStories: Record<
  string,
  Pick<Project, "challenge" | "solution" | "outcome">
> = {
  "Economic Institution Website": {
    challenge:
      "Les professionnels, membres et partenaires régionaux ont besoin d’un accès direct aux services, publications, opportunités et informations institutionnelles à jour.",
    solution:
      "Nous avons organisé l’expérience numérique autour de parcours de services clairs, de contenus accessibles, de mises en page responsives et d’une gestion éditoriale pratique.",
    outcome:
      "Un site officiel fiable qui soutient la communication quotidienne et facilite la découverte des ressources essentielles.",
  },
  "Public Institution Website": {
    challenge:
      "Citoyens, professionnels et partenaires institutionnels ont besoin d’un accès clair et fiable à l’information publique et aux services numériques.",
    solution:
      "Nous avons conçu une expérience responsive centrée sur le contenu, avec une navigation claire, des ressources structurées et des outils de publication flexibles.",
    outcome:
      "Un canal numérique public crédible qui améliore l’accès aux actualités, programmes, documents et services institutionnels.",
  },
  "Education Website": {
    challenge:
      "Candidats, étudiants, équipes et partenaires doivent accéder rapidement aux différentes parties d’une base d’informations académiques fréquemment actualisée.",
    solution:
      "Nous avons créé des parcours clairs pour les formations, admissions, annonces, ressources et communications institutionnelles.",
    outcome:
      "Un espace en ligne structuré qui soutient la communication quotidienne et présente l’établissement avec cohérence sur tous les appareils.",
  },
  "Public-Sector Website": {
    challenge:
      "L’information publique doit rester facile à trouver pour les citoyens tout en inspirant la clarté et la confiance attendues d’une institution officielle.",
    solution:
      "Nous avons construit une structure d’information claire, une interface responsive et une expérience de publication maintenable autour des contenus publics essentiels.",
    outcome:
      "Une présence officielle accessible qui aide les publics à trouver les informations et services institutionnels avec moins de friction.",
  },
};

const frenchProjectTitles: Record<string, string> = {
  "ecole-mohammadia-ingenieurs": "École Mohammadia d’Ingénieurs",
  "istaht-tanger": "ISTAHT Tanger",
  "commune-errachidia": "Commune d’Errachidia",
  "region-oriental": "Région de l’Oriental",
};

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale !== "fr") return project;
  const story =
    projectStoryTranslations[project.slug] ?? genericStories[project.categoryLabel];
  const title = frenchProjectTitles[project.slug] ?? project.title;

  return {
    ...project,
    title,
    categoryLabel: projectCategoryTranslations[project.categoryLabel] ?? project.categoryLabel,
    summary:
      story?.summary ??
      `La plateforme numérique officielle de ${title}, conçue pour faciliter l’accès à ses informations, services et actualités.`,
    challenge: story?.challenge ?? project.challenge,
    solution: story?.solution ?? project.solution,
    outcome: story?.outcome ?? project.outcome,
    services: project.services.map(
      (service) => projectServiceTranslations[service] ?? service,
    ),
    year: project.year === "Live" ? "En ligne" : project.year,
  };
}

const faqTranslations: Record<string, Faq> = {
  "How much does a typical project cost?": {
    question: "Combien coûte généralement un projet ?",
    answer:
      "Chaque mission est définie selon vos objectifs, sa complexité et son calendrier. Après un bref échange de découverte, nous fournissons une proposition claire avec les livrables et des jalons fixes.",
  },
  "What does your process look like?": {
    question: "Comment se déroule votre processus ?",
    answer:
      "Nous avançons par étapes : découverte, stratégie, design, développement, assurance qualité et lancement. Vous recevez régulièrement des nouvelles de l’avancement et validez chaque jalon important.",
  },
  "How long will my project take?": {
    question: "Combien de temps prendra mon projet ?",
    answer:
      "Les sites marketing ciblés demandent souvent 4 à 8 semaines. Les produits logiciels plus importants sont planifiés par phases et commencent généralement par une version définie sur 8 à 12 semaines.",
  },
  "Which technologies do you use?": {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Nous choisissons la technologie adaptée au projet. Notre stack habituelle comprend TypeScript, React, Next.js, Node.js, des plateformes cloud et des systèmes modernes de gestion de contenu.",
  },
  "Do you support products after launch?": {
    question: "Assurez-vous le suivi des produits après leur lancement ?",
    answer:
      "Oui. Nous proposons maintenance continue, supervision, mises à jour de sécurité, support d’infrastructure et évolutions produit selon le niveau d’accompagnement nécessaire.",
  },
};

export function localizeFaq(faq: Faq, locale: Locale): Faq {
  return locale === "fr" ? (faqTranslations[faq.question] ?? faq) : faq;
}

const newsTranslations: Record<string, NewsItem> = {
  "Participation in a GovTech program": {
    date: "Juillet 2026",
    title: "Participation à un programme GovTech",
    description:
      "Retour sur notre candidature et nos échanges avec les évaluateurs lors d’un appel à projets consacré à la transformation numérique publique.",
  },
  "CONEKE Finance improvements": {
    date: "Juin 2026",
    title: "Améliorations de CONEKE Finance",
    description:
      "Les tableaux de bord budgétaires ont été enrichis de nouveaux indicateurs de suivi pour les organismes publics.",
  },
  "Optizaworks at Technopark Agadir": {
    date: "Mai 2026",
    title: "Optizaworks au Technopark d’Agadir",
    description:
      "Des rencontres avec des partenaires institutionnels consacrées à la transformation numérique des administrations locales.",
  },
  "CONEKE HR deployed for a new client": {
    date: "Avril 2026",
    title: "CONEKE RH déployé chez un nouveau client",
    description:
      "Le module d’administration du personnel a été mis en production pour un organisme professionnel régional.",
  },
  "Our technical team is growing": {
    date: "Mars 2026",
    title: "Notre équipe technique s’agrandit",
    description:
      "De nouveaux spécialistes ont rejoint l’équipe pour accompagner le développement de CONEKE et SecureCode AI.",
  },
  "Optizaworks institutional website redesigned": {
    date: "Février 2026",
    title: "Refonte du site institutionnel d’Optizaworks",
    description:
      "Un nouveau site plus clair présentant notre offre, nos produits et nos références vérifiées.",
  },
};

export function localizeNewsItem(item: NewsItem, locale: Locale): NewsItem {
  const translation = newsTranslations[item.title];
  return locale === "fr" && translation
    ? { ...item, ...translation }
    : item;
}

const productTranslations: Record<string, Omit<Product, "code">> = {
  RH: {
    name: "CONEKE RH",
    category: "Gestion des ressources humaines",
    description:
      "Administration complète du personnel conçue pour les organismes publics et les organisations privées.",
    features: [
      "Dossiers administratifs des employés",
      "Gestion des congés et absences",
      "Suivi de la paie",
      "Suivi des carrières et performances",
    ],
  },
  FIN: {
    name: "CONEKE Finance",
    category: "Gestion budgétaire",
    description:
      "Suivi budgétaire et financier conçu pour le niveau de rigueur exigé par les institutions publiques et les entreprises structurées.",
    features: [
      "Préparation et suivi du budget",
      "Tableaux de bord financiers",
      "Suivi des engagements de dépenses",
      "Rapports périodiques",
    ],
  },
  CPT: {
    name: "CONEKE Comptabilité",
    category: "Comptabilité conforme",
    description:
      "Flux de comptabilité publique et privée conformes aux exigences réglementaires en vigueur.",
    features: [
      "Comptabilité générale et analytique",
      "Rapprochement et clôture",
      "Génération des états financiers",
      "Traçabilité complète des transactions",
    ],
  },
};

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale !== "fr") return product;
  const translated = productTranslations[product.code];
  return translated ? { code: product.code, ...translated } : product;
}
