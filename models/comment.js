const {DataTypes} = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    // userName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    content: {
        type: DataTypes.STRING(255),
        allNull: false,
    },
    // user_ID: {
    //     type: DataTypes.NUMBER,
    //     allowNull: false,
    // },
    // game_ID: {
    //     type: DataTypes.NUMBER,
    //     allowNull: false,
    // }
})

module.exports = Comment;