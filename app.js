require("dotenv").config();
const Express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers');
const middleware = require('./middleware');

const app = Express();

app.use(middleware.CORS);

app.use(Express.json());


app.use('/auth', controllers.UserController);
app.use(middleware.validateSession);
app.use('/games', controllers.GameController);
app.use('/comments', controllers.CommentController);

// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

// app.listen(4000, () => {
//     console.log(`[Server]: App is listening on 4000`);
// });

dbConnection.authenticate()
    .then(() => dbConnection.sync(/* {force: true} */))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(err);
        console.log(`[server]: Server crashed. Error = ${err}`);
    });