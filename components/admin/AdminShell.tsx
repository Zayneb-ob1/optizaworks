"use client";

import {
  Building2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  Menu,
  Package,
  Settings2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { logoutAction } from "@/backend/admin/auth-actions";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/content/organizations", label: "Organizations", icon: Building2 },
  { href: "/admin/content/services", label: "Services", icon: Settings2 },
  { href: "/admin/content/products", label: "Products", icon: Package },
  { href: "/admin/content/news", label: "News", icon: FileText },
  { href: "/admin/content/faqs", label: "FAQs", icon: CircleHelp },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

type AdminShellProps = {
  children: React.ReactNode;
  admin: { name: string; email: string };
  unreadMessages: number;
};

export default function AdminShell({ children, admin, unreadMessages }: AdminShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [liveUnreadMessages, setLiveUnreadMessages] = useState(unreadMessages);
  const [messageNotification, setMessageNotification] = useState("");
  const previousUnreadRef = useRef(unreadMessages);
  const latestUnreadIdRef = useRef<string | null>(null);

  const refreshUnreadMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/messages/summary", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return;

      const summary = (await response.json()) as {
        unreadCount?: unknown;
        latestUnread?: { id?: unknown; name?: unknown } | null;
      };
      if (typeof summary.unreadCount !== "number") return;

      const latestId =
        typeof summary.latestUnread?.id === "string"
          ? summary.latestUnread.id
          : null;
      const latestName =
        typeof summary.latestUnread?.name === "string"
          ? summary.latestUnread.name
          : "a new contact";

      if (
        summary.unreadCount > previousUnreadRef.current &&
        latestId &&
        latestId !== latestUnreadIdRef.current
      ) {
        setMessageNotification(`New message from ${latestName}`);
      }

      previousUnreadRef.current = summary.unreadCount;
      latestUnreadIdRef.current = latestId;
      setLiveUnreadMessages(summary.unreadCount);
    } catch {
      // Keep the server-rendered count if a background refresh is unavailable.
    }
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    previousUnreadRef.current = unreadMessages;
    setLiveUnreadMessages(unreadMessages);
  }, [unreadMessages]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    const refresh = () => void refreshUnreadMessages();
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };

    refresh();
    const interval = window.setInterval(refreshWhenVisible, 30_000);
    window.addEventListener("focus", refresh);
    window.addEventListener("admin:messages-changed", refresh);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("admin:messages-changed", refresh);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [refreshUnreadMessages]);
  useEffect(() => {
    if (!messageNotification) return;
    const timeout = window.setTimeout(() => setMessageNotification(""), 5_000);
    return () => window.clearTimeout(timeout);
  }, [messageNotification]);

  const navigation = (
    <>
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="relative block h-12 w-48 overflow-hidden">
          <Image
            src="/logo-removebg-preview.png"
            alt="Optizaworks admin"
            width={230}
            height={90}
            quality={75}
            sizes="230px"
            priority
            className="absolute -left-1 top-1/2 max-w-none -translate-y-1/2 brightness-0 invert"
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ml-auto rounded-xl p-2 text-white/65 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Admin navigation">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-colors ${
                active ? "bg-white text-primary" : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              {link.label}
              <span className="ml-auto flex items-center gap-2">
                {link.label === "Messages" && liveUnreadMessages > 0 && (
                  <span
                    aria-label={`${liveUnreadMessages} unread ${liveUnreadMessages === 1 ? "message" : "messages"}`}
                    className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white"
                  >
                    {liveUnreadMessages}
                  </span>
                )}
                {active && <ChevronRight size={14} aria-hidden="true" />}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={16} />
          View website
        </a>
        <form action={logoutAction} className="mt-2">
          <button className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white">
            Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-primary-dark lg:flex">
        {navigation}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-primary-dark/55"
            onClick={() => setOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="relative flex h-full w-[min(86vw,288px)] flex-col bg-primary-dark shadow-2xl">
            {navigation}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-primary/10 bg-white/95 px-5 backdrop-blur-md sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mr-4 rounded-xl border border-primary/10 p-2.5 text-primary lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-sm font-semibold text-primary">Optizaworks CMS</p>
            <p className="text-xs text-neutral-500">Content and enquiries</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-semibold text-primary">{admin.name}</p>
            <p className="hidden text-xs text-neutral-500 sm:block">{admin.email}</p>
          </div>
        </header>
        <main id="admin-main" className="mx-auto w-full max-w-[1500px] p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
      {messageNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[80] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-accent/20 bg-primary-dark px-5 py-4 text-sm font-semibold text-white shadow-xl sm:bottom-7 sm:right-7"
        >
          {messageNotification}
        </div>
      )}
    </div>
  );
}
