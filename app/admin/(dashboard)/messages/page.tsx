import AdminMessagesInbox from "@/components/admin/AdminMessagesInbox";
import { getAdminMessages } from "@/backend/admin/queries";
import {
  adminMessageFilters,
  type AdminInboxMessage,
  type AdminMessageFilter,
  type AdminMessageStatus,
} from "@/shared/admin/messages";

export const metadata = { title: "Messages" };

type AdminMessagesPageProps = {
  searchParams: Promise<{
    q?: string;
    filter?: string;
    page?: string;
  }>;
};

const messageDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Casablanca",
});

const messageTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Casablanca",
});

function isMessageFilter(value: string): value is AdminMessageFilter {
  return adminMessageFilters.some((filter) => filter === value);
}

export default async function AdminMessagesPage({
  searchParams,
}: AdminMessagesPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const requestedFilter = typeof params.filter === "string" ? params.filter : "all";
  const filter = isMessageFilter(requestedFilter) ? requestedFilter : "all";
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const inbox = getAdminMessages({
    query,
    filter,
    page: Number.isFinite(requestedPage) ? requestedPage : 1,
    pageSize: 10,
  });
  const messages: AdminInboxMessage[] = inbox.messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    status: message.status as AdminMessageStatus,
    adminNotes: message.adminNotes,
    createdAtIso: message.createdAt.toISOString(),
    dateLabel: messageDateFormatter.format(message.createdAt),
    timeLabel: messageTimeFormatter.format(message.createdAt),
  }));

  return (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Inbox
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
          Project enquiries
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">
          Read, organize and follow up on messages submitted through the public contact form.
        </p>
      </div>

      <AdminMessagesInbox
        messages={messages}
        counts={inbox.counts}
        filter={inbox.filter}
        query={inbox.query}
        page={inbox.page}
        total={inbox.total}
        totalPages={inbox.totalPages}
      />
    </>
  );
}
