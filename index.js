const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// middleware
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute);

// connect to db
mongoose.connect(process.env.DB_CONNECTION,
 	{ useNewUrlParser: true,
 	 useUnifiedTopology: true },
	() => console.log('connected to db!'));

app.listen(4000, () => console.log('Server up and running'));