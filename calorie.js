import React, { useState } from 'react';
function CalorieCalculator() {
  const [form, setForm] = useState({
    weight: '',
    height: '',
    age: '',
    goal: '',
  });

  const [result, setResult] = useState(null);
  const[msg,setMsg]=useState('');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(event)=>{ 
      event.preventDefault();
      const data={weight:form.weight,height:form.height,age:form.age,goal:form.goal}
      const result=await fetch('http://localhost:4000/calculate',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
      });
      if (result.ok) {
    const json = await result.json();
    setResult(json); 
    setMsg('');
  } else {
    const error = await result.json();
    setMsg(error.message || "Something went wrong");
    setResult(null);
  }
  };

  return (
    <div className="calculator-container">
      <h2 className="title">Log Meals and Calories</h2>

      <input type="number" name="weight" placeholder="Weight (kg)"  value={form.weight} onChange={handleChange} className="input" />

      <input  type="number" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} className="input" />

      <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="input"/>
      <h3>Goal:</h3>
      <select name="goal" value={form.goal} onChange={handleChange} className="input">
        <option value="cut">Cut (Fat Loss)</option>
        <option value="bulk">Bulk (Muscle Gain)</option>
      </select>

      <button onClick={handleSubmit} className="button">
        Calculate
      </button>

      {result && (
        <div className="result-box">
          <p><strong>BMR:</strong> {result.bmr} kcal</p>
          <p><strong>TDEE:</strong> {result.tdee} kcal</p>
          <p><strong>Calories for Goal:</strong> {result.goalCalories} kcal</p>
          <p className="diet">Sample Diet Plan:</p>
          <ul className="dietl">
  {Array.isArray(result.dietPlan) ? (
    result.dietPlan.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))
  ) : (
    <>
      {result.dietPlan.breakfast && <li><strong>Breakfast:</strong> {result.dietPlan.breakfast}</li>}
      {result.dietPlan.lunch && <li><strong>Lunch:</strong> {result.dietPlan.lunch}</li>}
      {result.dietPlan.dinner && <li><strong>Dinner:</strong> {result.dietPlan.dinner}</li>}
    </>
  )}
</ul>

        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
