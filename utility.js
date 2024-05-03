module.exports.avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

module.exports.formatDate = date =>
    date.toLocaleString(undefined, { month: "short", day: "numeric" });

module.exports.formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.round(timeInSeconds % 60);

    return hours
        ? `${hours}:${`${minutes}`.padStart(2, 0)}:${`${seconds}`.padStart(2, 0)}`
        : `${minutes}:${`${seconds}`.padStart(2, 0)}`;
};

/**
 * Parser util for finding groups of n consecutive emoji where each emoji name partially 
 * matches the given string (for example: looking for 5 "square" emoji in a row)
 */
module.exports.getEmojiGroups = (input, emojiPartialName, n) =>
    input?.match(new RegExp(`(?::\\w*${emojiPartialName}\\w*:){${n}}`, "gm"));