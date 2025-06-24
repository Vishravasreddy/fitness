import React from "react";
import gym from "./assets/gym.png"; 
import {Link} from "react-router-dom";
function Home() {
  return (
    <div>
      <div className="home" style={{
        backgroundImage: `url(${gym})`,
        backgroundSize: "100%",
        height:"100%",
        width:'100%',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        className:"gym-img",
      }}>
        <h1 className="homet">Welcome to Fitness tracker</h1>
        <p className="homed">
          You Can track workouts,monitor progress ,stay healthy and motivated.
        </p>
        <h2 className="homesub">Top Features</h2>
        <dt className="co">Features:</dt>
        <ul className="col-container">
          <li className="col"><Link to="/Track" className="link">Track your daily Workouts</Link></li>
          <li className="col"><Link to="/DailyDetails" className="link">DailyWorkoutDetails</Link></li>
          <li className="col"><Link to="/CalorieCaluclator" className="link">Log meals and calories</Link></li></ul>      
      </div>
    <div className="img-box">
  <div className="image-container">
    <img src="/ronaldomotiv.png" className="first-image" />
  </div>
  <div className="image-container">
    <img src="/mikemotiv.png" className="second-image" />
  </div>
  <div className="image-container">
    <img src="/thirdimage.png" className="third-image" />
  </div>
</div>

    </div>
  );
}

export default Home;
