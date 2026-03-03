/**
 * Parses a date string as a local date to avoid timezone shifting issues.
 * 
 * When using new Date("YYYY-MM-DD"), JavaScript treats it as UTC midnight.
 * This function ensures it's treated as local time by either:
 * 1. Parsing YYYY-MM-DD into year, month (0-indexed), and day components.
 * 2. Replacing hyphens with slashes (standard JS fallback for local parsing in some environments).
 * 
 * @param {string|Date} dateInput - The date string or object to parse
 * @returns {Date} A Date object representing the input in local time
 */
export const parseLocalDate = (dateInput) => {
    if (!dateInput) return new Date();
    if (dateInput instanceof Date) return dateInput;

    // Handle YYYY-MM-DD format specifically
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateInput)) {
        const [year, month, day] = dateInput.split('T')[0].split('-').map(Number);
        // month - 1 because Date constructor uses 0-indexed months
        return new Date(year, month - 1, day);
    }

    // Fallback for other formats
    const date = new Date(dateInput);

    // If the input was a string without time (e.g. "March 29, 2026") 
    // it usually parses as local anyway, but we want to be safe.
    return date;
};

/**
 * Formats a date object into a consistent local string for display, 
 * defaulting to America/New_York (Eastern Time) for CT consistency.
 * 
 * @param {Date} date - The date object to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} The formatted date string
 */
export const formatLocalDate = (date, options = {}) => {
    const defaultOptions = {
        timeZone: 'America/New_York',
        ...options
    };
    return date.toLocaleDateString('default', defaultOptions);
};

/**
 * Gets the current date adjusted to America/New_York time.
 * Useful for "today" comparisons regardless of where the server/browser is.
 * 
 * @returns {Date} Current date in Eastern Time (midnight)
 */
export const getEasternToday = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const parts = formatter.formatToParts(now);
    const year = parseInt(parts.find(p => p.type === 'year').value);
    const month = parseInt(parts.find(p => p.type === 'month').value);
    const day = parseInt(parts.find(p => p.type === 'day').value);

    return new Date(year, month - 1, day);
};
