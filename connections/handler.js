const { getConnectionsId, getResult } = require("./parser");
const { Op } = require("sequelize");
const db = require("../db");
const { avg } = require("../utility");

module.exports = async ({ event, message, say }) => {
    const connectionsId = getConnectionsId(message.text);
    const result = getResult(message.text);

    if (connectionsId == null || result == null) {
        await say("^ Almost looks like a valid Connections result, but not really");
        return;
    }

    const alreadyPosted = !!await db.models.ConnectionsResult.count({
        where: {
            team: event.team,
            user: event.user,
            channel: event.channel,
            connectionsId: connectionsId,
        },
    });

    if (alreadyPosted) {
        await say("^ I think you already posted this Connections!");
        return;
    }

    await db.models.ConnectionsResult.create({
        team: event.team,
        user: event.user,
        channel: event.channel,
        connectionsId: connectionsId,
        result: result,
        text: message.text,
    });

    const last30Results = await db.models.ConnectionsResult.findAll({
        where: {
            team: event.team,
            user: event.user,
            user: event.user,
            channel: event.channel,
            connectionsId: {
                [Op.gt]: connectionsId - 7,
            },
        },
    });

    await say(
        `<@${event.user}> ${getReaction(result)}`
        + `\n*Connections ${connectionsId}: ${result} mistakes*`
        + `\n_7 day average: ${avg(last30Results.map(x => x.result)).toFixed(3)}_`);
}

function getReaction(result) {
    switch (result) {
        case 0: return "🙌";
        case 1: return "✅";
        case 2: return "🫡";
        case 3: return "😮‍💨";
        case 4: return "💀";
        default: return "🧐";
    }
}