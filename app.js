const express=require("express");
const path=require("path");
const app=express();
var mongoose=require("mongoose");
const bodyparser = require("body-parser")
const port=8000;
//Define mongoose schema
var contactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact=mongoose.model('Contact',contactSchema);
//Express Specific Stuff;
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine','pug') //set the template engine as pug.Here we set view engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//Endpoints
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug', params);
})
app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});