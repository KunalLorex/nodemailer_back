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
  res.setHeader("Access-Control-Allow-Origin", "*");
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
          user: 'Tutoring@mymegaminds.com',
          pass: 'bvufcvzzntacnxqd'
        }
    });
 
 
    var mailOptions = {
        from: '"My Megamind Pvt Ltd" Tutoring@mymegaminds.com',// sender address
        bcc: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        html: `
        <div class="card" style="text-align: center;
  background-color: grey;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom:20px;
  padding-top: 20px;
      height: 550px;
    width: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ">
      <div class="card-personal-picture">
        <img src="https://www.meestudy.com/img/logo.png" style="  height: 150px;
    width: 300px;">
      </div>
      <div class="card-name">
        <h1> Megamind </h1>
      </div>
      <div class="card-email">
        <h4> ${req.body.titlemail} </h4>
      </div>
      <div class="card-github">
        <a href=${req.body.hrefmail} style="font-weight: bold;"> ${req.body.maillink} </a>
      </div>
      <div class="card-education-description">
        <p style="text-align: left;"> 
          ${req.body.descriptiontitlemail}
        </p>
      </div>
      <div class="card-work-experience">
        <p style="text-align: left;">
          Reach US @ kaushlendra.k12@fms.edu <br /><br />
TEAM Megamind
         
        </p>
      </div>
    </div>
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
