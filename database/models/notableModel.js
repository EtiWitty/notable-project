const mongoose = require('mongoose');

const notableSchemaDr = new mongoose.Schema ({
	d_first_name: String,
	d_last_name: String
}, {
	timestamps: true
});

const notableSchemaAppointment = new mongoose.Schema ({
	p_first_name: String,
	p_last_kind: String,
	kind: String,
	time: Number,
	dr_id: Number
}, {
	timestamps: true
});

module.exports = {
	notableSchemaDr: mongoose.model('notableSchemaDr', notableSchemaDr),
	notableSchemaAppointment: mongoose.model('notableSchemaAppointment', notableSchemaAppointment),
}