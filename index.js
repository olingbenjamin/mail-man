require('dotenv').config();
const express= require("express")
const app= express();
const sgMail= require('@sendgrid/mail');
const cors= require('cors');
const helmet= require('helmet')
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

app.use(express.json());
app.use(helmet())
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.post('/',(req,res)=>{
    const {subject,name,email,message}= req.body
const msg = {
  to: 'olingemmanuel5@gmail.com',
  from: 'olingbenjamin5@gmail.com', // Use the email address or domain you verified above
  subject: subject,
  text: 'and easy to do anywhere, even with Node.js',
  html: `<h1>${name}</h1><p>${email}</p><p>${message}</p>`,
};
//ES6

sgMail
  .send(msg)
  .then(() => {res.send('email successfully sent')}, error => {
    console.error(error);
    res.status(400).json({err:error})
    if (error.response) {
      console.error(error.response.body)
    }
  });
})

const port= process.env.PORT||4000

app.listen(port,()=>{
    console.log(`The server is running at port:${port}`)
})