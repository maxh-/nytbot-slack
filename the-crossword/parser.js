module.exports = {
    getDate,
    getResultingTime,
};

/**
 * Parse Date from The Crossword result
 * 
 * @param {string} input - pasted The Crossword result
 * @returns {Date?} date or null if not found
 */
function getDate(input) {
    const dateString =
        /I solved the \w+ (?<date>\S+) New York Times Daily Crossword\s/g
            .exec(input)
            ?.groups["date"];

    const date = new Date(dateString + " UTC");

    return date instanceof Date && !isNaN(date)
        ? date
        : null;
}

/**
 * Parse The Crossword resulting time
 * 
 * @param {string} input - pasted The Crossword result
 * @returns {number?} Resulting time in seconds, or null if invalid input
 */
function getResultingTime(input) {
    const parsedTime =
        /in ((?<hours>\d+):)?(?<minutes>\d+?):(?<seconds>\d+)/g
            .exec(input);

    if (!parsedTime) {
        return null;
    }

    return (+parsedTime.groups["hours"] || 0) * 60 * 60
        + +parsedTime.groups["minutes"] * 60
        + +parsedTime.groups["seconds"] || null;
}