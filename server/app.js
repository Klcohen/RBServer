require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(require('./middleware/headers'));

//connection to DB
const sequelize = require('./db');
sequelize.sync();

//controllers
const user = require('./controllers/usercontroller')
const art = require('./controllers/artController')
const comments = require('./controllers/commentsController')

//body parser
app.use(bodyParser.json());

//routes
app.use("/user", user);
// app.use("/art", art);
// app.use("/comments", comments)

//port its listening on 
app.listen(process.env.PORT, function(){
    console.log(`app is listening on port: ${process.env.PORT}`)
});