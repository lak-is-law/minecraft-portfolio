/**
 * Security & Data Integrity Utilities
 * Prevents DOM XSS, reverse tabnabbing, and runtime data manipulation via DevTools.
 */

/**
 * Escapes unsafe HTML characters to prevent DOM-based XSS attacks.
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== 'string') {
    if (str === null || str === undefined) return '';
    return String(str);
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates that an external URL uses a safe scheme (http/https) and opens it
 * with 'noopener,noreferrer' to prevent reverse tabnabbing attacks.
 */
export function safeOpenUrl(url: string, target: string = '_blank'): Window | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    console.warn('Blocked unsafe URL scheme:', trimmed);
    return null;
  }
  return window.open(trimmed, target, 'noopener,noreferrer');
}

/**
 * Recursively freezes an object and all nested properties to prevent
 * runtime tampering or manipulation via browser DevTools / Inspect Element.
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const val = (obj as Record<string, unknown>)[prop];
    if (val !== null && (typeof val === 'object' || typeof val === 'function') && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
  return obj;
}
