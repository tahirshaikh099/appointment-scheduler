const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");


const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide required information",
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email address already registered",
            });
        }

        const hash_password = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            email,
            hash_password,
        };

        const newUser = new User(userData);
        await newUser.save();

        res.status(StatusCodes.CREATED).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Handle other errors, such as database errors
        console.error('Error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while processing your request",
        });
    }
};



const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist..!!!!!!",
            });
        }

        if (user.authenticate(req.body.password)) {
            // Password matches, no need for JWT token
            const { _id, firstName, lastName, email, role, fullName } = user;
            res.status(StatusCodes.OK).json({
                user: { _id, firstName, lastName, email, role, fullName },
            });
        } else {
            // Incorrect password
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Incorrect password",
            });
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};



const getUser = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide a valid email",
            });
        }

        // Query the database to find the user by username
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User does not exist",
            });
        }

        // Return user data excluding the password
        const { _id, firstName, lastName, email, hash_password, fullName } = user;
        res.status(StatusCodes.OK).json({
            user: { _id, firstName, lastName, email, hash_password, fullName },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

const getAllUser = async (req, res) => {
    try {
        // Query the database to find all users
        const users = await User.find();

        // Return user data excluding the password for all users
        const sanitizedUsers = users.map((user) => {
            const { _id, firstName, lastName, email, fullName } = user;
            return { _id, firstName, lastName, email, fullName };
        });

        res.status(StatusCodes.OK).json({
            users: sanitizedUsers,
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid request does not exist",
        });
        //   res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};


const updateUserPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User not found",
            });
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.hash_password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Current password is incorrect",
            });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.hash_password = newHashedPassword;
        await user.save();

        res.status(StatusCodes.OK).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};


const updateUserDetail = async (req, res) => {
    const { email, firstName, lastName } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User not found",
            });
        }
        const updateUserData = {
            firstName,
            lastName,
            email
        };

        const updateUser = new User(updateUserData);
        await updateUser.save();

        res.status().json({
            message: "User Details updated successfully",
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};


const offHours = async (req, res) => {
    let offHoursData = [];
    try{
        const { offHours } = req.body;
        offHoursData.push(offHours);
        res.status(StatusCodes.OK).json({ message: 'Off-hours set successfully' });
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

module.exports = { signUp, signIn, getUser, updateUserPassword, updateUserDetail, getAllUser, offHours };