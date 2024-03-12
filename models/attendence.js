const Sequelize = require('sequelize');

const sequelize = require('../database');

const attendence = sequelize.define('attendence', {
    id:{
        type: Sequelize.INTEGER,
        allownull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    status: {
        type: Sequelize.ENUM('present', 'absent'),
        allowNull: false
      }
});


module.exports = attendence;