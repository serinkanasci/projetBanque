const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'account',
  {
    idaccount: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    iduser: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER
    },
    accountlimit: {
      type: Sequelize.STRING
    },
    creationdate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)