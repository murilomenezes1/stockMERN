var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stockMERN');



var userSchema = new mongoose.Schema({

	username: String,
	password: String
	// stock:[{ticker: String, price: Number}]
}, {collection: 'usercollection'}
);


module.exports = { Mongoose: mongoose, UserSchema: userSchema }

