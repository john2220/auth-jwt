const router = require('express').Router();
const User =  require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
	// validate data 
	const {error} =	registerValidation(req.body)
	if(error) return res.status(400).send(error.details[0].message);

	// check if email exits
	const emailExists = await User.findOne({email: req.body.email });
	if(emailExists) return res.status(400).send('Email already exists');

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// create user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {	
		const savedUser = await user.save();
		res.send({ user: user._id });
	}catch(err){
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const {error} =	loginValidation(req.body)
	if(error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({email: req.body.email });
	if(!user) return res.status(400).send('Email is not valid');

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Password is not valid');

	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
	console.log(token)
});

module.exports = router;