const User = require('../models/User');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signing up a new user
exports.signup = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError("User already exists!", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // Assigning JWT to user
        const token = jwt.sign({ _id: newUser.id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully!',
            token,
            user: {
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error);
    }
};


// Logging in a existing user
exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(new createError('User not found!', 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError('Invalid email or password', 401));
        }

        const token = jwt.sign({ _id: user.id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in Succesfully',
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }


};
