const { getResultingTime, getDate } = require("./parser");
const { avg } = require("../utility");
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

    const last30Results = await db.models.TheCrosswordResult.findAll({
        where: {
            team: event.team,
            user: event.user,
            user: event.user,
            channel: event.channel,
        },
        order: [["the_crossword_date", "DESC"]],
        limit: 7,
    });

    await say(
        `<@${event.user}> ${getReaction(result)}`
        + `\n*The Crossword, ${formatDate(date)}: ${formatTime(result)}*`
        + `\n_7 day average: ${formatTime(avg(last30Results.map(x => x.resultInSeconds)))}_`);
}

const getReaction = result =>
    result < 3600 ? "🙌" : "✅";

const formatDate = date =>
    date.toLocaleString(undefined, { month: "short", day: "numeric" });

const formatTime = totalSeconds => {
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor(((totalSeconds - (hours * 60 * 60)) / 60));
    const seconds = Math.floor(((totalSeconds - (minutes * 60)) - (hours * 60 * 60)));

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
