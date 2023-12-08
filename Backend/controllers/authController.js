const User = require('../models/User');
const bcrypt = require('bcrypt');

const signUpController = async (req, res) => {
    try {
        //spreading user information from request body
        const { name, email, password } = req.body;

        //checking if any field is empty
        if (!name || !email || !email) {
            return res.status(400).send("All fields are required");
        }

        //checking if the user already exists
        const oldUser = await User.findAll({ where: { email: email}}); //this returns an array
        if (oldUser.length > 0) {
            return res.status(409).send("User is already registered");
        }

        //hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user
        const user = await User.create({name, email, password: hashedPassword});
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    signUpController
}
