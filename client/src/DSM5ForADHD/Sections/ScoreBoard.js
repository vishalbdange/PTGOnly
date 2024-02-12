import React,{useState,useEffect,createRef} from 'react'
import { Card,CardBody,CardTitle,CardSubtitle,CardText,Button,Table} from 'reactstrap'
import {Paper} from "@material-ui/core"
import { useScreenshot } from 'use-react-screenshot'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment';
import aakar from "../../aakar.jpg"
import Draggable from 'react-draggable'; // The default


const ScoreBoard = ({finalScore,patientForm,allQs,ans,inattention,hyperactivity,ischildAdhd,isadultAdhd}) => {
    const [text,setText] = useState("No Autism");
    const [criteria,setCriteria] = useState("");
    const [disability,setDisability] = useState("");

    console.log(allQs)
    console.log(ans)
    const exportPDF = () => {
        const input = document.getElementById("Page");

        html2canvas(input,{logging:true,letterRendering:1,useCORS:true,}).then(canvas =>{
            const imgWidth = 0;
            const imgHeight = canvas.height * imgWidth / canvas.width;
          
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p','mm','a4');
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData,'JPEG',0,0,width,height);
            // if(state.name !== null){
            //     // var pdfname = `${state.Name}.pdf`;
            //     var pdfname = "certificate.pdf";
            //     pdf.save(pdfname);
            // }
            // else{
                // pdf.save(`${state.Visit_No}.pdf`);
                pdf.save("certificate.pdf");
            // }
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
    const [report,setReport] = useState(false);
  const handleShowReport = () => {
        setReport(!report);
  }
  var date = moment().format('LLLL');

    return (
        <div>
            <section  id="Page" className="page" ref={ref}>
            <Draggable>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><img src={aakar} className="aakar-logo" alt="Aakar Clinic" /> </div>
            </Draggable>
            <CardTitle>
                <b>Patient Info : </b>
            </CardTitle>
            <Table>
        <thead>
                <tr>
                <th>
                    Name
                    &nbsp;  &nbsp;  &nbsp;  &nbsp;
                    &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;
                    Age
                </th>
                <th>
                &nbsp;  &nbsp; &nbsp; Sex
                    &nbsp;  &nbsp;  &nbsp;  &nbsp;
                    &nbsp;  &nbsp;
                City
                </th>
                <th>
                Mob.Number
                </th>
                <th>
                    Date
                </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td scope="row">
                    {patientForm.Name}
                    &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;
                {patientForm.Age}
                </td>
                <td>
                &nbsp;  &nbsp; {patientForm.Sex}
                 &nbsp;  &nbsp;
                    &nbsp;  &nbsp;  &nbsp;  &nbsp;
                {patientForm.City}
                </td>
                <td>
                {patientForm.Mob_Number}
                </td>
                <td>
                {date}
                </td>
                </tr>
            </tbody>
            </Table>
            <Card
            ref={ref}
            >
                <CardBody>
                {/* <CardTitle tag="h5">
                    Result : {text} 
                </CardTitle> */}
                <div>
                   
                 {
                     (() => {
                        if (patientForm.Age < 18){
                            if(ischildAdhd){
                                return (<CardSubtitle
                                            className="mb-2 "
                                            tag="h7"
                                        ><b>Result : </b>  Child has ADHD </CardSubtitle>)
                            }else{
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Result : </b>Child does not have ADHD </CardSubtitle>)
                            }
                        }else{
                            if(isadultAdhd){
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Result : </b>Adult has ADHD </CardSubtitle>)
                            }else{
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Result : </b>Adult does not ADHD </CardSubtitle>)
                            }
                        }
                    })()
                
                 }
                </div>
                <div>

                    {
                        (()=>{
                            if(inattention > 0 && hyperactivity > 0 && inattention <= 12 && hyperactivity <= 12){
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Severity : </b>  Mild ADHD </CardSubtitle>)
                            }
                            else  if(inattention <= 24 && hyperactivity <= 24){
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Severity : </b>  Moderate ADHD </CardSubtitle>)
                            } 
                            else  if(inattention <= 48 && hyperactivity <= 48){
                                return (<CardSubtitle
                                    className="mb-2 "
                                    tag="h7"
                                ><b>Severity : </b>  Moderate ADHD </CardSubtitle>)
                            } else if(inattention > 0 && hyperactivity > 0){
                                    return (<CardSubtitle
                                        className="mb-2 "
                                        tag="h7"
                                    ><b>Severity : </b>  Severe ADHD </CardSubtitle>)
                            }
                        })()
                    }
                </div>
                {/* <CardTitle tag="h5">
                 ISAA Score : {disability}
                </CardTitle> */}
                <div>
                <CardSubtitle
                    className="mb-2 "
                    tag="h7"
                >
                    <b>Inattention Score : </b>{inattention}
                   
                </CardSubtitle>
                </div>
                <div>
                <CardSubtitle
                    className="mb-2 "
                    tag="h7"
                >
                    <b>Hyperactivity Score : </b>{hyperactivity}
                   
                </CardSubtitle>
                </div>
                 <div>
                <CardSubtitle
                    className="mb-2 "
                    tag="h7"
                >
                    <b>Total Score : </b>{inattention+hyperactivity}
                   
                </CardSubtitle>
                </div>
                <br/>
                <p>Minimum 1 point for at least 6 items in each section is needed to say child has ADHD, MINIMUM 1 point for 5 items for each section will mean adult has adhd.
                <br/><br/>
                    6-12 score in each section is mild adhd <br/>
                    12 -24 is moderate adhd<br/>
                    24 to 48 is high moderate adhd<br/>
                    Beyond 48 is severe adhd</p>
                
                <p>
                Happy to have a <b>no</b> label, have lots of hopes. Score can change 3 monthly and some issues which you may find to answer as sometimes or often....
                Till then work on what is lacking in the child, beyond the label. This score is based on old classification DSM IV, <b>do confirm what u scored is same with the dr scoring same for your kid.</b>
                </p>

<hr  style={{ width:"0%",outline:"0"} }/>
                    
                <CardText>
                    <b>Note : </b> 
                    <p>Repeat to the same test every 3 months.  <br />If any doubts or issues regarding the score or confirmation of he dignosis and its advice related to treatment , contact &nbsp; Dr.Kondekar <b>9869405747</b> .</p>
                </CardText>
                <br />
                <Button onClick={handleShowReport} size="sm" color="warning"> Show report</Button>
                
             {
                report ? 
                (
                    <>
                    <Paper class="report" style={{marginTop : "20px",padding:"10px 10px"}}>
                         
                            {
                                
                                allQs.map((q,index)=>{
                                    return(
                                        <>
                                            <CardTitle><strong>{q.name.slice(0,3)}</strong>{q.name.slice(3)}</CardTitle>
                                            <p><strong>Ans :</strong> {ans[parseInt(q.id.slice(1))-1]}</p>
                                            <hr />
                                        </>
                                    )
                                })
                            }
                         
                    </Paper>
                    </>
                )
                :
                (<></>)
             }

                </CardBody>

            </Card>
            </section>
            <section className="screenshot-capture">
                <Button color="primary" onClick={exportPDF} style= {{margin:"10px"}}>
                        Download Certificate PDF
                </Button> <br />
                <Button color="primary" onClick={getImage} style= {{margin:"10px"}}>
                        Download Certificate Image
                </Button> <br />
                <span><b>Certificate : </b> </span>
                <div>
                <br />
                <img style={{width:"1000px",position:"relative",border:"2px solid orange",borderRadius:"30px"}} src={image} alt={'Screenshot Will Come Here'} />
                </div>
            </section>
        </div>
    )
}

export default ScoreBoard
