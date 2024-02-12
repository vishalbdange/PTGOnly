import React, { createRef, useState, useEffect, useRef } from 'react'
import './Preview.css'
import aakar from "./aakar.jpg"
import TestPDF from './TestPDF'
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
import sign from "./sign.png"
import drskinfo from "./drskinfo.jpeg"
import doctorInfo from "./doctorInfo.jpeg"
import { FormGroup, Form, Input, Label, Button, Col, Alert, Badge, Table, List } from 'reactstrap'
import Draggable from 'react-draggable'; // The default
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import ReactToPrint from "react-to-print";
import axios from 'axios'
import fs from 'fs'
import {IconButton} from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send';

const PreviewEmpty = ({ imageURL }) => {
    
     
    var componentRef = useRef();
    const state = JSON.parse(localStorage.getItem('state'));
    const prescription = JSON.parse(localStorage.getItem('prescription'));
    // console.log(state)
    function dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
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
              
              console.log("save Img post req sent !")    
        })
    }
    const exportPDF = () => {
        const input = document.getElementById("Page");
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true, }).then(canvas => {
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            console.log(input)
            console.log(imgData)
            console.log(typeof(imgData))
            const pdf = new jsPDF('p', 'mm', 'a4');
            // console.log(typeof(pdf))
            // console.log(pdf)
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 310);
            if (state.name !== null) {
                var pdfname = `${state.Name}.pdf`;
                pdf.save(pdfname);
            }
            else {
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

    // const saveImage = (img) => {
        
    //     var file = dataURLtoFile(img,'image.jpg');
    //     console.log(file);
        
      
    //         // fs.writeFile('./message.txt', 'Hello Node.js', (err) => {
    //         // if (err) throw err;
    //         // console.log('The file has been saved!');
    //         // });
    //         // // strip off the data: url prefix to get just the base64-encoded bytes
    //         // var data = img.replace(/^data:image\/\w+;base64,/, "");
    //         // console.log(data)
    //         // var buf = new Buffer(data, 'base64');
    //         // console.log(buf)
    //         // fs.writeFile('./image.png', buf);
    // }


    const [textAreaStyle, setTextAreaStyle] = useState({ width: "100%", border: "none", padding: "0%", margin: "0%" });
    useEffect(() => {
        var count = JSON.parse(localStorage.getItem('counter') || 0);

        localStorage.setItem('counter', ++count)
        console.log(JSON.parse(localStorage.getItem('counter')))
    }, [window.unload])


    useEffect(() => {
        // console.log(Prescription)

        if (window.innerWidth > 900) {

            setTextAreaStyle({ width: "100%", border: "none", padding: "0%", margin: "0%", overflow: "hidden !important", maxHeight: "200px" })
        }
        else if (window.innerWidth < 900 && window.innerWidth > 510) {
            setTextAreaStyle({ width: "100%", border: "none", padding: "0%", margin: "0%", overflow: "hidden !important", maxHeight: "400px" });
        }

    })
  
    const reactToPrintTrigger = () => {
        return <Button color="danger" style={{height:"35px",margin:"5px"}}>Print</Button>;
      };
      const reactToPrintContent = () => {
         return componentRef;
      };
      const [showMailBox,setShowMailBox] = useState(false)
      const [personToMail,setPersonToMail] = useState('')

      const showEmailInput = () => {
          setShowMailBox(true);
      }
      const handleChangePersonToMail = (e) => {
            console.log(e.target.value)
            setPersonToMail(e.target.value)
      }
     
    return (
        <div className="prescription-view" >
                <section className="screenshot-capture" style={{padding:"4px"}}>    
                <br />
                <ReactToPrint
                    
                    content={reactToPrintContent}
                    trigger={reactToPrintTrigger}
                />
                <Button color="primary" onClick={getImage} style={{height:"35px",margin:"5px"}}>
                        Take SS
                </Button>
                <Button onClick={exportPDF} style={{height:"35px",margin:"5px"}} > PDF </Button>
                <Button onClick={saveToMail} style={{height:"35px",margin:"5px"}} color="warning">E-Mail Me</Button>
                {/* <Button onClick={showEmailInput}>Mail To</Button>
                {showMailBox ? (
                    <>
                    <Input type="text" name="personToMail" onChange={handleChangePersonToMail}/>
                    <IconButton onClick={sendMailToPerson} ><SendIcon/></IconButton>
                    </>
                ):(<></>)} */}
                 <br />
             
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",color:"white",fontSize:"18px"}}>
                
                <hr />
                <div style={{textAlign:"center"}}>
                
                <img style={{width:"100px",position:"relative",border:"1px solid orange",borderRadius:"10px"}} src={image} alt={'Screenshot Will Come Here'} />
            
            </div>
           
            </div>
            </section>
            <section style={{padding:"12px"}} ref={el => (componentRef = el)}>
            <section id="Page" className="page" ref={ref} >
                <section>
                    <Draggable>
                        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}><img src={aakar} className="aakar-logo" alt="Aakar Clinic" /> </div>
                        
                    </Draggable>
                    <br /><br />
                    <br />
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
                    <br /><br />
                    <p><b>Certificate No. : </b>W-{JSON.parse(localStorage.getItem('counter'))+600}/2022</p>
                    <br />
                    <section>
                        { 
                           state.Certificate === '' ? (
                             <></>
                           ) : (
                            <>
                            <label><strong>CERTIFICATE</strong> &nbsp;</label>
                            <br /><br />
                            <p>{state.Certificate}</p>
                            </>
                           )
                        }
                        {
                           state.textArea1 === '' ? (
                             <></>
                           ) : (
                            <>
                            <br />
                                <p>{state.textArea1}</p>
                            </>
                           )
                        }
                        {
                           state.textArea2 === '' ? (
                             <></>
                           ) : (
                            <>
                            <br />
                            <p>{state.textArea2}</p>
                            </>
                           )
                        }
                           {
                           state.textArea3 === '' ? (
                             <></>
                           ) : (
                            <>
                            <br />
                            <p>{state.textArea3}</p>
                            </>
                           )
                        }

                    </section>
                    <br />
                    <section>

                        {
                            prescription.length === 0 ? (
                                <></>
                            ) : (
                                <section>
                                    <div>
                                        <p><b>PRESCRIPTION</b>  &nbsp; ( Join parent support group and read more about Goal Directed Cognitive Approach at <a href="http://www.neuropediatrician.com">www.neuropediatrician.com</a> )</p>
                                        <br />
                                        <ul> {prescription?.map((p) => {
                                            return (
                                                <li>{p}</li>
                                            )
                                        })}</ul >
                                    </div>

                                    <br />
                                </section>
                            )
                        }
                    </section>
                    <div> Date : {JSON.stringify(new Date(Date.now())).slice(1,11)} {JSON.stringify(new Date(Date.now())).slice(12,17)}</div>
                    <section>
                        <br /> 
                        <Draggable style={{margin:"0px !important",padding:"0px !important",width:"100px !important"}}>
                        <div style={{height:"100px",margin :"0px !important",paddingLeft:"50px",maxWidth:"100px !important"}}>
                        <img  style={{height:"85px",margin:"0px !important",padding:"0px !important"}}  src={sign} alt='sign' />
                        <img  style={{height:"85px",margin:"0px !important",padding:"0px !important"}}  src={drskinfo} alt='drskinfo' />
                        
                        </div>
                        </Draggable>
                        <hr  />
                        <p className="textArea" style={{color:"#338BA8"}}>
                            Read <b>www.pedneuro.in</b> for Dr kondekar's Protocol of managing Autism. For basic health queries  visit  <b>www.aakaarclinic.com</b> or <b>www.kondekar.com</b>. F/u on whatsapp every 07 days to titrate doses and physical follow up one monthly or as needed
                            </p>
                             <br />
                                <b style={{color:"#338BA8",textAlign:"center",margin:"0px",padding:"0px"}}>
                                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}> DR KONDEKAR SANTOSH V. MD DNB DCH FCPS R NO  86230 MMC  </p>
                                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>WWW.AAKAARCLINIC.COM  </p>
                                <p style={{margin:"0px",padding:"0px",fontSize:"12px"}}>AAKAAR CLINIC OPP BYCULLA STATION WEST MUMBAI 400024 INDIA   </p>
                                </b>
                    </section>
                </section>
            </section>
            </section>
            <section className="screenshot-capture" style={{ padding: "4px" }}>
                <Button color="primary" onClick={getImage} style={{ height: "35px", margin: "15px" }}>
                    Take screenshot
                </Button>
                <Button onClick={exportPDF}>Download PDF</Button> <br />
                <ReactToPrint
                    content={reactToPrintContent}
                    trigger={reactToPrintTrigger}
                />
                {/* <ReactToPrint
                    trigger={handlePrint}
                    content={() => ref}
                /> */}
                {/* <Button onClick={()=> window.print()}>Print this out!</Button> */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white", fontSize: "44px" }}>
                    <div > Image :  </div>
                    <hr />
                    <div style={{ textAlign: "center" }}>

                        <img style={{ width: "400px", position: "relative", border: "2px solid orange", borderRadius: "30px" }} src={image} alt={'Screenshot Will Come Here'} />

                    </div>

                </div>
            </section>
            {/* <TestPDF state={state} /> */}

        </div>
    )
}

export default PreviewEmpty