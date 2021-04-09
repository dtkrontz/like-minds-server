const {DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

module.exports = User;