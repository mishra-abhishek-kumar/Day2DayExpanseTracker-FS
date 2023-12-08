const express = require('express');
const app = express();

//import required to create environment variables
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

//import required to parse JSON data from a POST request
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//import required for main-routing
const mainRoute = require('./routes/index');

//imports required for DB connection and table creation
const sequelize = require('./util/dbConnect');
const User = require('./models/User');

//import required to allow CORS origin connection
const cors = require("cors");
app.use(cors());

app.use('/', mainRoute);

app.get('/:temp', (req, res) => {
    res.status(400).send("Not Found");
});

const PORT = process.env.PORT || 4001;

sequelize.sync({force: true})
    .then(user => {
        app.listen(PORT, () => {
            console.log("Listening on PORT:", PORT);
        });
    })
    .catch(err => console.log(err));