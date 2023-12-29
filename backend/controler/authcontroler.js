const User = require('../modal/usermodel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const registration = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({newUser});
    } catch (error) {
        console.log(error)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).json({ error: 'Email is already registered' });
        } else {
            res.status(500).json({ error: 'Error registering user' });
        }
    }
};

const login = async (req, res) => {
    try {
        const { email, password, role, store } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please provide email, password, and role" });
        }

        let userQuery = { email, role };

        if (role === "Manager" || role === "Employee") {
            if (!store) {
                return res.status(400).json({ message: "Please provide store ID" });
            }
            userQuery.store = store;
        }

        const user = await User.findOne(userQuery);

        if (!user) {
            return res.status(400).json({ message: "Invalid email, role, or store" });
        }

        const tokenPayload = { userId: user._id, role: user.role };
        if (store) {
            tokenPayload.store = store;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Enter Correct Password' });
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error authenticating user' });
    }
};



module.exports={registration,login}