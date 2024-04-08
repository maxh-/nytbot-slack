const { getWordleId, getResult } = require("./parser");
const { Op } = require("sequelize");
const db = require("../db");

module.exports = async ({ event, message, say }) => {
    const wordleId = getWordleId(message.text);
    const result = getResult(message.text);

    if (!wordleId || !result) {
        await say("^ Not a valid Wordle result imo");
        return;
    }

    const alreadyPosted = !!await db.models.WordleResult.count({
        where: {
            team: event.team,
            user: event.user,
            channel: event.channel,
            wordleId: wordleId,
        },
    });

    if (alreadyPosted) {
        await say("^ I think you already submitted this Wordle");
        return;
    }

    await db.models.WordleResult.create({
        team: event.team,
        user: event.user,
        channel: event.channel,
        wordleId: wordleId,
        result: result,
        text: message.text,
    });

    const last30Results = await db.models.WordleResult.findAll({
        where: {
            user: event.user,
            channel: event.channel,
            wordleId: {
                [Op.gt]: wordleId - 30,
            },
        },
    });

    await say(
        `<@${event.user}> ${getReaction(result)}`
        + `\n*Wordle ${wordleId}: ${result}/6*`
        + `\n_30 day average: ${avg(last30Results.map(x => x.result)).toFixed(3)}_`);
}

function getReaction(result) {
    switch (result) {
        case 2: return "😵";
        case 3: return "🙌 Birdie!";
        case 4: return "✅ Par!";
        case 5: return "🫡";
        case 6: return "😮‍💨";
        case 7: return "💀";
        default: return "🧐";
    }
}

function avg(arr) {
    return ((arr?.reduce((a, b) => a + b, 0) / arr.length) ?? 0);
}