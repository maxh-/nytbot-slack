const { getEmojiGroups } = require("../utility");

module.exports = {
    getConnectionsId,
    getResult,
};

/**
 * Parse Connections id
 * 
 * @param {string} input - pasted connections result
 * @returns {number?} id or null if not found
 */
function getConnectionsId(input) {
    const identifier =
        /Puzzle #?(?<identifier>.*)/g
            .exec(input)
            ?.groups["identifier"]
            ?.replace(/[^\d]/g, "");

    return +identifier || null;
}

/**
 * Parse Connections result
 * 
 * @param {string} input - pasted connections result
 * @returns {number?} Number of mistakes (0-4), or null for invalid input
 */
function getResult(input) {
    const emojiRows = getEmojiGroups(input, "square", 4);
    const guesses = emojiRows?.length;

    if (!guesses || guesses < 4 || guesses > 7) {
        return null; // invalid input
    }

    // Check for completed categories (single color rows)
    const green = getEmojiGroups(input, "green", 4);
    const blue = getEmojiGroups(input, "blue", 4);
    const yellow = getEmojiGroups(input, "yellow", 4);
    const purple = getEmojiGroups(input, "purple", 4);

    const isSolved = green && blue && yellow && purple;
    const mistakes = guesses - (!!green + !!blue + !!yellow + !!purple);

    if (!isSolved && mistakes < 4) {
        return null; // incomplete input
    }

    return mistakes;
}