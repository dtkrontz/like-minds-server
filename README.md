# like-minds-server v1.0

Welcome to Like Minds Server!

LikeMinds is an application where individuals can search for games, add them to their saved list and mark a game as a favorite. Once marked as a favorite game users can navigate to a page where all games marked favorite game can be viewed. Users will be able to add comments on each game. 

This appliation will have the ability to create and store a session token on signup or login. The created session token will allow the user to enjoy this applicaiton for up to 24 hours!

This application has 2 types of users, Normal and Admin. Admins will have access rights that will allow them to delete any comment/comments that may be offensive. Normal users will only be able to edit/delete games/comments associated with their account.

There are 2 full CRUD tables (games and comments) where users will be able to create a game/comment, edit and delete a specific game/comment. 
The Data Associations are as follows:
User has many games and comments,
Game belongs to User and has many comments,
Comments belongs to User and Game.

Come experience the application Where LikeMinds connect!
https://dk-like-minds-client.herokuapp.com/
