const { getEmojiGroups } = require("../utility");

module.exports = {
    getWordleId,
    getResult,
};

/**
 * Try to parse wordle id
 * 
 * @param {string} input pasted wordle result
 * @returns {number?} id or null if not found
 */
function getWordleId(input) {
    const identifier = /Wordle(?<identifier>.*)\s*.\/.*/g 
        .exec(input)
        ?.groups["identifier"]
        ?.replace(/[^\d]/g, "");

    return +identifier || null;
}

/**
 * Get result (by counting emojis)
 * 
 * @param {string} input pasted wordle result
 * @returns {number?} 1-6, or 7 for fail
 */
function getResult(input) {
    const emojiRows = getEmojiGroups(input, "square", 5);
    const guesses = emojiRows?.length;

    if (!guesses || guesses < 1 || guesses > 6) {
        return null; // invalid
    }

    const isSolved = getEmojiGroups(emojiRows[emojiRows.length - 1], "green_square", 5);

    if (!isSolved && guesses < 6) {
        return null; // incomplete
    }

    if (!isSolved) {
        return 7; // failed
    }

    return guesses;
}