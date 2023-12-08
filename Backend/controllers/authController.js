const User = require('../models/User');

const signUpController = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.create({name, email, password});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signUpController
}
