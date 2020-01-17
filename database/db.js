    
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('TP1', 'postgres', 'Qehu7112', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;