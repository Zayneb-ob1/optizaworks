export const adminMessageFilters = [
  "all",
  "unread",
  "read",
  "archived",
] as const;

export type AdminMessageFilter = (typeof adminMessageFilters)[number];

export const adminMessageStatuses = [
  "new",
  "read",
  "replied",
  "archived",
] as const;

export type AdminMessageStatus = (typeof adminMessageStatuses)[number];

export type AdminMessageCounts = {
  all: number;
  unread: number;
  read: number;
  archived: number;
};

export type AdminInboxMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: AdminMessageStatus;
  adminNotes: string;
  createdAtIso: string;
  dateLabel: string;
  timeLabel: string;
};
