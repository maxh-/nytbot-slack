const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        underscored: true,
    },
    dialectOptions: {
        ssl: process.env.ENVIRONMENT === "dev"
            ? false
            : { required: true, rejectUnauthorized: false },
    },
});

sequelize.define("WordleResult", {
    team: { type: DataTypes.STRING },
    channel: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
    wordleId: { type: DataTypes.INTEGER },
    result: { type: DataTypes.INTEGER },
});

sequelize.define("ConnectionsResult", {
    team: { type: DataTypes.STRING },
    channel: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
    connectionsId: { type: DataTypes.INTEGER },
    result: { type: DataTypes.INTEGER },
});

sequelize.define("TheMiniResult", {
    team: { type: DataTypes.STRING,  },
    channel: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
    theMiniDate: { type: DataTypes.DATEONLY },
    resultInSeconds: { type: DataTypes.INTEGER },
});

module.exports = sequelize;