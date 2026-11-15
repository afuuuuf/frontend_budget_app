const STATUS_MESSAGES = {
  400: "That request wasn't accepted. Check the details and try again.",
  401: "Your session has ended. Please log in again.",
  403: "You don't have permission to do that.",
  404: "We couldn't find what you were looking for.",
  409: "That already exists.",
  422: "Some details look wrong. Check them and try again.",
};

export function getErrorMessage(
  error,
  fallback = "Something went wrong. Please try again.",
) {
  if (import.meta.env.DEV) {
    console.error("[API error]", error);
  }

  const response = error?.response;

  if (!response) {
    return error?.request
      ? "Can't reach the server. Check your connection."
      : fallback;
  }

  const { status, data } = response;
  const detail = data?.detail ?? data?.message ?? data?.error;

  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  if (typeof detail?.message === "string") return detail.message;

  if (status >= 500) {
    return "The server ran into a problem. Please try again in a moment.";
  }
  return STATUS_MESSAGES[status] ?? fallback;
}
