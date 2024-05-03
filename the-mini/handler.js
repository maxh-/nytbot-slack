const { getResultingTime, getDate } = require("./parser");
const { avg, formatTime } = require("../utility");
const db = require("../db");

module.exports = async ({ event, message, say }) => {
    const date = getDate(message.text);
    const result = getResultingTime(message.text);

    if (date == null || result == null) {
        await say("^ Couldn't parse this Mini result");
        return;
    }

    const alreadyPosted = !!await db.models.TheMiniResult.count({
        where: {
            team: event.team,
            user: event.user,
            channel: event.channel,
            theMiniDate: date,
        },
    });

    if (alreadyPosted) {
        await say("^ I think you already posted this Mini!");
        return;
    }

    await db.models.TheMiniResult.create({
        team: event.team,
        user: event.user,
        channel: event.channel,
        theMiniDate: date,
        resultInSeconds: result,
    });

    const last30Results = await db.models.TheMiniResult.findAll({
        where: {
            team: event.team,
            user: event.user,
            user: event.user,
            channel: event.channel,
        },
        order: [["the_mini_date", "DESC"]],
        limit: 7,
    });

    console.log("result is", result);

    await say(
        `<@${event.user}> ${getReaction(result)}`
        + `\n*The Mini, ${formatDate(date)}: ${formatTime(result)}*`
        + `\n_7 day average: ${formatTime(avg(last30Results.map(x => x.resultInSeconds)))}_`);
}

const getReaction = result =>
    result < 60 ? "🙌" : "✅";

const formatDate = date =>
    date.toLocaleString(undefined, { month: "short", day: "numeric" });