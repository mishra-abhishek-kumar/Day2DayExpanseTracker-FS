const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    if (!req.headers) {
        return res.status(401).send("Authorization header is required");
    }

    const accessToken = req.header('Authorization');
    console.log('accesstoken >>>>>', accessToken);

    try {
        const decodedUserId = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_PRIVATE_KEY
        );

        console.log('decodedUserId>>>>>>>' , decodedUserId);
        req.id = decodedUserId.id;
        
        const user = await User.findByPk(req.id);
        if(!user) {
            return res.status(404).send('User not found');
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send("Invalid access key");
    }
};