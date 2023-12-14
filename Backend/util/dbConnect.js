const Sequelize = require("sequelize");

const sequelize = new Sequelize("Day2Day", "root", "root", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
