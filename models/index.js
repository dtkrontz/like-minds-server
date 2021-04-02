const db = require('../db');

const UserModel = require('./user');
const GamesModel = require('./myGames');
const CommentsModel = require('./comment');

// associations
UserModel.hasMany(GamesModel);
UserModel.hasMany(CommentsModel);

GamesModel.belongsTo(UserModel);
GamesModel.hasMany(CommentsModel);

CommentsModel.belongsTo(GamesModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        GamesModel,
        CommentsModel
    }
}