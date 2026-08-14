"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/shared/content/faqs";

type FaqAccordionProps = {
  items: Faq[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-y border-primary/15">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <div key={item.question} className="border-b border-primary/10 last:border-b-0">
            <button
              id={triggerId}
              type="button"
              className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-7"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="font-mono text-[10px] tracking-[0.17em] text-primary/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`text-base font-semibold leading-snug transition-colors sm:text-lg ${open ? "text-accent" : "text-primary group-hover:text-accent"}`}>
                {item.question}
              </span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border transition-[transform,border-color,color] ${open ? "rotate-45 border-accent bg-accent text-white" : "border-primary/15 text-primary group-hover:border-accent/40 group-hover:text-accent"}`}>
                <Plus size={17} aria-hidden="true" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pl-[3.25rem] pr-12 text-sm leading-7 text-neutral-500 sm:pl-[4.5rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
