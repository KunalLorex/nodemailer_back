const path = require('path');
const express = require('express');
 
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors')
app.use(cors())
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath)); 


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://yoursite.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json("Hello");
});
 
app.post('/users',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        host:'mail.google.com',
        service: 'gmail',
        auth: {
          user: 'testingtheera@gmail.com',
          pass: 'mqnlmtuanzqdrjpt'
        }
    });
 
 
    var mailOptions = {
        from: "testingtheera@gmail.com",// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.to}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        `
    };
    console.log(mailOptions);
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: false, respMesg: 'Email ERROR'})
          console.log(error);
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
const PORT = process.env.PORT || 5000
 
app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port");
})
