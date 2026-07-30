import {
  BrainCircuit,
  CloudCog,
  Code2,
  Compass,
  Database,
  Headphones,
  LayoutTemplate,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/shared/content/services";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  code: Code2,
  database: Database,
  brain: BrainCircuit,
  cloud: CloudCog,
  compass: Compass,
  layout: LayoutTemplate,
  shield: ShieldCheck,
  headphones: Headphones,
};
