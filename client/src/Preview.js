import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './Preview.css'
import aakar from "./aakar.jpg"
import TestPDF from './TestPDF'
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
import sign from "./sign.png"
import drskinfo from "./drskinfo.jpeg"
import doctorInfo from "./doctorInfo.jpeg"
import { FormGroup, Form, Input, Label, Button, Col,Alert ,Badge,Table,List} from 'reactstrap'
import Draggable from 'react-draggable'; // The default
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import CsvDownload from 'react-json-to-csv'

const Preview = ({imageURL}) => {


    const state = JSON.parse(localStorage.getItem('state'));
    const prescription = JSON.parse(localStorage.getItem('prescription'));
        // console.log(state)
    // var p_data = [];
    const { DOB, file,Visit_No,Name, Address,Age, Sex, Diagnosis,Goal,m_num,Receipt,Description,ImageFile} = state;


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
        console.log(isSS)
    }

    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%",border:"none",padding:"0%",margin:"0%"});
     useEffect (() => {
        var count = JSON.parse(localStorage.getItem('counter') || 0);
      
        localStorage.setItem('counter', ++count)
        console.log(JSON.parse(localStorage.getItem('counter')))
    },[window.unload])
 
   
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
        if(window.innerWidth > 900){
              
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"200px"})
        } 
        else if(window.innerWidth  < 900 &&  window.innerWidth > 510){  
            setTextAreaStyle({width:"100%",border:"none",padding:"0%",margin:"0%",overflow:"hidden !important",maxHeight:"400px"});
        } 
        
    })
    function getAge(dob) {
          
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
            ageString = age.years + " years, and" + age.days + " days old.";  
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
            age_c = Age     ; 
    }


    return (
        <div className="prescription-view" >
            
            <section id = "Page" className ="page"  ref={ref} >
            <section>
            <Draggable>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><img src={aakar} className="aakar-logo" alt="Aakar Clinic" /> </div>
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
            file !== null ? 
            (
                <>
                <img src={file} style={{width:"140px",position:"absolute",top:"355px",right:"400px"}} alt="" /> 
                </>
            ) : 
            (
                <>
                 <img src={imageURL} style={{width:"140px",position:"absolute",top:"355px",right:"400px"}} alt="" /> 
                </>
            )
       }      
           {/* </Draggable> */}
            <section class="patient-profile">
               
            <Table >
            <tbody>
                <tr>
                <td scope="row" >
                    <b>Date</b>
                </td>
                <td >

               {/* {displayDate} &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;  Case_Serial_no  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{JSON.parse(localStorage.getItem('counter')-2)}  */}
               {displayDate } &nbsp;  <b>Payment Receipt No. : </b> W-{JSON.parse(localStorage.getItem('counter'))+2000}/2022
                </td>
                </tr>
                <tr >
                    <td scope="row">
                        <b>Visit_No</b> &nbsp;
                    </td>
                    <td >
                     {Visit_No}  
                    
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        <b>Moblie No :</b> &nbsp;
                    </td>
                    <td >
                     {m_num}  
                    
                    </td>
                </tr>
                
                <tr>
                <td scope="row">
                    <b style={{fontColor : "red"}}>Name</b> &nbsp;
                </td>
                <td >
                {Name}
                </td>
                </tr>
               
                <tr>
                <td scope="row">
                    <b>Age</b> &nbsp;
                </td>
                <td >
                  {age_c} 
                </td>

                </tr>
                <tr>
                <td scope="row">
                    <b>Sex</b> &nbsp;
                </td>
                <td >
                {Sex}
                </td>
                </tr>
                <tr>
                <td scope="row">
                    <b>Address</b> &nbsp;
                </td>
                <td >
                {Address}
                </td>
                </tr>
                <tr>
                <td scope="row" >
                    <b>Diagnosis</b> &nbsp;
                </td>
                <td style={{width:"100%"}}>
                {Diagnosis} 
                </td>
                </tr>
                <tr>
                <td scope="row" id="goal">
                    <b>Goal for Next Month</b>    &nbsp;
                </td>
                <td style={{width:"100%"}}>
               {Goal} 
                </td>
                </tr>
            </tbody>
            </Table>
           
            
            </section>
            {
                prescription.length === 0 ? (
                    <></>
                )  : (
                    <section>          
                    <div>
                       <p><b>PRESCRIPTION</b> : &nbsp; ( Join parent support group and read more about Goal Directed Cognitive Approach at <a href="http://www.neuropediatrician.com">www.neuropediatrician.com</a> )</p>
       
                       <ul> {prescription?.map((p)=>{
                               return(
                                   <li>{p}</li>
                               )
                       })}</ul >
                   </div>
                       
                   <br />
                   </section>
                )
            }
           <section>
               <p><strong>Payment Receipt : </strong> {Receipt}</p>
           </section>
<br />
            <section className="description">
                           

  
               <p className="textArea" >
               {Description}
               </p>
                 
                <br /> 
                <Draggable style={{margin:"0px !important",padding:"0px !important",width:"100px !important"}}>
                <div style={{height:"100px",margin :"0px !important",paddingLeft:"50px",maxWidth:"100px !important"}}>
                <img  style={{height:"85px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                <img  style={{height:"85px",margin:"0px !important",padding:"0px !important"}}  src={drskinfo} alt='drskinfo' />
                 
                </div>
                </Draggable>
                <p className="textArea" style={{color:"#338BA8"}}>
               Read <b>www.pedneuro.in</b> for Dr kondekar's Protocol of managing Autism. For basic health queries  visit  <b>www.aakaarclinic.com</b> or <b>www.kondekar.com</b>. F/u on whatsapp every 07 days to titrate doses and physical follow up one monthly or as needed
               </p>
                <b style={{color:"#338BA8",textAlign:"center",margin:"0px",padding:"0px"}}>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}> DR KONDEKAR SANTOSH V. MD DNB DCH FCPS R NO  86230 MMC  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>WWW.AAKAARCLINIC.COM  </p>
                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>AAKAAR CLINIC OPP BYCULLA STATION WEST MUMBAI 400024 INDIA   </p>
                 </b>

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
    )
}

export default Preview