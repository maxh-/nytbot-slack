const { getResultingTime, getDate } = require("./parser");
const { avg, formatTime, formatDate } = require("../utility");
const db = require("../db");

module.exports = async ({ event, message, say }) => {
    const date = getDate(message.text);
    const result = getResultingTime(message.text);

    if (date == null || result == null) {
        await say("^ Couldn't parse this Crossword result");
        return;
    }

    const alreadyPosted = !!await db.models.TheCrosswordResult.count({
        where: {
            team: event.team,
            user: event.user,
            channel: event.channel,
            theCrosswordDate: date,
        },
    });

    if (alreadyPosted) {
        await say("^ I think you already posted this Crossword!");
        return;
    }

    await db.models.TheCrosswordResult.create({
        team: event.team,
        user: event.user,
        channel: event.channel,
        theCrosswordDate: date,
        resultInSeconds: result,
    });

    const recentResults = await db.models.TheCrosswordResult.findAll({
        where: {
            team: event.team,
            user: event.user,
            user: event.user,
            channel: event.channel,
        },
        order: [["the_crossword_date", "DESC"]],
        limit: 14,
    });

    await say(
        `<@${event.user}> ${getReaction(result)}`
        + `\n*The Crossword, ${formatDate(date)}: ${formatTime(result)}*`
        + `\n_14 day average: ${formatTime(avg(recentResults.map(x => x.resultInSeconds)))}_`);
}

const getReaction = result => result < 3600 ? "🙌" : "✅";
