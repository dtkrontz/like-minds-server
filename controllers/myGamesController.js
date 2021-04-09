const router = require('express').Router();
const {models} = require('../models');
let validateJWT = require('../middleware/validatesession');

// Get all games saved by user

router.get('/', validateJWT, async (req, res) => {
    
    try {
        const userGames = await models.GamesModel.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(userGames);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Get one game saved by user

router.get('/:id', validateJWT, async (req, res) => {
    
    try {
        const userGames = await models.GamesModel.findOne({
            where: {
                userId: req.user.id,
                id: req.params.id
            }
        });
        res.status(200).json(userGames);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Post game to saved list

router.post('/', validateJWT, async (req, res) => {
    const {title, genre, system, description, image_url, review, rating, favorite} = req.body.games;
     
    try {
        await models.GamesModel.create({
            title: title,
            genre: genre,
            system: system,
            description: description,
            image_url: image_url,
            review: review,
            rating: rating,
            favorite: favorite,
            userId: req.user.id
        })
        .then(
            game => {
                res.status(201).json({
                    game: game,
                    message: 'game saved'
                });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `Failed to save game: ${err}`
        })
    }
})

// Put - Edit game

router.put('/:id', validateJWT, async (req, res) => {
    const {title, genre, system, description, image_url, review, rating, favorite} = req.body.games;
    
    try {
        
        const userGame = {
            where: {
                userId: req.user.id,
                id: req.params.id
            }
        }
    
        const updatedGame = {
            title: title,
            genre: genre,
            system: system,
            description: description,
            image_url: image_url,
            review: review,
            rating: rating,
            favorite: favorite,
        };

        const gamesUpdated = await models.GamesModel.update(updatedGame, userGame);

        // const gamesUpdated = await models.GamesModel.update(
        //     {title, genre, system, description, image_url, review, rating, favorite},
        //     {where: {
        //         userId: req.user.id,
        //         id: req.params.id
        //     }}
        // );
        res.status(200).json({message: 'Game Updated', gamesUpdated});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

// Delete game from save list

router.delete('/:id', validateJWT, async (req, res) => {
    
    try {
        const deleteGame = {
            where: {
                userId: req.user.id,
                id: req.params.id,
            }
        };

        await models.GamesModel.destroy(deleteGame);
        res.status(200).json({message: 'Game converted to binary code'})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});


module.exports = router;