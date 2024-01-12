require("dotenv").config();
const checkInternetConnected = require('check-internet-connected');
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const { senduserMail } = require('./utils/sendEmail');

const app = express(); 
const PORT = process.env.APP_PORT; 

app.use(bodyParser.json());
var corsOptions = {
  origin: process.env.FRONTDOMAIN,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

app.post('/sendemail', (req, res)=>{ 
  checkInternetConnected()
  .then((result) => {
    if(result){
      const {email,name,message,subject} = req.body; 
      senduserMail(email,name,message,subject).then(()=>{
        res.json({"message":"succesfully deliverd"}); 
      }).catch(err=>{
        if(err.code==="EENVELOPE"){
          res.status(404).json({"message":"Badly formated email, or email may not be associated with any mail provider"});
        }
        else{
          res.status(404).json(err);
        }
      });
    }
  })
  .catch((ex) => {
    res.status(404).json(ex); 
  }); 
}) 

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
