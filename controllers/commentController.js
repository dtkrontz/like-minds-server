const router = require('express').Router();
const {models} = require('../models');
let validateJWT = require('../middleware/validatesession');

// Get all favorite games saved by all users

router.get('/', validateJWT, async (req, res) => {

    try {
        const favoriteGame = await models.GamesModel.findAll({
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

router.get('/', validateJWT, async (req, res) => {

    try {
        const userComments = await models.CommentModel.findAll({
            where: {
                gameId: req.game.id
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
    const {content, GameId} = req.body.comment;

    try {
        await models.CommentModel.create({
            content: content,
            GameId: GameId,
            userId: req.user.id
        })
        .then(
            content => {
                res.status(201).json({
                    content: content,
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
    const {content} = req.body.content;

    const userContent = await models.CommentModel.findOne({
        where: {
            userID: req.user.id,
            id: req.params.id,
        }
    });

    const updatedContent = {
        content: content
    };

    try {
        const update = await models.CommentModel.update(updatedContent, userContent);
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

        await models.CommentModel.destroy(deleteComment);
        res.status(200).json({message: 'Comment Deleted'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


module.exports = router;