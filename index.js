const path = require('path');
const express = require('express');
 
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors')
const hbs=require('nodemailer-express-handlebars')
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
 
    const handlebarOptions = {
      viewEngine: {
          partialsDir: path.resolve('./view/'),
          defaultLayout: false,
      },
      viewPath: path.resolve('./view/'),
  };
  transporter.use('compile', hbs(handlebarOptions))
 

    var mailOptions = {
        from: '"My Megamind Pvt Ltd" Tutoring@mymegaminds.com',
        to:"",// sender address
        bcc: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        template:'index',
        context:{
          titlemail:req.body.titlemail, 
          hrefmail: req.body.hrefmail,
          maillink:req.body.maillink,
          emaillinkmsg:req.body.emaillinkmsg,
          descriptiontitlemail:req.body.descriptiontitlemail,
      }
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
