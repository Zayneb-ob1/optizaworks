"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/shared/content/faqs";

type FaqAccordionProps = {
  items: Faq[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-primary/10 border-y border-primary/10">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <div key={item.question}>
            <button
              id={triggerId}
              type="button"
              className="flex w-full items-center justify-between gap-6 rounded-xl py-6 text-left transition-colors hover:text-accent focus-visible:bg-neutral-50 focus-visible:outline-offset-[-2px]"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="font-semibold text-primary">{item.question}</span>
              <Plus
                size={19}
                aria-hidden="true"
                className={`shrink-0 text-accent transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-neutral-500">
                    {item.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
