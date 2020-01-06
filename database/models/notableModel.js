const mongoose = require('mongoose');

const notableSchema = new mongoose.Schema ({
	dr_name: String
}, {
	timestamps: true
});

module.exports = mongoose.model('notableInfo', notableSchema);