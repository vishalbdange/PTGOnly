const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Prescription = require("./models/presciption");
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const PORT =   5000;
dotenv.config();
 
 var sample;
 async function run() {
    await mongoose.connect('mongodb+srv://aakarclinic:Aakar%40clinic1@cluster0.lozeiof.mongodb.net/?retryWrites=true&w=majority');
    sample =  await mongoose.model('Prescription').find(); // Works!
  }
run();
  
app.get('/',(req,res)=>{
    res.send("Home Server Page")
});
app.get('/all',(req,res)=>{
    console.log("All request received")
    console.log(JSON.stringify(sample))
    res.send(JSON.stringify(sample));
})

app.post('/prescription',(req,res)=>{
    
    console.log(req.body);
    const pres = req.body;
    const prescription = new Prescription({ 
    dob: pres.DOB,
    visit_no: pres.Visit_No,
    name : pres.Name,
    address: pres.Address,
    age : pres.Age,
    sex : pres.Sex, 
    mobile_no : pres.MobileNo,
    diagnosis :pres.Diagnosis,
    goal_for_next_month : pres.Goal,
    prescription: pres.Prescription,
    payment_receipt : pres.Receipt,
    description : pres.Description
});
prescription
    .save()
    .then(
        () => console.log("One Prescription added"), 
        (err) => console.log(err.message)
    );
    res.send("Post request sent");
})

// const prescription = new Prescription({
//     dob: Date.now(),
//     visit_no: "123",
//     address: "Degloor",
//     age : "9",
//     sex : "male",
//     mobile_no : "99083832",
//     diagnosis :"diagniss",
//     goal_for_next_month : "g123",
//     prescription: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming'],
//     payment_receipt : "1200/-",
//     description : "Goog good !!"
// });
// prescription
//     .save()
//     .then(
//         () => console.log("One Prescription added"), 
//         (err) => console.log(err.message)
//     );
 
app.listen(PORT, () => console.log("Server is running"));

 
