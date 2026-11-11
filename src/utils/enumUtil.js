const SPACES_OR_HYPHENS_REGEX = /[\s-]+/g;

// 'FOOD' → 'Food', 'PERSONAL_CARE' → 'Personal care'
export function formatEnumLabel(value = "") {
  const text = String(value).toLowerCase().replace(/_/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// 'Personal care' → 'PERSONAL_CARE' (the reverse of formatEnumLabel)
export function toEnumKey(value = "") {
  return String(value)
    .trim()
    .toUpperCase()
    .replace(SPACES_OR_HYPHENS_REGEX, "_");
}
