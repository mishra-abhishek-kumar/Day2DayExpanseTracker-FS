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
const Expense = require('./models/Expense');
const Order = require('./models/Orders');

//import required to allow CORS origin connection
const cors = require("cors");
app.use(cors());

app.use('/', mainRoute);

app.get('/:temp', (req, res) => {
    res.status(400).send("Not Found");
});

const PORT = process.env.PORT || 4001;

User.hasMany(Expense); //It will create a foreignKey to Comment table 
Expense.belongsTo(User, { constraints: true }); //this constraints specifies that Post table should be created before Comment table

User.hasMany(Order);
Order.belongsTo(User, { constraints: true });

sequelize.sync()
    .then(user => {
        app.listen(PORT, () => {
            console.log("Listening on PORT:", PORT);
        });
    })
    .catch(err => console.log(err));