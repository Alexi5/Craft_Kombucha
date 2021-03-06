const Sequelize = require('sequelize');
const db = require('APP/db'); // eslint-disable-line

const Address = db.define('addresses', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {});

module.exports = Address;
