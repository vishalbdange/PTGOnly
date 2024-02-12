import React, { useState, useEffect } from 'react'
import { Alert, Button, FormGroup, Input, Label, Col, Collapse, UncontrolledCollapse, Badge, CardTitle, Card, UncontrolledAlert } from 'reactstrap'
import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Section4 from './Sections/Section4'
import ScoreBoard from './Sections/ScoreBoard'
import NavbarComponent from '../NavbarComponent.js'
import { Paper } from '@material-ui/core'
// import Firebase from './firebase';
import aakar from "../aakar.jpg"

const Form = () => {


    const questionset1 = [
        {
            name: "Q1. Often fails to give close attention to details or makes careless mistakes in schoolwork, at work, or with other activities.",
            id: "Q1"
        },
        {
            name: "Q2. Often has trouble holding attention on tasks or play activities.",
            id: "Q2"
        },
        {
            name: "Q3. Often does not seem to listen when spoken to directly.",
            id: "Q3"
        },
        {
            name: "Q4. Often does not follow through on instructions and fails to finish schoolwork, chores, or duties in the workplace (e.g., loses focus, side-tracked).",
            id: "Q4"
        },
        {
            name: "Q5. Often has trouble organizing tasks and activities.",
            id: "Q5"
        },
        {
            name: "Q6. Often avoids, dislikes, or is reluctant to do tasks that require mental effort over a long period of time (such as schoolwork or homework).",
            id: "Q6"
        },
        {
            name: "Q7. Often loses things necessary for tasks and activities (e.g. school materials, pencils, books, tools, wallets, keys, paperwork, eyeglasses, mobile telephones)",
            id: "Q7"
        },
        {
            name: "Q8. Is often easily distracted",
            id: "Q8"
        },
        {
            name: "Q9. Is often forgetful in daily activities.",
            id: "Q9"
        }
    ]
    const questionset2 = [
        {
            name: "Q10. Often fidgets with or taps hands or feet, or squirms in seat.",
            id: "Q10"
        },
        {
            name: "Q11. Often leaves seat in situations when remaining seated is expected.",
            id: "Q11"
        },
        {
            name: "Q12. Often runs about or climbs in situations where it is not appropriate (adolescents or adults may be limited to feeling restless).",
            id: "Q12"
        },
        {
            name: "Q13. Often unable to play or take part in leisure activities quietly.",
            id: "Q13"
        },
        {
            name: "Q14. Is often 'on the go' acting as if 'driven by a motor'",
            id: "Q14"
        },
        {
            name: "Q15. Often talks excessively.",
            id: "Q15"
        },
        {
            name: "Q16. Often blurts out an answer before a question has been completed.",
            id: "Q16"
        },
        {
            name: "Q17. Often has trouble waiting his/her turn.",
            id: "Q17"
        },
        {
            name: "Q18. Often interrupts or intrudes on others (e.g., butts into conversations or games)",
            id: "Q18"
        }
    ]

    const allQs = [...questionset1, ...questionset2];
    var qsAns = [];
    const [ans, setAns] = useState([]);
    const [section, setSection] = useState(1);
    let score = 0;
    const [finalScore, setFinalScore] = useState(0);
    const [scoreBoard, setScoreBoard] = useState(false);
    const [inattention, setInattention] = useState(0);
    const [hyperactivity, setHyperactivity] = useState(0);
    const [ischildAdhd,setIschildAdhd] = useState(false);
    const [isadultAdhd,setIsadultAdhd] = useState(false);
    const [patientForm, setPatientForm] = useState({
        Name: '',
        Age: '',
        Sex: '',
        City: '',
        Mob_Number: ''
    })
    let childAdhd = 0;
    let adultAdhd = 0;

    const goBack = () => {
        window.scroll(0, 0);
        if (section > 1) {
            setSection(section - 1);
        }
        if (scoreBoard) {
            setSection(1);
            setScoreBoard(false)
        }
    }
    const goNext = () => {
        window.scroll(0, 0);
        if (section >= 4) {
            setSection(4);
        } else {
            setSection(section + 1)
        }

    }

    const calcScore = () => {
        gotoAutismScorer(0);
    }
    const gotoAutismScorer = (ans) => {

        console.log(ans)
        // setScore(score + Number(ans));
        // console.log("Your current Score")
        // console.log(score)
        // setScoreBoard(false);

    }
    const processInattention = (value) => {
        console.log(value)
        if (value == "0") {
            setInattention((inattention)=>inattention + 0)
        } else if (value == "1") {
            setInattention((inattention)=>inattention + 1)
        } else if (value == "2") {
            setInattention((inattention)=>inattention + 2);
        } else if (value == "3") {
            setInattention((inattention)=>inattention + 3)
        } else if (value == "4") {
            setInattention((inattention)=>inattention + 4)
        } else if (value == "5") {
            setInattention((inattention)=>inattention + 5)
        }

    }
    const processHyperactivity = (value) => {
        console.log(value)
        if (value == "0") {
            setHyperactivity((hyperactivity)=>hyperactivity + 0)
        } else if (value == "1") {
            setHyperactivity((hyperactivity)=>hyperactivity + 1)
        } else if (value == "2") {
            setHyperactivity((hyperactivity)=>hyperactivity + 2);
        } else if (value == "3") {
            setHyperactivity((hyperactivity)=>hyperactivity + 3)
        } else if (value == "4") {
            setHyperactivity((hyperactivity)=>hyperactivity + 4)
        } else if (value == "5") {
            setHyperactivity((hyperactivity)=>hyperactivity + 5)
        }
    }

        const renderSwitch = (param) => {
            switch (param) {
                case 1:
                    return <Section1 />;
                case 2:
                    return <Section2 />;
                case 3:
                    return <Section3 />;
                case 4:
                    return <Section4 />;
                default:
                    return <Section1 />;
            }
        }
        const getVal = () => {
            
            var val;
            for (let i = 1; i <= 18; i++) {
                val = document.getElementById(`Q${i}`).value;
                console.log(val)
                qsAns.push(val);
                
                if (i <= 9) {
                    processInattention(val);
                } else {
                    processHyperactivity(val);
                }
            }

            setAns(qsAns);
            console.log(qsAns)
            
        }
        const handleSubmit = () => {

            getVal();
            
            console.log("Total Score is : ", score);
            setFinalScore(score);
            score = 0;
            console.log(ans)
            console.log(qsAns)
            if(patientForm.Age < 18){
                for(let i=0;i<9;i++){
                    if(qsAns[i] !== "0"){
                        childAdhd += 1;
                    }
                }
                console.log("Child ADHD",childAdhd)
                
                if(childAdhd >= 6){
                    childAdhd = 0;
                    for(let i=9;i<18;i++){
                        if(qsAns[i] !== "0"){
                            childAdhd += 1;
                            console.log("Child ADHD",childAdhd)
                        }
                    }
                }
                if(childAdhd >= 6){
                    setIschildAdhd(true);
                }
            }else{
                for(let i=0;i<9;i++){
                    console.log(typeof(qsAns[i]))
                    console.log(qsAns[i])
                    if(qsAns[i] != "0"){
                        adultAdhd += 1;
                    }
                }
                console.log(adultAdhd)
                if(adultAdhd >= 5){
                    adultAdhd = 0;  
                    
                    for(let i=9;i<18;i++){
                        if(qsAns[i] !== "0"){
                           adultAdhd += 1;
                           console.log("adult ADHD",adultAdhd)
                        }
                    }

                    console.log(adultAdhd)
                }
                if(adultAdhd >= 5){
                    setIsadultAdhd(true);
                }   
                console.log("Adult ADHD",adultAdhd)
            }
            setScoreBoard(true);
        }

        const [password, setPassword] = useState("");
        const [submitPswd, setSubmitPswd] = useState(false);
        const [forgotPswd, setForgotPswd] = useState(false);
        const [sendOtp, setSendOtp] = useState(false);
        const [atHome, setAtHome] = useState(true)
        const handleChangePassword = (e) => {
            setPassword(e.target.value);
        }

        const handlesubmitPassword = () => {
            setSubmitPswd(true)
        }
        const handleforgotPassword = () => {
            setForgotPswd(true);
        }
        const handleChangeMobNumber = () => {

        }

        const [validationAlert, setValidationAlert] = useState(false);

        const handleChangeForm = (e) => {

            var name = e.target.name;
            var value = e.target.value;
            setPatientForm({ ...patientForm, [name]: value })
        }
        const gotoAssesment = (e) => {
            e.preventDefault();
            console.log(document.getElementById('Name'))
            console.log(document.getElementById('Age'))
            console.log(document.getElementById('Sex'))
            console.log(document.getElementById('City'))
            console.log(document.getElementById('Mob_Number'))
            if (document.getElementById('Name') === null || document.getElementById('Age') === null || document.getElementById('Sex') === null || document.getElementById('City ') === null || document.getElementById('Mob_Number') === null) {

                setValidationAlert(true);
                setAtHome(false)
            } else {
                setAtHome(false)
                setValidationAlert(false)
            }
        }
        return (
            <div >
                <NavbarComponent />

                {
                    scoreBoard ?
                        (
                            <>
                                <ScoreBoard finalScore={finalScore} patientForm={patientForm} allQs={allQs} ans={ans} inattention={inattention} hyperactivity={hyperactivity} ischildAdhd={ischildAdhd} isadultAdhd={isadultAdhd}/>
                                <Button onClick={() => { setScoreBoard(false) }} style={{ margin: "20px", float: "right" }}> Check Score Again ?</Button>
                            </>) :
                        (
                            <>
                                {
                                    atHome ? (<>
                                        <div style={{ textAlign: "center", fontSize: "22px" }}>
                                            <Paper color="info" >
                                                Neuro Developmental Pediatrician Dr Kondekar Treatment for Autism ADHD Learning disability Epilepsy
                                            </Paper>
                                        </div> <br />
                                        <div style={{ textAlign: "center", fontSize: "20px" }}>
                                            <Badge color="danger" >
                                               DSM 5 for ADHD
                                            </Badge>
                                        </div>
                                        <form onSubmit={gotoAssesment} style={{ padding: "20px 100px" }}>
                                            <FormGroup style={{ textAlign: "center" }}>

                                                <Label for="exampleName" sm-2>
                                                    Enter Name :
                                                </Label>
                                                <Col sm-10>
                                                    <input
                                                        id="Name"
                                                        name="Name"
                                                        type="text"
                                                        className="autInp"
                                                        onChange={handleChangeForm}
                                                        required
                                                        style={{ width: "300px", outline: "none", border: "none", boxShadow: "1px 1px 6px grey", borderRadius: "4px" }}

                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup style={{ textAlign: "center" }}>
                                                <Label for="exampleAge" sm-2>
                                                    Enter Age :
                                                </Label>
                                                <Col sm-10>
                                                    <input
                                                        id="Age"
                                                        name="Age"
                                                        type="number"
                                                        className="autInp"
                                                        onChange={handleChangeForm}
                                                        required
                                                        style={{ width: "300px", outline: "none", border: "none", boxShadow: "1px 1px 6px grey", borderRadius: "4px" }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup style={{ textAlign: "center" }}>
                                                <Label for="exampleSex" sm-2>
                                                    Enter Sex :
                                                </Label>
                                                <Col sm-10>
                                                    <input
                                                        id="Sex"
                                                        name="Sex"
                                                        type="text"
                                                        className="autInp"
                                                        onChange={handleChangeForm}
                                                        required
                                                        style={{ width: "300px", outline: "none", border: "none", boxShadow: "1px 1px 6px grey", borderRadius: "4px" }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup style={{ textAlign: "center" }}>
                                                <Label for="exampleSex" sm-2>
                                                    Enter City :
                                                </Label>
                                                <Col sm-10>
                                                    <input
                                                        id="City"
                                                        name="City"
                                                        type="text"
                                                        className="autInp"
                                                        onChange={handleChangeForm}
                                                        required
                                                        style={{ width: "300px", outline: "none", border: "none", boxShadow: "1px 1px 6px grey", borderRadius: "4px" }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup style={{ textAlign: "center" }}>
                                                <Label for="example" sm-2>
                                                    Enter Mobile Number :
                                                </Label>
                                                <Col sm-10>
                                                    <input

                                                        id="Mob_Number"
                                                        name="Mob_Number"
                                                        type="number"
                                                        className="autInp"
                                                        onChange={handleChangeForm}
                                                        required
                                                        style={{ width: "300px", outline: "none", border: "none", boxShadow: "1px 1px 6px grey", borderRadius: "4px" }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <div style={{ textAlign: "center" }}> <Button type="submit">Go To Assesment</Button> </div>

                                        </form>
                                    </>) :
                                        <>

                                            {
                                                (password != "www.pedneuro.in" || !submitPswd) ?
                                                    (
                                                        <>
                                                            {
                                                                !forgotPswd ?
                                                                    <div style={{ padding: "20px 100px", textAlign: "center" }}>
                                                                        <p>Password is : www.pedneuro.in</p>
                                                                        <FormGroup >
                                                                            <Label for="exampleName" >
                                                                                Enter Password :
                                                                            </Label>
                                                                            <Col style={{ textAlign: "center" }} >
                                                                                <Input
                                                                                    id="password"
                                                                                    name="password"
                                                                                    type="text"
                                                                                    className="inp"
                                                                                    onChange={handleChangePassword}

                                                                                />
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                            <Button onClick={handlesubmitPassword}>Submit</Button>
                                                                            <Button onClick={() => { setAtHome(true) }}>Back</Button>
                                                                        </div>
                                                                    </div>
                                                                    : (
                                                                        <>

                                                                        </>)
                                                            }

                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <div style={{ marginLeft: "30px" }}>
                                                            <br /> <br /> <br />
                                                            <Label for="grading"> <b>Grade Each point from 0 to 5</b></Label>
                                                            <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section1">Section 1 :  Inattention  </Button></div>
                                                            <UncontrolledCollapse toggler="#section1">
                                                                {questionset1.map((qs1) => {
                                                                    return (
                                                                        <>
                                                                            <FormGroup row p-0 >
                                                                                <Label for="exampleName" sm-2>
                                                                                    {qs1.name}
                                                                                </Label>
                                                                                <Col sm-10>
                                                                                    <Input
                                                                                        id={qs1.id}
                                                                                        name={qs1.id}
                                                                                        type="select"
                                                                                        className="inp"

                                                                                    >

                                                                                        <option>
                                                                                            0
                                                                                        </option>
                                                                                        <option>
                                                                                            1
                                                                                        </option>
                                                                                        <option>
                                                                                           2
                                                                                        </option>
                                                                                        <option>
                                                                                           3
                                                                                        </option>
                                                                                        <option>
                                                                                            4
                                                                                        </option>
                                                                                        <option>
                                                                                            5
                                                                                        </option>
                                                                                       
                                                                                    </Input>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </>
                                                                    )
                                                                })}

                                                            </UncontrolledCollapse>


                                                            <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section2">Section 2 : Hyperactivity </Button></div>
                                                            <UncontrolledCollapse toggler="#section2">
                                                                {questionset2.map((qs2) => {
                                                                    return (
                                                                        <>
                                                                            <FormGroup row p-0 >
                                                                                <Label for="exampleName" sm-2>
                                                                                    {qs2.name}
                                                                                </Label>
                                                                                <Col sm-10>
                                                                                    <Input
                                                                                        id={qs2.id}
                                                                                        name={qs2.id}
                                                                                        type="select"
                                                                                        className="inp"

                                                                                    >
                                                                                        <option>
                                                                                            0
                                                                                        </option>
                                                                                        <option>
                                                                                            1
                                                                                        </option>
                                                                                        <option>
                                                                                           2
                                                                                        </option>
                                                                                        <option>
                                                                                           3
                                                                                        </option>
                                                                                        <option>
                                                                                            4
                                                                                        </option>
                                                                                        <option>
                                                                                            5
                                                                                        </option>
                                                                                    </Input>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </>
                                                                    )
                                                                })}

                                                            </UncontrolledCollapse>

                                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                                                                <Button color="success" onClick={handleSubmit}>Show ADHD Score </Button>
                                                            </div>
                                                        </div>)}
                                        </>
                                }
                            </>
                        )

                }
            </div>
        )
    }

    export default Form
