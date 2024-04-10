module.exports = {
    getDate,
    getResultingTime,
};

/**
 * Parse Date from The Mini result
 * 
 * @param {string} input - pasted The Mini result
 * @returns {Date?} date or null if not found
 */
function getDate(input) {
    const dateString =
        /I solved the (?<date>.+?)\s/g
            .exec(input)
            ?.groups["date"];

    const date = new Date(dateString + " UTC");

    return date instanceof Date && !isNaN(date)
        ? date
        : null;
}

/**
 * Parse The Mini resulting time
 * 
 * @param {string} input - pasted The Mini result
 * @returns {number?} Resulting time in seconds, or null if invalid input
 */
function getResultingTime(input) {
    const parsedTime = /in (?<minutes>\d+?):(?<seconds>\d+)/g.exec(input);

    return +parsedTime.groups["minutes"] * 60 + +parsedTime.groups["seconds"] || null;
}