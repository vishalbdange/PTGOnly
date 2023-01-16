import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './Preview.css'
import aakar from "./assets/aakar.jpg"
import autism2 from '../autism2.jpeg'
// import TestPDF from './assets/TestPDF'
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
import sign from "./assets/sign.png"
import drskinfo from "./assets/drskinfo.jpeg"
import NavbarComponent from '../NavbarComponent'
import { FormGroup, Form, Input, Label, Button, Col,Alert ,Table,List} from 'reactstrap'
import Draggable from 'react-draggable'; // The default
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import {Badge} from "@material-ui/core"
import CsvDownload from 'react-json-to-csv'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CsvDownloadButton from 'react-json-to-csv'
import {ArrowCircleDown,ArrowCircleUp} from '@mui/icons-material';
import {FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import axios from 'axios'



const prescription_Items = require('../prescription_Items').prescription_Items;



const Preview = (prop) => {

    console.log(prop)
    
   const pres = prop.prescription;
   console.log(pres)
    
   const [presEdited, setPresEdited] = useState({
        pid:pres.pid,
        dob: pres.dob,
        visit_no: pres.visit_no,
        name : pres.name,
        address: pres.address,
        age : pres.age,
        sex : pres.sex, 
        mobile_no : pres.pid,
        diagnosis :pres.diagnosis,
        goal_for_next_month : pres.goal_for_next_month,
        prescription: pres.prescription,
        payment_receipt : pres.payment_receipt,
        description : pres.description  
    });

    // console.log(prescription)
    // const state = JSON.parse(localStorage.getItem('state'));
    // const prescription = JSON.parse(localStorage.getItem('prescription'));
        // console.log(state)
    // var p_data = [];

    const exportPDF = () => {
        const input = document.getElementById("Page");
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,}).then(canvas =>{
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p','mm','a4');
            pdf.addImage(imgData,'JPEG',0,0,210,310);
            if(pres.name !== null){
                var pdfname = `${pres.name}.pdf`;
                pdf.save(pdfname);
            }
            else{
                pdf.save(`${pres.moblie_number}.pdf`);
            }
        })
    }


    const ref = createRef(null)
    const [image, takeScreenshot] = useScreenshot();
    var isSS = false;
    const getImage = () => {
        // ssBtnStyle.assign({},ssBtnStyle,vis);
        isSS = true;
        takeScreenshot(ref.current)
        console.log(isSS)
    }

    // const [textAreaStyle,setTextAreaStyle] = useState({width:"100%",border:"none",padding:"0%",margin:"0%"});
     useEffect (() => {
        var count = JSON.parse(localStorage.getItem('counter') || 0);
        setValues({val:pres.prescription})
        localStorage.setItem('counter', ++count)
        console.log(JSON.parse(localStorage.getItem('counter')))
    },[])
 
   
    useEffect(() => {
        // console.log(Prescription)
        // const csvDOB = DOB.toString();
        // const csvPrescription = prescription.toString();
    
        // const csvState = {
        //     csvDOB,Visit_No,Name, csvPrescription,Address,Age, Sex, Diagnosis,Goal,MobileNo,Receipt,Description
        // }
        // const prescription_d = JSON.parse(localStorage.getItem('prescription_data'));
        // prescription_d.push(csvState);
        // localStorage.setItem('prescription_data', JSON.stringify(prescription_d))
        // p_data = prescription_d;
        // if(window.innerWidth > 900){
              
        //     setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"200px"})
        // } 
        // else if(window.innerWidth  < 900 &&  window.innerWidth > 510){  
        //     setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"400px"});
        // } 
        
    })
    // function getAge(dob) {
          
    //     var dobYear = dob?.slice(0,4)-1900;  
    //     var dobMonth = dob?.slice(5,7);  
    //     var dobDate = dob?.slice(8,10);  
 
          
    //     //get the current date from the system  
    //     var now = new Date();  
    //     //extract the year, month, and date from current date  
    //     var currentYear = now.getYear();  
    //     var currentMonth = now.getMonth()+1;  
    //     var currentDate = now.getDate();  
          
        
    //     //declare a variable to collect the age in year, month, and days  
    //     var age = {};  
    //     var ageString = "";  
        
    //     //get years  
    //    var yearAge = currentYear - dobYear;  


    //     //get months  
    //     if (currentMonth >= dobMonth)  
    //       //get months when current month is greater  
    //       var monthAge = currentMonth - dobMonth;  
    //     else {  
    //       yearAge--;  
    //       var monthAge = 12 + currentMonth - dobMonth;  
    //     }  

      
    //     //get days  
    //     if (currentDate >= dobDate)  
    //       //get days when the current date is greater  
    //       var dateAge = currentDate - dobDate;  
    //     else {  
    //       monthAge--;  
    //       var dateAge = 31 + currentDate - dobDate;  
      
    //       if (monthAge < 0) {  
    //         monthAge = 11;  
    //         yearAge--;  
    //       }  
    //     }  
    //     //group the age in a single variable  
    //     age = {  
    //     years: yearAge,  
    //     months: monthAge,  
    //     days: dateAge  
    //     };  
            
            
    //     if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )  
    //        ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";  
    //     else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )  
    //        ageString = "Only " + age.days + " days old!";  
    //     //when current month and date is same as birth date and month  
    //     else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )  
    //         ageString = age.years +  " years old. Happy Birthday!!";  
    //     else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )  
    //         ageString = age.years + " years and " + age.months + " months old.";  
    //     else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )  
    //         ageString = age.months + " months and " + age.days + " days old.";  
    //     else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )  
    //         ageString = age.years + " years, and" + age.days + " days old.";  
    //     else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )  
    //         ageString = age.months + " months old.";  
    //     //when current date is same as dob(date of birth)  
    //     else ageString = "";
    //     return ageString ;
    // }
    
    const downloadImage = () => {
        saveAs(image, 'image.jpg') // Put your image url here.
      }
    //  var vis = {visibility:"hidden"}
    
    // function ChangeFormateDate(date){
    //     var p = date.split(/\D/g)
    //     return [p[2],p[1],p[0] ].join("/")
    //  }
     var x =  moment().format('LLLL');
     var displayDate = x;
      
    // var age_c  = getAge(DOB); 
    // if(age_c == ""){
    //         age_c = Age     ; 
    // }
    const [editDialogue,setEditDialogue] = useState(false);
    const handleEditPrescription = () =>{
        console.log("Inside edit prescription")
        setOpen(true);
        setEditDialogue(true);
    }
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = useState({ val: [] });

    function createInputs() {
        return values.val.map((el, i) =>
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => moveUp(i)}
                color="inherit"
                >
                    <ArrowCircleUp />
                </IconButton>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => moveDown(i)}
                color="inherit"
                >
                    <ArrowCircleDown />
                </IconButton>
                {/* <Input type='button' style={{ width: "60px", borderRadius: "10%", margin: "10px" }} value='Up' onClick={() => moveUp(i)} /> */}
                <Input type="text" value={el || ''} style={{ margin: "10px", width: "400px" }} onChange={e => { handleChangeList(e, i) }} />
                <Input type='button' style={{ width: "60px", borderRadius: "10%", margin: "10px" }} value='X' onClick={() => removeClick(i)} />
            </div>
        );
    }

    function handleChangeList(e, i) {
        let vals = [...values.val];
        vals[i] = e.target.value;
        setValues({ val: vals });
    }

    function moveUp(i){
        console.log(i)
        let vals = [...values.val]
        var temp = vals[i];
        console.log(vals[i])
        console.log(vals[i-1])
        if(i>0){
            vals[i]=vals[i-1];
            vals[i-1]=temp;
        }
        setValues({ val: vals });
    }
    function moveDown(i){
        console.log(i)
        let vals = [...values.val]
        let n = vals.length;
        var temp = vals[i];
        console.log(vals[i])
        console.log(vals[i+1])
        if(i<n-1){
            vals[i]=vals[i+1];
            vals[i+1]=temp;
        }
        setValues({ val: vals });
    }
    const addClick = (text) => {
        setValues({ val: [...values.val, text] })
    }
 

    const removeClick = (i) => {
        let vals = [...values.val];
        vals.splice(i, 1);
        console.log(vals)
        setValues({ val: vals });
    }
    const handleChangeEdit = (e) =>{

        const name = e.target.name;
        const value =  e.target.value;
        console.log(name + ' ' +  value)
        // if(name == 'pid' ||  name == 'mobile_number'){
        //     setPresEdited({ ...presEdited, 'pid': value })
        //     setPresEdited({ ...presEdited, 'mobile_number': value })
        // }
        setPresEdited({ ...presEdited, [name]: value })
    }
    const handleSubmitEdit = () =>{

        console.log(presEdited)
        axios.put(`https://aakar-clinic.onrender.com/all/prescriptions/${pres.pid}-${pres.name}`, presEdited)
        handleClose();
    }

    return (
        <>
        <NavbarComponent />
        
        <div className="prescription-view" >
        {/* <CsvDownloadButton data={pres}/> */}
        <div style={{textAlign:"center",marginTop:"10px"}}>
            <h4 style={{color:"blue"}}>(Edit here)
           <IconButton
                    size="large"
                    aria-label="Edit"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleEditPrescription}
                    color="primary"
                    label="Edit"
                    >
                    <EditIcon />
            </IconButton>
            </h4>
            <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Prescription</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.name}
                    margin="dense"
                    name="name"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.diagnosis}
                    margin="dense"
                    name="diagnosis"
                    id="diagnosis"
                    label="Diagnosis"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={( e)=> handleChangeEdit(e)}
                    defaultValue={pres.address}
                    margin="dense"
                    name="address"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.pid}
                    margin="dense"
                    name="pid"
                    id="pid"
                    label="Mobile Number"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    margin="dense"
                    defaultValue={pres.goal_for_next_month}
                    name="goal_for_next_month"
                    id="goal_for_next_month"
                    label="Goal_for_next_month"
                    type="text"
                    fullWidth
                    placeholder='Goal for next month'
                    variant="standard"
                />
                 <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.dob.slice(0,-14)}
                    margin="dense"
                    name="dob"
                    id="dob"
                    label="DOB"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.visit_no}
                    margin="dense"
                    name="visit_no"
                    id="visit_no"
                    label="Visit_No"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.age}
                    margin="dense"
                    name="age"
                    id="age"
                    label="Age"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    onChange={(e)=> handleChangeEdit(e)}
                    defaultValue={pres.sex}
                    margin="dense"
                    name="sex"
                    id="sex"
                    label="Sex"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {createInputs()}
                            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-around"}}>
                                <Input type='button' value='+ Add Prescription ' onClick={() => addClick('')} style={{ marginBottom: "10px",marginRight:"15px", width: "300px" }} />
                                <Badge badgeContent="New" color="primary">
                                <Select    
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select" 
                                    value='All'
                                    label='All'
                                    style={{padding:"2px",backgroundColor:"white"}}
                                    
                                >
                                    {prescription_Items.map((p_item,key) => {
                                        return(<>
                                        
                                            <MenuItem onClick={() => addClick({p_item}.p_item)} style={{ width: "500px" }} >{p_item}</MenuItem>
                                       
                                        </>
                                        )                                        
                                    })}
                                </Select>   
                                </Badge>               
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSubmitEdit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div> 
            <section id = "Page" className ="page"  ref={ref} >

            <section>
             
            <Draggable>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><img width="100px" src={aakar} className="aakar-logo" alt="Aakar Clinic" /> </div>
            </Draggable>
        
            {/* <CsvDownload 
    data={ p_data}
    filename="good_data.csv"
    style={{ //pass other props, like styles
      boxShadow:"inset 0px 1px 0px 0px #e184f3",
      background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
      backgroundColor:"#c123de",
      borderRadius:"6px",
      border:"1px solid #a511c0",
      display:"inline-block",
      cursor:"pointer","color":"#ffffff",
      fontSize:"15px",
      fontWeight:"bold",
      padding:"6px 24px",
      textDecoration:"none",
      textShadow:"0px 1px 0px #9b14b3"
      }}
  >
    Good Data ✨
  </CsvDownload> */}
  <br/> <br />
            <section class="doctor-info">
                <div class="doctor-name">
                <span>Dr Santosh <surname>Kondekar</surname></span>
                <p>Reg N:86230 ,MD DNB DCH FCPS FAIMER</p>
                </div>
                <div class="profession">
                <span>Neuro-Developmental <surname>Pediatrician</surname></span>
                <p>aakaarclinic@gmail.com <num>M:9869405747</num></p>
                </div>
            </section>
             {/* <img   src={doctorInfo} className="doctor-logo" alt="doctor Info" /> */}
            {/* <section class="doctor-info">
                
                <div class="doctor-name">
                    <span>Dr Santosh <surname>Kondekar</surname></span>
                    <p>Reg N:86230 ,MD DNB DCH FCPS FAIMER</p>
                </div>
                <div class="profession">
                    <span>Neuro-Developmental <surname>Pediatrician</surname></span>
                    <p>aakaarclinic@gmail.com <num>M:9869405747</num></p>
                </div>
            </section> */}
            {/* <h2 class="prescription-heading">Prescription</h2> */}
            {/* <Draggable style={{textAlign:"center",border:"2px solid black"}}> */}
       {
            // file !== null ? 
            // (
            //     <>
            //     <img src={file} style={{width:"140px",position:"absolute",top:"355px",right:"400px"}} alt="" /> 
            //     </>
            // ) : 
            // (
            //     <>
            //      <img src={imageURL} style={{width:"140px",position:"absolute",top:"355px",right:"400px"}} alt="" /> 
            //     </>
            // )
       }      
           {/* </Draggable> */}
            <section class="patient-profile">

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} >
                    <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",borderTop:"1px solid #F6BE00",fontSize:"12px"}}>
                        <b > &nbsp;&nbsp;Date</b> 
                    </Grid>
                  
                    <Grid item xs={9}  style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",borderTop:"1px solid #F6BE00",fontSize:"12px"}}>
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{displayDate} 
                    </Grid>
                   
                    {/* <Grid item xs={6} >
                        <b > &nbsp;&nbsp;Payment Receipt No. : &nbsp; </b> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2022
                    </Grid> */}
                    <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}}>
                        <b> &nbsp;&nbsp;Visit_No </b>   
                    </Grid>
                    <Grid item xs={9}  style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}}>
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.visit_no}  
                    </Grid>
                      
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;ID </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.pid}  
                    </Grid>
                      
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Age</b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.age}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Name </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.name}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;DOB </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.dob.slice(0,-14)}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Sex </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.sex}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Address </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.address}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Diagnosis </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{pres.diagnosis}  
                    </Grid>
                   
                    <Grid item xs={3} style={{borderBottom:"1px solid #F6BE00",borderLeft:"1px solid #F6BE00",borderRight:"1px solid grey",fontSize:"12px"}} >
                        <b > &nbsp;&nbsp;Goal for next month </b>   
                    </Grid>
                    <Grid item xs={9} style={{borderBottom:"1px solid #F6BE00",borderRight:"1px solid #F6BE00",fontSize:"12px"}} >
                    &nbsp;&nbsp; &nbsp;&nbsp;{pres.goal_for_next_month}  
                    </Grid>
                   
                </Grid>
            </Box>
        
            
            </section>
            {
                pres.prescription.length === 0 ? (
                    <></>
                )  : (
                    <section>          
                    <div>
                    <div style={{textAlign:"center",color:"brown",fontSize:"14px"}}><b>PRESCRIPTION</b></div>
                    <b ><p style={{fontSize:"11px"}}> (Join parent support group and read more about Goal Directed Cognitive Approach at <a href="http://www.neuropediatrician.com">www.neuropediatrician.com</a>)</p></b>
       
                       <ul> {pres.prescription?.map((p)=>{
                               return(
                                   <li>{p}</li>
                               )
                       })}</ul >
                   </div>
                       
                   <br />
                   </section>
                )
            }
<br />
              <section className="description">
                  <Draggable>    

  
               <p className="textArea" >
               {pres.description}
               </p>
               </Draggable>     
                <br /> 
                <Draggable style={{margin:"0px !important",padding:"0px !important",width:"100px !important"}}>
                <div style={{height:"100px",margin :"0px !important",paddingLeft:"50px",maxWidth:"100px !important"}}>
                <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={drskinfo} alt='drskinfo' />
                 
                </div>
                </Draggable>
                <Draggable style={{margin:"0px !important",padding:"0px !important",width:"80px !important"}}>
                <div style={{height:"100px",margin :"0px !important",paddingLeft:"50px",maxWidth:"100px !important"}}>
                <img  style={{height:"40px",margin:"0px !important",padding:"0px !important"}}  src={autism2} alt='drskinfo' />                 
                </div>
                </Draggable>
                <Draggable>
                    <div className="Desc">
                <p className="textArea" style={{color:"#338BA8"}}>
               Read <b>www.pedneuro.in</b> for Dr kondekar's Protocol of managing Autism. For basic health queries  visit  <b>www.aakaarclinic.com</b> or <b>www.kondekar.com</b>. F/u on whatsapp every 07 days to titrate doses and physical follow up one monthly or as needed
               </p>
                <b style={{color:"#338BA8",textAlign:"center",margin:"0px",padding:"0px"}}>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}> DR KONDEKAR SANTOSH V. MD DNB DCH FCPS R NO  86230 MMC  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>WWW.AAKAARCLINIC.COM  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>AAKAAR CLINIC OPP BYCULLA STATION WEST MUMBAI 400024 INDIA   </p>
                 </b>
                 </div>

                 </Draggable>
                 <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                        <Draggable>
                            <section>
                                <br/>
                                <p><strong>Payment Receipt : </strong> {pres.payment_receipt}</p>
                            </section>
                        </Draggable>
                    </Grid>
                                      
                    <Grid item xs={6}>
                        <Draggable>
                        <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                        </Draggable>
                    </Grid>
                 </Grid>
            </section>
            </section>
            </section>
            <section className="screenshot-capture" style={{padding:"4px"}}>
                <Button color="primary" onClick={getImage} style={{height:"35px",margin:"15px"}}>
                        Take screenshot
                </Button>
                <Button onClick={exportPDF}>Download PDF</Button> <br />
           
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",color:"white",fontSize:"44px"}}>
                <div > Image :  </div> 
                <hr />
                <div style={{textAlign:"center"}}>
                
                <img style={{width:"400px",position:"relative",border:"2px solid orange",borderRadius:"30px"}} src={image} alt={'Screenshot Will Come Here'} />
            
            </div>
           
            </div>
            </section>
            {/* <TestPDF state={state} /> */}

        </div>
        </>
    )
}

export default Preview