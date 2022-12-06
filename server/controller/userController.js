const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password, avatar } = req.body;
    try {
        const checkEmail = await User.findOne({ email });
        if (checkEmail) return res.status(400).json({ error: 'Email already exists!' });

        const checkUsername = await User.findOne({ username });
        if (checkUsername) return res.status(400).json({ error: 'Username already exists!' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            avatarImg: avatar,
        });

        res.send({ status: true });
    } catch (err) {
        console.log(err);
        res.send({ status: false, err });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const getUser = await User.findOne({ email });
        if (!getUser) return res.status(400).json({ error: 'User does not exist!' });

        const validPassword = await bcrypt.compare(password, getUser.password);
        if (!validPassword) return res.status(400).json({ error: 'Incorrect username or password!' });

        const token = jwt.sign({
            uid: getUser._id,
            username: getUser.username,
            email: getUser.email,
        }, process.env.JWT_SECRET);

        const user = {
            uid: getUser._id,
            username: getUser.username,
            email: getUser.email,
            avatarImg: getUser.avatarImg,
        }
        res.send({ status: true, user, token });
    } catch (err) {
        console.log(err);
        res.send({ status: false, err });
    }
}
