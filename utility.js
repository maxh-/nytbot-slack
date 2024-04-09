module.exports.avg = arr =>
    arr.length
        ? (arr.reduce((a, b) => a + b, 0) / arr.length)
        : null;

/**
 * Parser util for finding groups of n consecutive emoji where each emoji name partially 
 * matches the given string (for example: looking for 5 "square" emoji in a row)
 */
module.exports.getEmojiGroups = (input, emojiPartialName, n) =>
    input?.match(new RegExp(`(?::\\w*${emojiPartialName}\\w*:){${n}}`, "gm"));