import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DailyDetails() {
  const [workouts, setWorkouts] = useState([]);
  const[datetoDelete,setDateToDelete]=useState('');
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/dailydetails');
        setWorkouts(res.data);
      } catch (err) {
        console.log("Error fetching workouts", err);
      }
    };
    const handleDelete=async()=>{
        try{
            await axios.post('http://localhost:4000/deldailydetails',{date:datetoDelete});
            fetchWorkouts();
        }catch(err){
            console.log("Error deleting workout",err);
        }
    };
useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div style={{ padding: '20px' }} className='details-container'>
      <h2>Your Saved Workouts</h2>
      <div className='controls'>
        <button onClick={fetchWorkouts} className="click">Click</button>
         <input type="date" value={datetoDelete} onChange={e => setDateToDelete(e.target.value)} placeholder="Enter date to delete"/>
        <button onClick={handleDelete} className='delete'>Delete</button>
        </div>
        <ul className='workoutlist'>
        {workouts.map((item, index) => (
          <li key={index}>
            {item.date}: {item.workout} - {item.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyDetails;
