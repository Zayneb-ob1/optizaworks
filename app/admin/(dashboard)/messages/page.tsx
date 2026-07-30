import { Mail, MessageSquareText } from "lucide-react";
import { updateMessageAction } from "@/backend/admin/message-actions";
import { getAdminMessages } from "@/backend/admin/queries";

export const metadata = { title: "Messages" };

export default function AdminMessagesPage() {
  const messages = getAdminMessages();

  return (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Inbox</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
          Project enquiries
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
          Messages submitted through the public contact form, stored securely in the database.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <details key={message.id} className="group rounded-3xl border border-primary/10 bg-white p-5 sm:p-7">
            <summary className="flex cursor-pointer list-none items-center gap-4">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${message.status === "new" ? "bg-accent text-white" : "bg-primary/5 text-primary"}`}>
                <MessageSquareText size={19} />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm font-semibold text-primary">{message.name}</strong>
                <span className="mt-1 block truncate text-xs text-neutral-500">{message.email}</span>
              </span>
              <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500 sm:block">
                {message.status}
              </span>
              <time className="hidden text-xs text-neutral-500 md:block">
                {message.createdAt.toLocaleString("en-GB")}
              </time>
            </summary>

            <div className="mt-6 border-t border-primary/10 pt-6">
              <a href={`mailto:${message.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary">
                <Mail size={15} /> Reply by email
              </a>
              <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-neutral-50 p-5 text-sm leading-7 text-neutral-700">
                {message.message}
              </p>
              <form action={updateMessageAction} className="mt-6 grid gap-5 sm:grid-cols-[220px_1fr_auto] sm:items-end">
                <input type="hidden" name="id" value={message.id} />
                <label>
                  <span className="mb-2 block text-sm font-medium text-primary">Status</span>
                  <select name="status" defaultValue={message.status} className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary">
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-sm font-medium text-primary">Internal notes</span>
                  <input name="adminNotes" defaultValue={message.adminNotes} className="w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary" />
                </label>
                <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-primary">
                  Save
                </button>
              </form>
            </div>
          </details>
        ))}
        {messages.length === 0 && (
          <div className="rounded-3xl border border-dashed border-primary/15 bg-white py-20 text-center text-sm text-neutral-500">
            No messages yet.
          </div>
        )}
      </div>
    </>
  );
}
