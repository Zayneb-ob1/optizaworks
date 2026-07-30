export type ContactErrorCode =
  | "NAME_REQUIRED"
  | "EMAIL_INVALID"
  | "MESSAGE_TOO_SHORT"
  | "FORM_INVALID"
  | "REQUEST_TOO_LARGE"
  | "INVALID_REQUEST"
  | "RATE_LIMITED"
  | "SERVER_ERROR";

export const contactErrorMessages: Record<ContactErrorCode, string> = {
  NAME_REQUIRED: "Please enter your name.",
  EMAIL_INVALID: "Please enter a valid email address.",
  MESSAGE_TOO_SHORT: "Please enter a message of at least 3 characters.",
  FORM_INVALID: "Please check the form and try again.",
  REQUEST_TOO_LARGE: "Request is too large.",
  INVALID_REQUEST: "Invalid request.",
  RATE_LIMITED: "Too many messages. Please try again later.",
  SERVER_ERROR: "We could not send your message. Please try again.",
};

export type ContactApiResponse =
  | { ok: true }
  | { ok?: false; code: ContactErrorCode; error: string };
