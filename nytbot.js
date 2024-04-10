require("dotenv").config();

const { App } = require("@slack/bolt");
const db = require("./db");

async function start() {
    await db.sync();
    console.log("✅ Db connection OK");

    const slackApp = new App({
        appToken: process.env.SLACK_APP_TOKEN,
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        socketMode: true, // todo maybe: use event api
    });

    // Handlers for supported games
    slackApp.message("Wordle", require("./wordle/handler"));
    slackApp.message("Connections", require("./connections/handler"));
    slackApp.message("New York Times Mini", require("./the-mini/handler"));

    await slackApp.start();
    console.log("✅ Started nytbot");
};

start();