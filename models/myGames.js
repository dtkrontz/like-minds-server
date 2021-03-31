const {DataTypes} = require('sequelize');
const db = require('../db');

const Games = db.define('games', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    system: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    favorite: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
})

module.exports = Games;