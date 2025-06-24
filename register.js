import React from "react";
import axios from 'axios';
import { useState } from "react";
function Register() {
  const [form,setForm]=useState(
    {
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      dob: '',
      gender: '',
      activity_level: '',
      join_date: '',
      address: ''
    }

  );
  const[msg,setMsg]=useState('');
  const Registerform=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  // const handleSubmit=async(e)=>{
  //   e.preventDefault();
  //   if(form.password!==form.confirmPassword){
  //     alert('password do not match');
  //   }
  //   else{
  //   try{
  //     const data ={name:form.name,email:form.email,password:form.password};
  //  const response=await fetch('http://localhost:4000/register',{
  //   method:'POST',
  //   headers:{'Content-Type':'applications.json'},
  //   body:JSON.stringify(data),
  //  });

  //   setMsg(await response.text()|| "✅ Registered Successfully");}
  //  catch(err){
  //   setMsg("error ra chusko");
  //  }
  // }}

  const handleSubmit=async(event)=>{
    event.preventDefault();
    if(form.password!==form.confirmPassword){
      alert('password do not match');
     }
    const data = {name:form.name,email:form.email,password:form.password,dob: form.dob,gender: form.gender,join_date:form.join_date,address: form.address}
    const res = await fetch('http://localhost:4000/register',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })

    const msg = await res.text();
    setMsg(msg);
  }



  return (
    <div className="container">
      <div className="box">
        <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        Full Name: <input type="text" name="name" placeholder="name" onChange={Registerform}/><div></div>
        Email: <input type="email" name="email" placeholder="email" onChange={Registerform}/><div></div>
        Password: <input type="password" name="password" placeholder="password" onChange={Registerform}/><div></div>
        Confirm Password: <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={Registerform}/><div></div>
        DOB: <input type="date" name="dob" onChange={Registerform} /><br/>
Gender:
  <select name="gender" onChange={Registerform}>
    <option value="">Select</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select><br/>

Activity Level:
  <select name="activity_level" onChange={Registerform}>
    <option value="">Select</option>
    <option value="low">Low</option>
    <option value="moderate">Moderate</option>
    <option value="high">High</option>
  </select><br/>

Join Date: <input type="date" name="join_date" onChange={Registerform} /><br/>
Address: <input type="text" name="address" onChange={Registerform} /><br/>

        {/* <button type="submit">Register</button> */}
        
      <input type="submit" ></input>
      </form>
      <p>
  Already have an account? <a href="/login">Login</a>
</p>

  </div>
    </div>
  );
}

export default Register;
