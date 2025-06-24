const express=require('express')
const cors=require('cors')
const bcrypt=require('bcrypt');
const bodyparser = require('body-parser');
const nodemailer=require('nodemailer')
const mysql=require('mysql')
const app=express()
app.use(bodyparser.json());
app.use(cors())
    const conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'fitness',
    })
    conn.connect(err => {
            if(err){
            console.log("failed to connect"+err);
        }
        console.log("Connected successfully");
    });

app.post('/register', (req, res) => {
  const { name, email, password, dob, gender, activity_level, join_date, address } = req.body;

  const sql = `INSERT INTO users (name, email, password, dob, gender, activity_level, join_date, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  conn.query(sql, [name, email, password, dob, gender, activity_level, join_date, address], (err) => {
    if (err) {
      console.log("failed to connect" + err);
      return res.send("Failed");
    } else {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vishravasreddy@gmail.com',
          pass: 'fyqo arnf eeka vyli',
        }
      });
      var mailOptions = {
        from: 'vishravasreddy@gmail.com',
        to: email,
        subject: 'Sare',
        text: `Dear ${name} Sare`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          return res.send("Registered, but email not sent");
        } else {
          console.log('Email sent: ' + info.response);
          console.log("Registered successfully Mail sent");
          return res.send("Registered succufully now you can login beta");
        }
      });
    }
  });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], (err, results) => {
        if (err) {
            console.log("Login error: " + err);
        }
        if (results.length > 0) {
            res.json({ message: "✅ Login successful" });
        } else {
            res.json({ message: "❌ Invalid credentials" });
        }
    });
});
app.post('/track',(req,res)=>{
    const{date,workout,duration}=req.body;
   const sql = "INSERT INTO Workout (date,workout,duration) VALUES (?, ?, ?)";
   conn.query(sql,[date,workout,duration],(err)=>{
    if(err){
            console.log("failed to connect"+err);
            res.send("Failed");
            return;
        }
        console.log("Inserted successfully");
        res.send("Insertted succufully  beta");
   })
});

app.get('/dailydetails', (req,res) => {
  const sql = "SELECT * FROM workout";
  conn.query(sql,(err, result) => {
    if (err) {
      console.log("Failed to fetch workouts", err);
    } else {
      res.send(result);
    }
  });
});

app.post('/deldailydetails',(req,res)=>{
    const sql ="Delete From workout where date=?";
    conn.query(sql,[req.body.date],(err,result)=>{
            if (err) {
      console.log("Failed to delete workouts", err);
    } else {
      res.send(result);
    }
    });
});

app.post('/calculate', (req, res) => {
  const { weight, height, age, goal } = req.body;

  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5); 
  const tdee = Math.round(bmr * 1.55); 

   let goalCalories = 0;
    let roundedCalories = 0;
    let dietPlan = [];

  if (goal === 'cut') {
    goalCalories = tdee - 500;
    roundedCalories = Math.round(goalCalories / 50) * 50;
    const csql='select * from diet_plans where calories=?';
    conn.query(csql,[roundedCalories],(err,result)=>{
      if (err) {
        console.error("Error fetching diet plan:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "No diet plan found for that calorie level" });
      }
      const dietPlan=result[0];


  const sql = `
    INSERT INTO diet(weight, height, age, goal, bmr, tdee, goal_calories)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  conn.query(
    sql,
    [weight, height, age, goal, bmr, tdee, goalCalories],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      res.json({
        bmr,
        tdee,
        goalCalories,
        dietPlan,
        message: 'Data saved successfully',
      });
    }
  );
});}
else if (goal === 'bulk') {
    goalCalories = tdee + 300;
    roundedCalories = Math.round(goalCalories / 50) * 50;
    const bsql='select * from bulk_diet where calories=?';
    conn.query(bsql,[roundedCalories],(err,result)=>{
      if (err) {
        console.error("Error fetching diet plan:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "No diet plan found for that calorie level" });
      }
      const dietPlan=result[0];


  const sql = `
    INSERT INTO diet(weight, height, age, goal, bmr, tdee, goal_calories)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  conn.query(
    sql,
    [weight, height, age, goal, bmr, tdee, goalCalories],
    (err, insertres) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      res.json({
        bmr,
        tdee,
        goalCalories,
        dietPlan,
        message: 'Data saved successfully',
      });
    }
  );
});}
else {
    return res.status(400).json({ message: "Invalid goal" });
  }
});

app.listen(4000,()=>{
    console.log("running on http://localhost:4000");
})