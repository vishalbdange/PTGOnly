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


const ScoreBoard = ({finalScore,patientForm,allQs,ans}) => {
    const [text,setText] = useState("No Autism");
    const [criteria,setCriteria] = useState("");
    const [disability,setDisability] = useState("");

    console.log(allQs)
    useEffect(() =>{
        if(finalScore <=70){
            setText("No Autism")
            setDisability("40%")
            setCriteria("Below 70");
        }
        else if(finalScore >= 71 && finalScore <=106){
            setText("Mild Autism")
            setCriteria("70-106");
        }
        else if( finalScore >=107 && finalScore <=153){
            setText("Moderate Autism")
            setCriteria("107-153");
        }  else if( finalScore >= 154 ){
            setText("Severe Autism")
            setCriteria("Above 153");
        }
        if(finalScore >= 71 && finalScore <=88){
            setDisability("50%") 
        }else if(finalScore >=89 && finalScore <=105){
            setDisability("60%")
        }
        else if(finalScore >=106 && finalScore <=123){
            setDisability("70%")
        }
        else if(finalScore >=124 && finalScore <=140){
            setDisability("80%")
        }
        else if(finalScore >=141 && finalScore <=158){
            setDisability("90%")
        }
        else if(finalScore >=159){
            setDisability("100%")
        }
    },[])

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
                <CardTitle tag="h5">
                    Result : {text} 
                </CardTitle>
                <CardTitle tag="h5">
                 ISAA Score : {disability}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Autism Score : {finalScore}
                   
                </CardSubtitle>
                <hr  style={{ width:"0%",outline:"0"} }/>
                <p>
                Happy to have a <b>no</b> label, have lots of hopes. Score can change 3 monthly and some issues which you may find to answer as sometimes or often....
                Till then work on what is lacking in the child, beyond the label. This score is based on old classification DSM IV, <b>do confirm what u scored is same with the dr scoring same for your kid.</b>
                </p>

<hr  style={{ width:"0%",outline:"0"} }/>
                <Table
                    style={{fontSize:"15px "}}
                    >
                    <thead>
                        <tr>
                        <th>
                            Autism Score 
                        </th>
                        <th>
                            Degree of Autism
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">
                            Below 70
                        </th>
                        <td>
                            No Autism
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            71-106
                        </th>
                        <td>
                             Mild Autism
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            107-153
                        </th>
                        <td>
                             Moderate Autism
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                           Above 153
                        </th>
                        <td>
                             Severe Autism
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Table
                    style={{fontSize:"15px "}}
                    >
                    <thead>
                        <tr>
                        <th>
                            Autism Score 
                        </th>
                        <th>
                            Disablility Precentage(%)
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">
                            Below 70
                        </th>
                        <td>
                            40
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            71-88
                        </th>
                        <td>
                            50
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            89-105
                        </th>
                        <td>
                            60
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                           106-123
                        </th>
                        <td>
                            70
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                           124-140
                        </th>
                        <td>
                            80
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            141-158
                        </th>
                        <td>
                            90
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            Above 158
                        </th>
                        <td>
                            100
                        </td>
                        </tr>
                    </tbody>
                    </Table>
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
