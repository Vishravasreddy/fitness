import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    const [form, setForm] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState('');
    const navigate=useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: form.email,
                password: form.password,
            });
            if(response.data.message.includes("✅ Login successful")){
                localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userEmail", form.email);
           
            setMsg(response.data.message);
            setTimeout(()=>{
                navigate('/home')
            })}
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setMsg("❌ Invalid email or password");
            } else {
                setMsg("⚠️ Server error, try again later");
            }
        }
    };
    return(
        <div className="container">
            <div className="box">
                <h1>Login</h1>
            <form onSubmit={handleSubmit} className="form-animate">
                Email:<input type="email" name="email" placeholder="Email" onChange={handleChange}></input><div></div>
                Password:<input type="password" name="password" placeholder="Password" onChange={handleChange}></input><div></div>
                <input type="submit" name="submit"></input>
                {msg}
            </form>
            
 <p> Don’t have an account? <a href="/register">Register</a></p>
        </div>
        </div>
    );
}

export default Login;