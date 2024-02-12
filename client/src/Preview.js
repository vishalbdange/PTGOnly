import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './Preview.css'
import aakar from "./aakar.jpg"
import TestPDF from './TestPDF'
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
// import sign from "./sign_new.jpg"
import sign from "./sign_new.jpg"

import sign1 from "./sign1.png"
import drskinfo from "./drskinfo.jpeg"
import autism2 from "./autism2.jpeg"
import doctorInfo from "./doctorInfo.jpeg"
import { FormGroup, Form, Input, Label, Button, Col,Alert ,Table,List} from 'reactstrap'
import Draggable from 'react-draggable'; // The default
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavbarComponent from './NavbarComponent'
import {Link} from 'react-router-dom'
import ReactToPrint from "react-to-print";
import axios from 'axios'
import {IconButton} from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircle from '@mui/icons-material/AddCircle'
import ShareIcon from '@mui/icons-material/Share'


const Preview = ({imageURL}) => {
 
    var componentRef = useRef();
    var state = JSON.parse(localStorage.getItem('state'));
    const prescription = JSON.parse(localStorage.getItem('prescription'));
    const general_medicines_selected = []
    const epilepsy_medicines_selected  = []
    const cognitive_medicines_selected  = []
    const control_medicines_selected  = []
    const gross_motor_medicines_selected = []
    const fine_motor_medicines_selected = []
    const constipation_controller_selected  = []
    const other_prescriptions = []
    // console.log(state)
    // var p_data = [];
    var prescription_string = ''

    const checkboxes = {
        "check1" : "Jumping/Running/Climbing/Roaming",
        "check2" : "Hitting/Hurting/Biting/Throwing",
        "check3" : "Stimming/Object Obsession",
        "check4" : "Indigestion/Constipation",
        "check5" : "Pointing/Imitation/Non-Verbal Communication",
        "check6" : "Vocabulary/Speech/Comprehension/Composition",
        "check7" : "Sleep"
    }

    for (let p of prescription){
        prescription_string = ' '+ p + '';
    }
    const { DOB, file,Visit_No,Name, Address,Age, Sex, Diagnosis,Goal,m_num,Receipt,Description,Note,ImageFile,EmptyTextArea1,check1,check2,check3,check4,check5,check6,check7} = state;
    // const csvData = {...state,prescription:prescription}
     prescription.map((text) =>{
        if(text.includes("general_medicines") ){
            console.log("general_01")
            console.log(text.replace("_general_medicines",""))
            general_medicines_selected.push(text.replace("_general_medicines",""));
            console.log(general_medicines_selected)
        }else if(text.includes("epilepsy_medicines") ) {
            epilepsy_medicines_selected.push(text.replace("_epilepsy_medicines",""));
        }
        else if(text.includes("control_medicines") ) {
            control_medicines_selected.push(text.replace("_control_medicines",""));
        }
        else if(text.includes("gross_motor_medicines") ) {
            gross_motor_medicines_selected.push(text.replace("_gross_motor_medicines",""));
        }
        else if(text.includes("fine_motor_medicines") ) {
            fine_motor_medicines_selected.push(text.replace("_fine_motor_medicines",""));
        }
        else if(text.includes("cognitive_medicines") ) {
            cognitive_medicines_selected.push(text.replace("_cognitive_medicines",""));
        }
        else if(text.includes("constipation_controller") ) {
            constipation_controller_selected.push(text.replace("_constipation_controller",""));
        }else {
            other_prescriptions.push(text)
        }
     })
   
    const saveToMail = () => {
        const input = document.getElementById("Page");
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true, }).then(canvas => {
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            console.log(input)
            console.log(imgData)
            console.log(typeof(imgData))
            axios({
                method: 'post',
                // url: 'https://aakar-clinic.onrender.com/prescription',
                url: 'https://aakar-clinic.onrender.com/saveimg',
                data:  {'base64String':imgData,'name':state.Name}, // you are sending body instead
                headers: {
                'Content-Type': 'application/json'
                }, 
              })
              alert("Email Saved to Mail Succesfully")

              console.log("save Img post req sent !")    
        })
    }
    const exportPDF = () => {
        const input = document.getElementById("Page");
        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,}).then(canvas =>{
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            
            const pdf = new jsPDF('p','mm','a4');
            pdf.addImage(imgData,'JPEG',0,0,210,310);
            if(state.name !== null){
                var pdfname = `${state.Name}.pdf`;
                pdf.save(pdfname);
            }
            else{
                pdf.save(`${state.Visit_No}.pdf`);
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
        console.log(ref.current)
        console.log(isSS)
    }

    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%",border:"none",padding:"0%",margin:"0%"});
     useEffect (() => {
        var count = JSON.parse(localStorage.getItem('counter') || 0);
      
        localStorage.setItem('counter', ++count)
        console.log(JSON.parse(localStorage.getItem('counter')))
    },[window.unload])
    
    let  filteredCheckBoxes= [];
    const [finalchecks,setFinalchecks] = useState([]);
    useEffect(() => {
        // console.log(Prescription)
        // const csvDOB = DOB.toString();
        // const csvPrescription = prescription.toString();
    
        // const csvStfilteredCheckBoxesate = {
        //     csvDOB,Visit_No,Name, csvPrescription,Address,Age, Sex, Diagnosis,Goal,MobileNo,Receipt,Description
        // }
        // const prescription_d = JSON.parse(localStorage.getItem('prescription_data'));
        // prescription_d.push(csvState);
        // localStorage.setItem('prescription_data', JSON.stringify(prescription_d))
        // p_data = prescription_d;
        state.Prescription[0] = prescription_string;
        if(check1) { filteredCheckBoxes.push(checkboxes.check1)}
        if(check2) { filteredCheckBoxes.push(checkboxes.check2)}
        if(check3) { filteredCheckBoxes.push(checkboxes.check3)}
        if(check4) { filteredCheckBoxes.push(checkboxes.check4)}
        if(check5) { filteredCheckBoxes.push(checkboxes.check5)}
        if(check6) { filteredCheckBoxes.push(checkboxes.check6)}
        if(check7) { filteredCheckBoxes.push(checkboxes.check7)}
        setFinalchecks(filteredCheckBoxes);
        if(window.innerWidth > 900){
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"200px"})
        } 
        else if(window.innerWidth  < 900 &&  window.innerWidth > 510){  
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"400px"});
        }

    })
    function getAge(dob) {
          
        if(dob == ''){
            return Age;
        }   
        var dobYear = dob.slice(0,4)-1900;  
        var dobMonth = dob.slice(5,7);  
        var dobDate = dob.slice(8,10);  
 
          
        //get the current date from the system  
        var now = new Date();  
        //extract the year, month, and date from current date  
        var currentYear = now.getYear();  
        var currentMonth = now.getMonth()+1;  
        var currentDate = now.getDate();  
          
        
        //declare a variable to collect the age in year, month, and days  
        var age = {};  
        var ageString = "";  
        
        //get years  
       var yearAge = currentYear - dobYear;  


        //get months  
        if (currentMonth >= dobMonth)  
          //get months when current month is greater  
          var monthAge = currentMonth - dobMonth;  
        else {  
          yearAge--;  
          var monthAge = 12 + currentMonth - dobMonth;  
        }  

      
        //get days  
        if (currentDate >= dobDate)  
          //get days when the current date is greater  
          var dateAge = currentDate - dobDate;  
        else {  
          monthAge--;  
          var dateAge = 31 + currentDate - dobDate;  
      
          if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
          }  
        }  
        //group the age in a single variable  
        age = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
        };  
            
            
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )  
           ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old.";  
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )  
           ageString = "Only " + age.days + " days old!";  
        //when current month and date is same as birth date and month  
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )  
            ageString = age.years +  " years old. Happy Birthday!!";  
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )  
            ageString = age.years + " years and " + age.months + " months old.";  
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )  
            ageString = age.months + " months and " + age.days + " days old.";  
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )  
            ageString = age.years + " years, and " + age.days + " days old.";  
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )  
            ageString = age.months + " months old.";  
        //when current date is same as dob(date of birth)  
        else ageString = "";
        return ageString ;
    }
    
    const downloadImage = () => {
        saveAs(image, 'image.jpg') // Put your image url here.
      }
    //  var vis = {visibility:"hidden"}
    
    function ChangeFormateDate(date){
        var p = date.split(/\D/g)
        return [p[2],p[1],p[0] ].join("/")
    }
    
    var x =  moment().format('LLLL');
    var displayDate = x;
      
    var age_c  = getAge(DOB); 
    if(age_c == ""){
            age_c = Age; 
    }

    const reactToPrintTrigger = () => {
        return <Button color='danger'>Print</Button>;
      };
      const reactToPrintContent = () => {
         return componentRef;
      };

      const [showPreview,setShowPreview] = useState(false)
      const [personToMail,setPersonToMail] = useState('')
      const [showMailBox,setShowMailBox] = useState(false)
      const showEmailInput = () => {
          setShowMailBox(true);
      }
      const handleChangePersonToMail = (e) => {
            console.log(e.target.value)
            setPersonToMail(e.target.value)
      }
      const  dataURLtoFile = (dataurl, filename)  => {
        console.log(dataurl)
        var arr = dataurl?.split(',')
        console.log(arr)
        var mime = arr[0]?.match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr?.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr?.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

      const sendMailToPerson = () => {
        setShowMailBox(false);
        const input = document.getElementById("Page");
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true, }).then(canvas => {
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            console.log(input)
            console.log(imgData)
            console.log(typeof(imgData))
            axios({
                method: 'post',
                // url: 'https://aakar-clinic.onrender.com/prescription',
                url: 'https://aakar-clinic.onrender.com/saveimg',
                data:  {'base64String':imgData,'name':Name,'mobile_no':m_num,'personToMail':personToMail}, // you are sending body instead
                headers: {
                'Content-Type': 'application/json'
                }, 
              }) 
              alert("Email sent to " + personToMail + " Succesfully")
              console.log("save Img post req sent !")    
        })
      }
    // const [imgData,setImageData] = useState('')
    var imgData = '';
    const handleShare = async () => {
        const input = document.getElementById("Page");
      
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true, }).then(canvas => {
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            // setImageData(canvas.toDataURL('img/png'));
            imgData = canvas.toDataURL('img/png');
            console.log(imgData)
        })
        // alert(JSON.stringify(imgData))
       
        console.log(imgData)
        const file = dataURLtoFile(imgData,"prescription.png");
        // const file = dataURItoBlob(imgData);
        console.log(file)
        const data = {
            files: [
                file
            ],
            title: "Prescription",
            text: "Aakar Clinic"
        };

        try {
        if (!navigator.canShare(data)) {
           console.log("Can't share");
        }
        await navigator.share(data);
        // alert("Sharing..")
        } catch (err) {
            console.error(err);
        }
  };
    return (
        <>
        <NavbarComponent />
        <div className="prescription-view" >
        {/* <CsvDownloadButton  data={[state]}/> */}
        {/* <Link to="/prescription">TO Prescription</Link> */}
        
        
        <section className="screenshot-capture" style={{padding:"4px"}}>    
                <br />
                <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <ReactToPrint
                    content={reactToPrintContent}
                    trigger={reactToPrintTrigger}
                />
                <Button color="primary" onClick={getImage} style={{height:"35px",margin:"5px"}}>
                        Take SS
                </Button>
                <Button onClick={exportPDF} style={{height:"35px",margin:"5px"}} > PDF </Button>
                <Button onClick={saveToMail} style={{height:"35px",margin:"5px"}} color="warning">E-Mail Me</Button>
                <Button onClick={showEmailInput} style={{height:"35px",margin:"5px"}}>Mail To</Button> 
                {showMailBox ? (
                    <>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <Input type="text" name="personToMail" style={{width:200}}placeholder="Email To .." onChnage={handleChangePersonToMail}/>
                    <IconButton onClick={sendMailToPerson}><SendIcon/></IconButton>
                    </div>
                    </>

                ):(<></>)}
                <IconButton onClick={handleShare}><ShareIcon fontSize="large" color="primary" /></IconButton>

                <IconButton><Link to="/prescription" target="_blank"><AddCircle /></Link></IconButton>
                </div>
                 <br />

             
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",color:"white",fontSize:"18px"}}>
                
                <hr />
                <div style={{textAlign:"center"}}>
                
                <img style={{width:"100px",position:"relative",border:"1px solid orange",borderRadius:"10px"}} src={image} alt={'Screenshot Will Come Here'} />
            
            </div>
           
            </div>
            </section>
            <section  style={{padding:"12px"}} ref={el => (componentRef = el)}>
                    <section id = "Page"  className ="page"  ref={ref }   >

                    {
                        file == null ? (
                            <div style={{textAlign:"center"}}>
                                <Draggable>
                                    <img width="400px" src={aakar} alt="Aakar Clinic" />
                                </Draggable>
                            </div>
                        ): (
                            <>
                            <Grid container spacing={0}>
                            <Grid item xs={8}>
                                <Draggable>
                                    <img width="340px" src={aakar} alt="Aakar Clinic" />
                                </Draggable>
                            </Grid>
                            <Grid item xs={4}>
                                <Draggable>
                                {
                                        file !== null ? 
                                        (
                                            <>
                                            <img src={file} style={{width:"100px"}} alt="" /> 
                                            </>
                                        ) : 
                                        (
                                            <>
                                            <img src={imageURL} style={{width:"100px"}} alt="" /> 
                                            </>
                                        )
                                }  
                                </Draggable>
                            </Grid>
                            </Grid>
                            </>
                        ) 
                    }
                <br />

                
                <section class="doctor-info" >
                    <div class="doctor-name">
                    <span>Dr Santosh <surname>Kondekar</surname></span>
                    <p>Reg N:86230 ,MD DNB DCH FCPS FAIMER</p>
                    </div>
                    <div class="profession">
                    <span>Neuro-Developmental <surname>Pediatrician</surname></span>
                    <p>aakaarclinic@gmail.com <num>M:9869405747</num></p>
                    </div>
                </section>

                <section style={{ backgroundImage: `url(${sign1})`}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} >
                        <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",borderTop:"1px solid grey",fontSize:"12px"}}>
                            <b > &nbsp;&nbsp;Date</b> 
                        </Grid>
                      
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeftColor:"1px solid grey",borderTop:"1px solid grey",fontSize:"12px"}}>
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{displayDate} 
                        </Grid>
                       
                        {/* <Grid item xs={6} >
                            <b > &nbsp;&nbsp;Payment Receipt No. : &nbsp; </b> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2022
                        </Grid> */}
                        <Grid item xs={3}  style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}}>
                            <b> &nbsp;&nbsp;Visit_No </b>   
                        </Grid>
                        <Grid item xs={9}  style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}}>
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Visit_No}  
                        </Grid>
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;ID </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{m_num}  
                        </Grid>
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Age</b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{age_c}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Name </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Name}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;DOB </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{DOB}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Sex </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderRight:"1px solid grey",borderLeft:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Sex}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Address </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Address}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Diagnosis </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{Diagnosis}  
                        </Grid>
                       
                        <Grid item xs={3} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                            <b > &nbsp;&nbsp;Goal for next month </b>   
                        </Grid>
                        <Grid item xs={9} style={{borderBottom:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey",fontSize:"12px"}} >
                        &nbsp;&nbsp; &nbsp;&nbsp;{Goal}  
                        </Grid>
                        <Grid item xs={12} style={{fontSize:"12px"}} >
                        &nbsp;&nbsp; {EmptyTextArea1}  
                        </Grid>
                    </Grid>
                </Box>
            
               
                <hr/>
                </section>
                <section >
                    <div style={{fontSize:"10px"}}><b>Current Issues : </b>
                
                    </div>
                    <ol>
                        {finalchecks?.map((c)=>{
                            return(
                                <li style={{fontSize:"9px"}}>{c}</li>
                            )
                        })}
                   </ol>
                 </section>
                <section style={{ backgroundImage: `url(${sign1})`}}>
                {
                    prescription.length === 0 ? (
                        <></>
                    )  : (
                       <>
                            
                        <div ><b>Prescription : </b></div>
                        <b><p style={{fontSize:"10px"}}> (Join parent support group and read more about Goal Directed Cognitive Approach at <a href="http://www.neuropediatrician.com">www.neuropediatrician.com</a>)</p></b>
                            
                          {
                            general_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>General Medicines </p></b>) : <></>
                          }
                           <ul>
                           {general_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>

                           {
                            epilepsy_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Epilepsy Medicines </p></b>) : <></>
                          }
                           <ul>
                           {epilepsy_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           {
                            control_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Control Medicines </p></b>) : <></>
                          }
                           <ul>
                           {control_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           {
                            cognitive_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Cognitive Medicines </p></b>) : <></>
                          }
                           <ul>
                           {cognitive_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           {
                            fine_motor_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Fine Motor Medicines </p></b>) : <></>
                          }
                           <ul>
                           {fine_motor_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           {
                            gross_motor_medicines_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Gross Motor Medicines </p></b>) : <></>
                          }
                           <ul>
                           {gross_motor_medicines_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           {
                            constipation_controller_selected?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Constipation Controller </p></b>) : <></>
                          }
                           <ul>
                           {constipation_controller_selected?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>
                           
                           {
                             other_prescriptions?.length > 0 ? (<b><p style={{fontSize:"9px"}}>Other Medicines </p></b>) : <></>
                          }
                           <ul>
                           {other_prescriptions?.map((p)=>{
                                return <><li>{p}</li></>
                           })}
                           </ul>


                           {/* else if(p.includes("_epilepsy_medicines_selected")){
                                p=p.replace("_epilepsy_medicines","")
                                return <><b><p style={{fontSize:"9px"}}>Epilepsy Medicines </p></b><li>{p}</li></>
                              }else if(p.includes("_control_medicines")){
                                p=p.replace("_control_medicines","")
                                return <><b><p style={{fontSize:"9px"}}>Control Medicines </p></b><li>{p}</li></>
                              }else if(p.includes("_cognitive_medicines")){
                                p=p.replace("_cognitive_medicines","")
                                return <><b><p style={{fontSize:"9px"}}>Cognitive Medicines </p></b><li>{p}</li></>
                              }else if(p.includes("_fine_motor_medicines")){
                                p=p.replace("_fine_motor_medicines","")
                                return <><b><p style={{fontSize:"9px"}}>Fine Motor Medicines </p></b><li>{p}</li></>
                              }
                              else if(p.includes("_constipation_controller")){
                                p=p.replace("_constipation_controller","")
                                return <><b><p style={{fontSize:"9px"}}>Constipation Medicines </p></b><li>{p}</li></>
                              } */}
                       </>
                    )
                }
                </section>
                <section  style={{fontSize:"9px !important",backgroundImage: `url(${sign1})`}} >
                      {/* <Draggable>     */}
                    <b style={{fontSize:"9px"}}>Note</b>
                    <p  style={{fontSize:"10px"}}>
                       <b>{Note }</b> 
                   </p>
                   <p  style={{fontSize:"10px"}}>
                       <b>{Description}</b> 
                   </p>

                   {/* </Draggable>      */}
                    <br /> 
                    <p style={{fontFamily:"'Schoolbell', arial, serif"}}><b>Date : </b>{(JSON.stringify(new Date()).slice(1,11))}</p>
                    
                    <p style={{fontSize:"10px"}}><strong>Payment Receipt No. : </strong> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2023</p>
                                    {   
                                        (Receipt == '') ? (<div></div>) : 
                                        (<p><strong>Payment Receipt :  </strong> {Receipt}</p>) 
                                    }
                    {/* <Draggable style={{margin:"0px !important",padding:"0px !important",width:"100px !important"}}> */}
                    <div style={{height:"100px",marginTop :"10px",paddingLeft:"50px",maxWidth:"100px !important"}}>
                    <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                    <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={drskinfo} alt='drskinfo' />
                     
                    </div>
                    {/* </Draggable> */}
                    {/* <Draggable style={{margin:"0px !important",padding:"0px !important",width:"80px !important"}}>  */}
                    <img  style={{height:"40px",margin:"0px !important",padding:"0px !important"}}  src={autism2} alt='drskinfo' />                 
                    {/* </Draggable> */}
                    <br/>
                    {/* <Draggable> */}
                                    
                     {/* </Draggable> */}
                     <Grid container spacing={2}>
                      
                        <Grid item xs={6}>
                            {/* <Draggable> */}
                                {/* <section>
                                
                                    <p><strong>Payment Receipt No. : </strong> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2023</p>
                                    {   
                                        (Receipt == '') ? (<div></div>) : 
                                        (<p><strong>Payment Receipt :  </strong> {Receipt}</p>) 
                                    }
                                </section> */}
                            {/* </Draggable> */}
                          
                        </Grid>
                                          
                        {/* <Grid item xs={6}>
                            <Draggable>
                            <img  style={{height:"75px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                            </Draggable>
                        </Grid> */}
                     </Grid>
    
    
                </section>
                    </section>
            {/* <TestPDF state={state} /> */}
            </section >
        </div>
        </>
    )}
export default Preview