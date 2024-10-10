const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  studentName: String,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.post('/attendance', async (req, res) => {
  const { studentName, status } = req.body;
  const attendance = new Attendance({ studentName, status });
  await attendance.save();
  res.status(201).json(attendance);
});

app.get('/attendance', async (req, res) => {
  const records = await Attendance.find();
  res.json(records);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
