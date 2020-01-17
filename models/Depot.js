const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'depot',
  {
    iddepot: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creationdate: {
      type: Sequelize.DATE
    },
    destinationid: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)