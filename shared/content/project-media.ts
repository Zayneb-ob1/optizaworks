export type ProjectMediaOverride = {
  image: string;
  imageFit: "cover";
  clientLogo: string;
  title?: string;
  website?: string;
};

export const projectMediaOverrides: Readonly<
  Record<string, ProjectMediaOverride>
> = {
  "artisanat-souss-massa": {
    image: "/projects/client-sites/artisanat-souss-massa.webp",
    imageFit: "cover",
    clientLogo: "/partners/casm.webp",
    title: "CASM",
    website: "https://casm.ma/",
  },
  "agriculture-souss-massa": {
    image: "/projects/client-sites/agriculture-souss-massa.webp",
    imageFit: "cover",
    clientLogo: "/partners/carsm.svg",
    title: "CARSM",
    website: "https://chambreagriculturesm.com/fr/",
  },
  "agriculture-dakhla": {
    image: "/projects/client-sites/agriculture-dakhla.webp",
    imageFit: "cover",
    clientLogo: "/partners/cag-dakhla.jpg",
  },
  "arep-dakhla": {
    image: "/projects/client-sites/arep-dakhla.webp",
    imageFit: "cover",
    clientLogo: "/partners/arep-dakhla.png",
  },
  "agence-urbaine-dakhla": {
    image: "/projects/client-sites/agence-urbaine-dakhla.webp",
    imageFit: "cover",
    clientLogo: "/partners/agence-urbaine-dakhla.png",
  },
};
