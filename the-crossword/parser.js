module.exports = {
    getDate,
    getResultingTime,
};
// I solved the Sunday 3/02/2024 New York Times Daily Crossword
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
    const parsedTime = /in (?<hours>\d+?)?:?(?<minutes>\d+?):(?<seconds>\d+)/g.exec(input);

    return +parsedTime.groups["hours"] * 60 * 60 + +parsedTime.groups["minutes"] * 60 + +parsedTime.groups["seconds"] || null;
}