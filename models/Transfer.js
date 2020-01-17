const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'transfer',
  {
    idtransfer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    senderid: {
      type: Sequelize.INTEGER
    },
    receiverid: {
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