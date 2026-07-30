export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How much does a typical project cost?",
    answer:
      "Every engagement is scoped around your goals, complexity, and timeline. After a short discovery call, we provide a clear proposal with deliverables and fixed milestones.",
  },
  {
    question: "What does your process look like?",
    answer:
      "We move through discovery, strategy, design, development, quality assurance, and launch. You receive regular progress updates and review each key milestone.",
  },
  {
    question: "How long will my project take?",
    answer:
      "Focused marketing websites often take 4–8 weeks. Larger software products are planned in phases and typically begin with a defined 8–12 week release.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "We select technology for the job. Our common stack includes TypeScript, React, Next.js, Node.js, cloud platforms, and modern content management systems.",
  },
  {
    question: "Do you support products after launch?",
    answer:
      "Yes. We offer ongoing maintenance, monitoring, security updates, infrastructure support, and product iteration based on the level of support you need.",
  },
];
