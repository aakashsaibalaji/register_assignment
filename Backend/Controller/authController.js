const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../Model/user');
dotenv.config()
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phonenumber } = req.body;
        if (!firstname || !lastname || !email || !password || !phonenumber) {
            return res.status(400).send({ msg: "Please fill all fields" });
        }
        const phoneRegex = /^\+91[0-9]{10}$/;
        if (!phoneRegex.test(phonenumber)) {
            return res.status(400).send({ msg: "Invalid phone number format. Phone number should be 10 digits with country code +91 and should not contain any alphabets." });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, password: hashpassword, phonenumber });
        const resp = await newUser.save();
        res.status(200).send({ success: true, message: "User registered successfully", user: resp });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "User not registered successfully" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ msg: "please enter email and password" });
        }
        let user = await User.findOne({email}); 
        if (!user) {
            return res.status(400).send({ msg: "Invalid Email or Password" });
        }
        const match = await bcrypt.compare(password, user.password); 
        if (match) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                message: "Logged in successfully",
                user: { Id: user._id, firstname: user.firstname,lastname:user.lastname, email: user.email,address:user.address,phone:user.phone,role:user.role},
                token
            });
        } else {
            res.status(400).send({ message: "Unsuccessful credentials" }); 
        }
    } catch (err) {
        res.status(500).send({msg:"server side error"});
    }
};

module.exports={
    register,
    login
}