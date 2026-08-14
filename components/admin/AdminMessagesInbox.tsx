"use client";

import {
  Archive,
  ArchiveRestore,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Inbox,
  Mail,
  MailOpen,
  MessageSquareText,
  Reply,
  Search,
  StickyNote,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type MouseEvent,
} from "react";
import {
  archiveMessageAction,
  deleteMessageAction,
  markMessageReadAction,
  markMessageRepliedAction,
  markMessageUnreadAction,
  restoreMessageAction,
  saveMessageNoteAction,
} from "@/backend/admin/message-actions";
import type {
  AdminInboxMessage,
  AdminMessageCounts,
  AdminMessageFilter,
  AdminMessageStatus,
} from "@/shared/admin/messages";

type AdminMessagesInboxProps = {
  messages: AdminInboxMessage[];
  counts: AdminMessageCounts;
  filter: AdminMessageFilter;
  query: string;
  page: number;
  total: number;
  totalPages: number;
};

const filters: Array<{
  value: AdminMessageFilter;
  label: string;
  countKey: keyof AdminMessageCounts;
}> = [
  { value: "all", label: "All", countKey: "all" },
  { value: "unread", label: "Unread", countKey: "unread" },
  { value: "read", label: "Read", countKey: "read" },
  { value: "archived", label: "Archived", countKey: "archived" },
];

const statusLabels: Record<AdminMessageStatus, string> = {
  new: "Unread",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};

function messagesHref({
  filter,
  query,
  page,
}: {
  filter: AdminMessageFilter;
  query: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));
  const suffix = params.toString();
  return suffix ? `/admin/messages?${suffix}` : "/admin/messages";
}

function StatusBadge({ status }: { status: AdminMessageStatus }) {
  const style =
    status === "new"
      ? "bg-accent/10 text-accent"
      : status === "archived"
        ? "bg-neutral-200 text-neutral-600"
        : status === "replied"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-primary/5 text-primary/70";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${style}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export default function AdminMessagesInbox({
  messages,
  counts,
  filter,
  query,
  page,
  total,
  totalPages,
}: AdminMessagesInboxProps) {
  const router = useRouter();
  const [rows, setRows] = useState(messages);
  const [selected, setSelected] = useState<AdminInboxMessage | null>(null);
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [actionError, setActionError] = useState("");
  const [isPending, startTransition] = useTransition();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const selectedId = selected?.id;

  useEffect(() => setRows(messages), [messages]);

  useEffect(() => {
    if (!selectedId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      returnFocusRef.current?.focus();
    };
  }, [selectedId]);

  function announceChange(message = "") {
    setFeedback(message);
    window.dispatchEvent(new Event("admin:messages-changed"));
    router.refresh();
  }

  function updateLocalStatus(id: string, status: AdminMessageStatus) {
    setRows((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status } : message,
      ),
    );
    setSelected((current) =>
      current?.id === id ? { ...current, status } : current,
    );
  }

  function openMessage(
    message: AdminInboxMessage,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    returnFocusRef.current = event.currentTarget;
    setActionError("");
    setFeedback("");
    setNote(message.adminNotes);
    setSelected(message);

    if (message.status !== "new") return;
    startTransition(async () => {
      try {
        await markMessageReadAction(message.id);
        updateLocalStatus(message.id, "read");
        announceChange();
      } catch {
        setActionError("The message could not be marked as read.");
      }
    });
  }

  function toggleRead(message: AdminInboxMessage) {
    if (message.status === "archived") return;
    const markUnread = message.status !== "new";
    setActionError("");
    setFeedback("");

    startTransition(async () => {
      try {
        if (markUnread) {
          await markMessageUnreadAction(message.id);
          updateLocalStatus(message.id, "new");
          announceChange("Message marked as unread.");
        } else {
          await markMessageReadAction(message.id);
          updateLocalStatus(message.id, "read");
          announceChange("Message marked as read.");
        }
      } catch {
        setActionError("The message status could not be updated.");
      }
    });
  }

  function archive(message: AdminInboxMessage) {
    setActionError("");
    setFeedback("");
    startTransition(async () => {
      try {
        await archiveMessageAction(message.id);
        updateLocalStatus(message.id, "archived");
        announceChange("Message archived.");
      } catch {
        setActionError("The message could not be archived.");
      }
    });
  }

  function markReplied(message: AdminInboxMessage) {
    if (message.status === "archived" || message.status === "replied") return;
    setActionError("");
    setFeedback("");
    startTransition(async () => {
      try {
        await markMessageRepliedAction(message.id);
        updateLocalStatus(message.id, "replied");
        announceChange("Message marked as replied.");
      } catch {
        setActionError("The message could not be marked as replied.");
      }
    });
  }

  function restore(message: AdminInboxMessage) {
    setActionError("");
    setFeedback("");
    startTransition(async () => {
      try {
        await restoreMessageAction(message.id);
        updateLocalStatus(message.id, "read");
        announceChange("Message restored to the inbox.");
      } catch {
        setActionError("The message could not be restored.");
      }
    });
  }

  function saveNote() {
    if (!selected) return;
    setActionError("");
    setFeedback("");
    startTransition(async () => {
      try {
        await saveMessageNoteAction(selected.id, note);
        setRows((current) =>
          current.map((message) =>
            message.id === selected.id
              ? { ...message, adminNotes: note.trim() }
              : message,
          ),
        );
        setSelected((current) =>
          current ? { ...current, adminNotes: note.trim() } : current,
        );
        announceChange("Internal note saved.");
      } catch {
        setActionError("The internal note could not be saved.");
      }
    });
  }

  function remove(message: AdminInboxMessage) {
    const confirmed = window.confirm(
      `Delete the message from ${message.name}? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setActionError("");
    setFeedback("");
    startTransition(async () => {
      try {
        await deleteMessageAction(message.id);
        setRows((current) =>
          current.filter((item) => item.id !== message.id),
        );
        if (selected?.id === message.id) setSelected(null);
        announceChange("Message deleted.");
      } catch {
        setActionError("The message could not be deleted.");
      }
    });
  }

  const noMessagesAtAll = counts.all === 0;

  return (
    <>
      <section
        aria-label="Message controls"
        className="mt-8 rounded-3xl border border-primary/10 bg-white p-4 shadow-[0_18px_55px_-48px_rgba(50,16,68,0.45)] sm:p-5"
      >
        <form action="/admin/messages" method="get" className="flex flex-col gap-3 sm:flex-row">
          {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search messages</span>
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="search"
              name="q"
              defaultValue={query}
              maxLength={160}
              placeholder="Search by name, email or message"
              className="min-h-12 w-full rounded-2xl border border-primary/10 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-primary outline-none transition focus:border-accent/45 focus:bg-white focus:ring-2 focus:ring-accent/10"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            Search
          </button>
        </form>

        <nav
          aria-label="Filter messages"
          className="mt-4 flex gap-2 overflow-x-auto pb-1"
        >
          {filters.map((item) => {
            const active = filter === item.value;
            return (
              <Link
                key={item.value}
                href={messagesHref({ filter: item.value, query })}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "border border-primary/10 bg-white text-primary hover:border-accent/30 hover:text-accent"
                }`}
              >
                {item.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    active ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {counts[item.countKey]}
                </span>
              </Link>
            );
          })}
        </nav>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
        <p>
          {total} {total === 1 ? "message" : "messages"}
          {query ? ` matching “${query}”` : ""}
        </p>
        {(query || filter !== "all") && (
          <Link href="/admin/messages" className="font-semibold text-primary hover:text-accent">
            Clear search and filters
          </Link>
        )}
      </div>

      <div aria-live="polite" className="mt-3 min-h-5 text-sm">
        {actionError ? (
          <p className="text-red-700" role="alert">{actionError}</p>
        ) : feedback ? (
          <p className="text-emerald-700">{feedback}</p>
        ) : null}
      </div>

      {rows.length > 0 ? (
        <section
          aria-label="Messages"
          className="mt-2 divide-y divide-primary/10 overflow-hidden rounded-3xl border border-primary/10 bg-white"
        >
          {rows.map((message) => (
            <article
              key={message.id}
              className={`flex flex-col gap-3 px-4 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4 sm:px-6 ${
                message.status === "new" ? "bg-accent/[0.035]" : "hover:bg-neutral-50"
              }`}
            >
              <button
                type="button"
                onClick={(event) => openMessage(message, event)}
                className="group grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:gap-4"
                aria-label={`Open message from ${message.name}`}
              >
                <span
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    message.status === "new"
                      ? "bg-accent text-white"
                      : "bg-primary/5 text-primary"
                  }`}
                >
                  <MessageSquareText size={18} strokeWidth={1.7} aria-hidden="true" />
                  {message.status === "new" && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#38bdf8]" />
                  )}
                </span>

                <span className="min-w-0">
                  <span className="flex min-w-0 items-center gap-2">
                    <strong className="truncate text-sm font-semibold text-primary">
                      {message.name}
                    </strong>
                    <StatusBadge status={message.status} />
                  </span>
                  <span className="mt-1 block truncate text-xs text-neutral-500">
                    {message.email}
                  </span>
                </span>
              </button>

              <div className="flex items-center justify-between gap-3 pl-14 sm:justify-end sm:pl-0">
                <time dateTime={message.createdAtIso} className="text-xs text-neutral-500">
                  {message.dateLabel}
                  <span className="hidden lg:inline"> · {message.timeLabel}</span>
                </time>
                <div className="flex items-center gap-1">
                  {message.status !== "archived" && (
                    <button
                      type="button"
                      onClick={() => toggleRead(message)}
                      disabled={isPending}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 transition-colors hover:bg-primary/5 hover:text-primary disabled:opacity-40"
                      aria-label={message.status === "new" ? "Mark as read" : "Mark as unread"}
                      title={message.status === "new" ? "Mark as read" : "Mark as unread"}
                    >
                      {message.status === "new" ? <MailOpen size={16} /> : <Mail size={16} />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      message.status === "archived" ? restore(message) : archive(message)
                    }
                    disabled={isPending}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 transition-colors hover:bg-primary/5 hover:text-primary disabled:opacity-40"
                    aria-label={message.status === "archived" ? "Restore message" : "Archive message"}
                    title={message.status === "archived" ? "Restore message" : "Archive message"}
                  >
                    {message.status === "archived" ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-3 rounded-3xl border border-dashed border-primary/15 bg-white px-6 py-16 text-center sm:py-20">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
            <Inbox size={24} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold text-primary">
            {noMessagesAtAll ? "No messages yet" : "No messages match your filters"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
            {noMessagesAtAll
              ? "New contact enquiries will appear here automatically."
              : "Try another search term or clear the current filter."}
          </p>
          {!noMessagesAtAll && (
            <Link
              href="/admin/messages"
              className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent"
            >
              Show all messages
            </Link>
          )}
        </section>
      )}

      {totalPages > 1 && (
        <nav aria-label="Messages pagination" className="mt-6 flex items-center justify-between gap-4">
          {page > 1 ? (
            <Link
              href={messagesHref({ filter, query, page: page - 1 })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/10 bg-white px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent"
            >
              <ChevronLeft size={16} aria-hidden="true" /> Previous
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/5 px-4 text-sm text-neutral-400">
              <ChevronLeft size={16} aria-hidden="true" /> Previous
            </span>
          )}
          <span className="text-xs font-medium text-neutral-500">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={messagesHref({ filter, query, page: page + 1 })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/10 bg-white px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent"
            >
              Next <ChevronRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/5 px-4 text-sm text-neutral-400">
              Next <ChevronRight size={16} aria-hidden="true" />
            </span>
          )}
        </nav>
      )}

      {selected && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close message details"
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-primary-dark/60"
          />
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-dialog-title"
            className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(92vw,780px)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem]"
          >
            <header className="sticky top-0 z-10 flex items-start gap-4 border-b border-primary/10 bg-white/95 px-5 py-5 backdrop-blur-md sm:px-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                <MessageSquareText size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 id="message-dialog-title" className="truncate text-lg font-semibold text-primary">
                    {selected.name}
                  </h2>
                  <StatusBadge status={selected.status} />
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  className="mt-1 block truncate text-sm text-accent hover:text-primary"
                >
                  {selected.email}
                </a>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 text-primary hover:bg-neutral-50"
                aria-label="Close message details"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="space-y-6 p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={14} aria-hidden="true" />
                  <time dateTime={selected.createdAtIso}>
                    {selected.dateLabel} at {selected.timeLabel}
                  </time>
                </span>
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-accent hover:text-primary"
                >
                  <Mail size={14} aria-hidden="true" /> Reply by email
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Original message
                </p>
                <p className="mt-3 whitespace-pre-wrap break-words rounded-2xl bg-neutral-50 p-5 text-sm leading-7 text-neutral-700">
                  {selected.message}
                </p>
              </div>

              <div>
                <label htmlFor="message-note" className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <StickyNote size={16} className="text-accent" aria-hidden="true" />
                  Internal note
                </label>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Visible to administrators only. The client’s original message is never changed.
                </p>
                <textarea
                  id="message-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  maxLength={5000}
                  rows={4}
                  className="mt-3 w-full resize-y rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3 text-sm leading-6 text-primary outline-none transition focus:border-accent/45 focus:bg-white focus:ring-2 focus:ring-accent/10"
                  placeholder="Add an optional internal note…"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-neutral-400">{note.length} / 5000</span>
                  <button
                    type="button"
                    onClick={saveNote}
                    disabled={isPending}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-50"
                  >
                    {isPending ? "Saving…" : "Save note"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-primary/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
                {selected.status !== "archived" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleRead(selected)}
                      disabled={isPending}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/10 px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent disabled:opacity-50"
                    >
                      {selected.status === "new" ? <MailOpen size={16} /> : <Mail size={16} />}
                      {selected.status === "new" ? "Mark as read" : "Mark as unread"}
                    </button>
                    {selected.status !== "replied" && (
                      <button
                        type="button"
                        onClick={() => markReplied(selected)}
                        disabled={isPending}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/10 px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent disabled:opacity-50"
                      >
                        <Reply size={16} /> Mark as replied
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => archive(selected)}
                      disabled={isPending}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/10 px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent disabled:opacity-50"
                    >
                      <Archive size={16} /> Archive
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => restore(selected)}
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/10 px-4 text-sm font-semibold text-primary hover:border-accent/30 hover:text-accent disabled:opacity-50"
                  >
                    <ArchiveRestore size={16} /> Restore to inbox
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(selected)}
                  disabled={isPending}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50 sm:ml-auto"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
