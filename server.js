const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

dotEnv.config();

const controller = require('./database/controllers/controller');
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req, res, next) => {
	res.send('Hello to Notable');
});

const handleResponse = (res, err, data) => {
	if (err) {
		res.status(500);
		res.send(err);
	  } else {
		res.status(200);
		res.send(data);
	  }
}

// ===================== DOCTOR =====================
app.post('/doctors/add', (req, res) => {
	controller.addDoctor({
		d_first_name: req.body.first_name,
		d_last_name: req.body.last_name,
	}, (err, data) => handleResponse(res, err, data))
})

// ~~~~~~ Get a list of all doctors 

app.get('/doctors', (req, res) => {
	controller.getAllDoctors((err, data) => handleResponse(res, err, data));
  });

// ===================== Appointments =====================

// ~~~~~~ Get a list of all appointments for a particular doctor and particular day

app.post('/appointment/:id', (req, res) => {
	const time = req.params.time;
	if (time.split(":").length !== 2) {
		res.status(400);
		res.send("time must be in HH:MM format");
		return;
	}
	
	const minute = parseInt(time.split(":")[2], 10);
	if (minute % 15 !== 0) {
		res.status(400);
		res.send("time must be of 15-minute intervals.");
		return;
	}

	controller.getDoctorByName({
		d_first_name: req.params.doctor_first_name,
		d_last_name: req.params.doctor_last_name,
	}, (dr_id) => {
		if (dr_id === null) {
			res.status(400);
			res.send("doctor not found");
		} else {
			controller.addAppointment({
				p_first_name: req.params.first_name,
				p_last_name: req.params.last_name,
				kind: req.params.kind,
				time: req.params.time,
				dr_id,
			}, (err, data) => handleResponse(res, err, data));
		}
	});
  });
  

// ~~~~~~ Delete an existing appointment from a doctor's calendar

app.delete('/doctors/:id/appointment', (req, res) => {
	controller.deleteAppointment(req.params.id, (err, data) => handleResponse(res, err, data));
  });

// ~~~~~ Add a new appointment to a doctor's calendar
	
// New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time but 8:20AM is not)
//A doctor can have multiple appointments with the same time, but no more than 3 appointments can be added with the same time for a given doctor


const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen (PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

//error-handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({
		status: 500,
		message:err.message,
		body: {}
	});
});