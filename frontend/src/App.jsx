import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [studentName, setStudentName] = useState('');
  const [status, setStatus] = useState('Present');
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const response = await axios.get('http://localhost:5000/attendance');
    setRecords(response.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/attendance', { studentName, status });
    fetchRecords();
    setStudentName('');
    setStatus('Present');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">School Attendance</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          className="border p-2 mr-2"
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mr-2">
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
      </form>
      <ul>
        {records.map(record => (
          <li key={record._id} className="border-b p-2">
            {record.studentName} - {record.status} on {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
