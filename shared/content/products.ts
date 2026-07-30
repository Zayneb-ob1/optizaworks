export interface Product {
  code: string;
  name: string;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    code: "RH",
    name: "CONEKE HR",
    category: "Human resources management",
    description:
      "Complete personnel administration designed for public bodies and private organizations.",
    features: [
      "Employee administrative records",
      "Leave and absence management",
      "Payroll monitoring",
      "Career and performance tracking",
    ],
  },
  {
    code: "FIN",
    name: "CONEKE Finance",
    category: "Budget management",
    description:
      "Budget and financial monitoring built for the rigor required by public institutions and structured companies.",
    features: [
      "Budget preparation and monitoring",
      "Financial dashboards",
      "Expenditure commitment tracking",
      "Periodic reporting",
    ],
  },
  {
    code: "CPT",
    name: "CONEKE Accounting",
    category: "Compliant accounting",
    description:
      "Public and private accounting workflows aligned with current regulatory requirements.",
    features: [
      "General and analytical accounting",
      "Reconciliation and closing",
      "Financial statement generation",
      "Complete transaction traceability",
    ],
  },
];
