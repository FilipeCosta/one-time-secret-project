const Sequelize = require("sequelize");
const sequelize = require("../utils/database/database");

const bcrypt = require("bcrypt");

const Secret = sequelize.define(
  "secret",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    limit: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    password: Sequelize.STRING,
    description: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (secret) => {
        if (secret.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          secret.password = bcrypt.hashSync(secret.password, salt);
        }
      },
    },
  }
);

Secret.isValidPassword = function (instancePassword, password) {
  console.log("III: ", instancePassword, password);
  return bcrypt.compareSync(password, instancePassword);
};

module.exports = Secret;
