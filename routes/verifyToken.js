const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = function(req, res, next) {
	const token = req.header('auth-token');
	// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3ODQxZGVlYWY1ZTEzYWM3M2UzOTIiLCJpYXQiOjE1NzA0NDE2NDV9.DY5d53Vhr7ZfcWS_FZi5cLfVKmlzj2FrpBvlR9Co1qo';
	// console.log(token)
	if(!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	}catch(err) {
		res.status(400).send('Invalid token');
	}
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3NTc2ZWRkZGZjNTBmNmNjOWZmMmQiLCJpYXQiOjE1NzAyMDcxMDZ9.cq92wX9FOkmkpd0YT-GMTAhr-kO3Xrx05LdyY3gULME