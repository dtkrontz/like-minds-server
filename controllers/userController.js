const router = require("express").Router();
const {models} = require("../models");
const {UniqueConstraintError} = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// CREATE NEW USER

router.post("/register", async (req, res) => {
    let {username, password} = req.body.user;
    try {
        // console.log(username, password, bcrypt.hashSync(password, 15));
        
        await models.UserModel.create({
            username: username,
            password: bcrypt.hashSync(password, 15)
        })
        .then(
            user => {
                let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                res.status(201).json({
                    user: user,
                    message: "User successfully registered",
                    sessionToken: `Bearer ${token}`
                });
            }
        )
        // console.log(jwt.sign({id: User.id}, process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24}));
    } catch (err) {
        console.log (err);
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username already in use",
            });
        } else {
            res.status(500).json({
                message: `Failed to register user ${err}`,
            });
        }
    }
});

// LOG IN WITH AN EXISTING USER

// router.post("/login", async (req, res) => {
//     let {username, password} = req.body.user;

//     try {
//         let loginUser = await models.UserModel.findOne({
//             where: {
//                 username: username,
//             },
//         });
//         if (loginUser) {

//             let passwordComparison = await bcrypt.compare(password, loginUser.password);

//             if (passwordComparison) {

//             let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

//             res.status(200).json({
//                 user: loginUser,
//                 message: "User successfully logged in!",
//                 sessionToken: `Bearer ${token}`
//             });
//         } else {
//             res.status(401).json({
//                 message: "Incorrect username or password"
//             })
//         }
        
//         } else {
//             res.status(401).json({
//                 message: "Incorrect username or password"
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Failed to log user in"
//         })
//     }
// });


module.exports = router;