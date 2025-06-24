import React, { useState, useEffect } from 'react';
import axios from "axios";
function Track() {
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [log, setLog] = useState([]);
const[date,setDate]=useState('');
  
  useEffect(() => {
    const savedLog = localStorage.getItem('workoutLog');
    if (savedLog) {
      setLog(JSON.parse(savedLog));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('workoutLog', JSON.stringify(log));
  }, [log]);

  const handleAdd = async() => {
    if (workout.trim() && duration.trim() && date){
        try {
      await axios.post('http://localhost:4000/track', {
        date,
        workout,
        duration,
      });
      const newLog = [...log, { workout, duration,date}];
      setLog(newLog);
      setDate('');
      setWorkout('');
      setDuration('');
    }
    catch{
        console.log("Failed to save to database");
    }
  };
  }
  return (
    <div style={{ padding: '20px' }} className="tracker-container">
      <h2>Track Your Daily Workouts</h2>
    
      <div style={{ marginBottom: '10px' }} className='form-group'>
        <input type="date" placeholder='date' value={date} onChange={(e)=>setDate(e.target.value)}></input>
        <input type="text" placeholder="Workout name" value={workout} onChange={(e) => setWorkout(e.target.value)}/>
        <input type="text" placeholder="Duration " value={duration} onChange={(e) => setDuration(e.target.value)}/>
        <button onClick={handleAdd}>Add Workout</button>
      </div>

      <h3>Workout Log</h3>
      <ul className='list'>
        {log.map((item, index) => (
          <li key={index}>
            {item.date}:{item.workout} - {item.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Track;
