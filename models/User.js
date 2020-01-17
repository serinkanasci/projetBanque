const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'users',
  {
    iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    mailadress: {
      type: Sequelize.STRING
    },
    passworduser: {
      type: Sequelize.STRING
    },
    adress: {
      type: Sequelize.STRING
    },
    phonenumber: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)