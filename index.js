const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Prescription = require("./models/presciption");


var cors = require('cors');
var base64ToImage = require('base64-to-image');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
// parse application/json


const PORT =  5000;
dotenv.config();
 
 var sample;
 async function run() {
    console.log("Before connection")
    await mongoose.connect(`mongodb+srv://aakarclinic:${encodeURIComponent('aakar@1')}@cluster0.lozeiof.mongodb.net`)
    console.log("AFter connection")
    sample =  await Prescription.find(); // Works!
  }
run();
 
app.get('/',(req,res)=>{
    res.send("Home Server Page")
});
app.get('/all',async (req,res)=>{
    console.log("All request received")
    var sample = await Prescription.find();
    console.log(sample)
    res.status(200).json(sample)
    return sample;
})

app.put('/all/prescriptions/:id',async (req,res)=>{
    console.log(req.params)
    const {id} = req.params.id;
    console.log("All request received")
    console.log(req.body)

    const updatedPres = await Prescription.findOneAndReplace(id, req.body, { new: true });
    updatedPres.save();
    console.log(updatedPres)
    return res.send("updatedPres");

    // var sample = await Prescription.find();
    // console.log(sample)
    // res.status(200).json(sample)
    // return sample;
})

app.post('/saveimg',async (req,res) =>{
    console.log("Save Img Request")
    // console.log(req.body)
    const path = './screenshots/'
    const imgdata = req.body.base64String
    const name = req.body.name
    const mobile_no = req.body.mobile_no
    var optionalObj = {'fileName': 'prescription_ss', 'type':'png'};
    try{
        base64ToImage(imgdata,path,optionalObj);
    } catch(e){
        console.log(e.message)
    }
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vikingswc321@gmail.com',
            pass: 'mobwojttvtkvswkw',
        },
    });
    var mailOptions = {
        from: "aakarclinic@gmail.com",
        to: "drkondekar@gmail.com",
        subject: `Aakar Clinic - ${name}'s Prescription - ${mobile_no}`,
        attachments : [
            {   // file on disk as an attachment
                filename: name + ' ' + Date.now() + '.png',
                path: './screenshots/prescription_ss.png' // stream this file
            },
        ],
        text: "Sending you a prescription",
        headers: { 'x-myheader': 'test header' }
    };
    console.log("Nodemail headers added")
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error.message);
            logs = [
                {
                    field: "NodeMailer Error",
                    message: error,
                }
            ]

            res.status(400).json({ logs });
            return {logs}; 

        } else {
            console.log('Prescription Email sent: ' + info.response);
        }
    });
         
    //     transporter.sendMail(message, function(err, info) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(info);
    //       }
    //     })
           
    
    res.send("Mailing a Image Testing in progress !")
})

app.post('/mailtoperson',async (req,res) =>{
    console.log("Save Img Request")
    // console.log(req.body)
    const path = './screenshots/'
    const imgdata = req.body.base64String
    const name = req.body.name
    const mobile_no = req.body.mobile_no
    const personToMail = req.body.personToMail
    var optionalObj = {'fileName': 'prescription_ss', 'type':'png'};
    try{
        base64ToImage(imgdata,path,optionalObj);
    } catch(e){
        console.log(e.message)
    }
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vikingswc321@gmail.com',
            pass: 'mobwojttvtkvswkw',
        },
    });
    var mailOptions = {
        from: "aakarclinic@gmail.comm",
        to: personToMail,
        subject: `Aakar Clinic - ${name}'s Prescription - ${mobile_no}`,
        attachments : [
            {   // file on disk as an attachment
                filename: name + ' ' + Date.now() + '.png',
                path: './screenshots/prescription_ss.png' // stream this file
            },
        ],
        text: "Sending you a prescription",
        headers: { 'x-myheader': 'test header' }
    };
    console.log("Nodemail headers added")
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error.message);
            logs = [
                {
                    field: "NodeMailer Error",
                    message: error,
                }
            ]

            res.status(400).json({ logs });
            return {logs}; 

        } else {
            console.log('Prescription Email sent: ' + info.response);
        }
    });
         
    //     transporter.sendMail(message, function(err, info) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(info);
    //       }
    //     })
           
    
    res.send("Mailing a Image Testing in progress !")
})

app.post('/prescription',(req,res)=>{
    
    console.log("Request printing...")
    const pres = req.body;
    const prescription = new Prescription({ 
        pid:pres.m_num,
        dob: pres.DOB,
        visit_no: pres.Visit_No,
        name : pres.Name,
        address: pres.Address,
        age : pres.Age,
        sex : pres.Sex, 
        mobile_no : pres.m_num,
        diagnosis :pres.Diagnosis,
        goal_for_next_month : pres.Goal,
        prescription: pres.Prescription,
        payment_receipt : pres.Receipt,
        description : pres.Description
    });
    console.log(prescription)
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
 
app.listen(PORT, () => console.log("Server is running" + PORT));

 
