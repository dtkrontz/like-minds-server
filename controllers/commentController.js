const router = require('express').Router();
const {models} = require('../models');
let validateJWT = require('../middleware/validatesession');

// Get all favorite games saved by all users

router.get('/', async (req, res) => {

    try {
        const favoriteGame = await models.GamesModel.findAll({
            include: 
            // {all: true},
            [{
                model: models.CommentsModel,
                    include: models.UserModel}, 
                {
                    model: models.UserModel
                }],
            where: {
                favorite: true
            }
        });
        res.status(200).json(favoriteGame);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Get all comments per game ID

router.get('/:id', async (req, res) => {
    
    try {
        const userComments = await models.CommentsModel.findAll({
            include: {all: true},
            where: {
                gameId: req.params.id
            }
        });
        res.status(200).json(userComments);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Post comment to specific game

router.post('/comment', validateJWT, async (req, res) => {
    const {content, gameId} = req.body.comment;

    try {
        await models.CommentsModel.create({
            content: content,
            gameId: gameId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: 'successfully added comment'
                });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `Failed to add comment: ${err}`
        });
    };
});

// Put - update comment

router.put('/:id', validateJWT, async (req, res) => {
    const {content} = req.body.comment;

    const userContent = {
        where: {
            userId: req.user.id,
            id: req.params.id,
        }
    };

    const updatedContent = {
        content: content
    };

    try {
        const commentUpdated = await models.CommentsModel.update(updatedContent, userContent);
        res.status(200).json({message: 'Comment Updated', commentUpdated})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
});

// Delete comment

router.delete('/:id', validateJWT, async (req, res) => {

    try {
        const deleteComment = {
            where: {
                userId: req.user.id,
                id: req.params.id,
            }
        };

        await models.CommentsModel.destroy(deleteComment);
        res.status(200).json({message: 'Comment removed'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


module.exports = router;