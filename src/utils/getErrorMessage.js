// Turns an axios/FastAPI error into a single readable string.
export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error?.response) {
    return error?.request ? "Can't reach the server. Check your connection." : fallback
  }

  const detail = error.response.data?.detail ?? error.response.data?.message

  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail.length > 0) {
    // FastAPI validation errors: [{ loc, msg, type }]
    return detail[0]?.msg ?? fallback
  }
  return fallback
}
