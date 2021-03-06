const dbConnection = require('../connection');
const { notableSchemaDr, notableSchemaAppointment } = require('../models/notableModel');

dbConnection();

const addDoctor = (doctorInfo, cb) => {
	notableSchemaDr.create(doctorInfo).then(cb);
}

const getAllDoctors = (cb) => {
	notableSchemaDr.find().then(cb);
}

const getAllAppointments = (cb) => {
	notableSchemaAppointment.find().then(cb);
}

const getDoctorByName = (doctorInfo, cb) => {
	notableSchemaDr.find(doctorInfo).then(cb);
};

const addAppointment = (appointmentInfo, cb) => {
	notableSchemaAppointment.create(appointmentInfo, cb);
}

const deleteAppointment = (appointmentInfo, cb) => {
	notableSchemaAppointment.findByIdAndDelete(appointmentInfo, cb);
}
module.exports = {
	addDoctor,
	getAllDoctors,
	getAllAppointments,
	getDoctorByName,
	addAppointment,
	deleteAppointment
  };