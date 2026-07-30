import { ArrowRight, BriefcaseBusiness, Building2, Inbox, Settings2 } from "lucide-react";
import Link from "next/link";
import { getAdminDashboardData } from "@/backend/admin/queries";

const stats = [
  { key: "projectCount", label: "Projects", icon: BriefcaseBusiness, href: "/admin/content/projects" },
  { key: "organizationCount", label: "Organizations", icon: Building2, href: "/admin/content/organizations" },
  { key: "serviceCount", label: "Services", icon: Settings2, href: "/admin/content/services" },
  { key: "unreadMessageCount", label: "New messages", icon: Inbox, href: "/admin/messages" },
] as const;

export default function AdminDashboardPage() {
  const data = getAdminDashboardData();

  return (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Overview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
          Website control center.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
          Manage published content and follow every enquiry from one focused workspace.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.key}
              href={stat.href}
              className="group rounded-3xl border border-primary/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/5 text-accent">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <ArrowRight size={17} className="text-neutral-300 transition group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <strong className="mt-7 block text-3xl font-semibold tracking-tight text-primary">
                {data[stat.key]}
              </strong>
              <span className="mt-1 block text-sm text-neutral-500">{stat.label}</span>
            </Link>
          );
        })}
      </div>

      <section className="mt-8 rounded-3xl border border-primary/10 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Inbox</p>
            <h2 className="mt-2 text-xl font-semibold text-primary">Recent enquiries</h2>
          </div>
          <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
            Open inbox <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-6 divide-y divide-primary/10">
          {data.recentMessages.map((message) => (
            <Link
              key={message.id}
              href="/admin/messages"
              className="flex items-center gap-4 py-4 hover:text-accent"
            >
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${message.status === "new" ? "bg-accent" : "bg-neutral-300"}`} />
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm font-semibold text-primary">{message.name}</strong>
                <span className="mt-1 block truncate text-xs text-neutral-500">{message.email}</span>
              </span>
              <time className="hidden text-xs text-neutral-500 sm:block">
                {message.createdAt.toLocaleDateString("en-GB")}
              </time>
            </Link>
          ))}
          {data.recentMessages.length === 0 && (
            <p className="py-10 text-center text-sm text-neutral-500">No enquiries yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
