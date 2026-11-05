// Until the API exposes a profile, we derive a friendly name from the email address.
function nameParts(email = '') {
  return email
    .split('@')[0]
    .split(/[._\-+]+/)
    .map((part) => part.replace(/\d/g, ''))
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
}

export const getDisplayName = (email) => nameParts(email).join(' ')
export const getFirstName = (email) => nameParts(email)[0] ?? ''
export const getInitials = (email) =>
  nameParts(email)
    .slice(0, 2)
    .map((part) => part[0])
    .join('') || '?'
