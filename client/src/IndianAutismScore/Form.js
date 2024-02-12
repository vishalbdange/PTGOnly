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
            name: "Q1. Has poor eye contact",
            id: "Q1"
        },
        {
            name: "Q2. Lacks social smile",
            id: "Q2"
        },
        {
            name: "Q3. Remains aloof",
            id: "Q3"
        },
        {
            name: "Q4. Does not reach out to others",
            id: "Q4"
        },
        {
            name: "Q5. Unable to relate to people",
            id: "Q5"
        },
        {
            name: "Q6. Unable to respond to social or environmental cues",
            id: "Q6"
        },
        {
            name: "Q7. Engages in solitary or repetitive play activities",
            id: "Q7"
        },
        {
            name: "Q8. Unable to take turns in social interaction",
            id: "Q8"
        },
        {
            name: "Q9. Does not maintain peer relationship",
            id: "Q9"
        }
    ]
    const questionset2 = [
        {
            name: "Q10.Show inappropriate emotional response",
            id: "Q10"
        },
        {
            name: "Q11.Shows exaggerated emotions",
            id: "Q11"
        },
        {
            name: "Q12. Engages in self-stimulating emotions",
            id: "Q12"
        },
        {
            name: "Q13. Lacks fear of danger",
            id: "Q13"
        },
        {
            name: "Q14.Excited or agitated for no apparent reason",
            id: "Q14"
        }
    ]
    const questionset3 = [
        {
            name: "Q15. Acquired speech and lost it",
            id: "Q15"
        },
        {
            name: "Q16.Has difficulty in using nonverbal language or gestures to communicate",
            id: "Q16"
        },
        {
            name: "Q17. Engages in stereotyped and repetitive words",
            id: "Q17"
        },
        {
            name: "Q18. Engages in echolalia speech",
            id: "Q18"
        },
        {
            name: "Q19. Produces infantile squeals /unusual noises",
            id: "Q19"
        },
        {
            name: "Q20. Unable to initiate or sustain interaction with others",
            id: "Q20"
        },
        {
            name: "Q21. Uses jargon or meaningless words",
            id: "Q21"
        },
        {
            name: "Q22. Uses pronoun reversals",
            id: "Q22"
        },
        {
            name: "Q23. Unable to grasp pragmatics/real meaning of communication",
            id: "Q23"
        }

    ]
    const questionset4 = [
        {
            name: "Q24. Engages in stereotyped and repetitive motor mannerisms",
            id: "Q24"
        },
        {
            name: "Q25. Shows attachment to inanimate objects",
            id: "Q25"
        },
        {
            name: "Q26. Shows restlessness/hyperactivity",
            id: "Q26"
        },
        {
            name: "Q27. Exhibits aggression",
            id: "Q27"
        },
        {
            name: "Q28. Throws temper Tantrums",
            id: "Q28"
        }
        ,
        {
            name: "Q29. Engages in self-injurious behaviour",
            id: "Q29"
        }
        ,
        {
            name: "Q30. Insists on sameness",
            id: "Q30"
        }
    ]
    const questionset5 = [
        {
            name: "Q31. Unusually sensitive to sensory stimuli",
            id: "Q31"
        },
        {
            name: "Q32. Stares into space for long periods of time",
            id: "Q32"
        },
        {
            name: "Q33. Has difficulty in tracking objects",
            id: "Q33"
        },
        {
            name: "Q34. Has unusual vision",
            id: "Q34"
        },
        {
            name: "Q35. Is insensitive to pain",
            id: "Q35"
        }
        ,
        {
            name: "Q36. Responds to objects people unusually smiling touch /smell",
            id: "Q36"
        }
    ]
    const questionset6 = [
        {
            name: " Q37. Inconsistent attention/concentration",
            id: "Q37"
        },
        {
            name: "Q38. Shows delay in responding",
            id: "Q38"
        },
        {
            name: "Q39. Has unusual memory",
            id: "Q39"
        },
        {
            name: " Q40. Has savant ability: unusual super intellect",
            id: "Q40"
        }
    ]
    const allQs = [...questionset1, ...questionset2, ...questionset3, ...questionset4, ...questionset5, ...questionset6];
    var qsAns = [];
    const [ans, setAns] = useState();
    const [section, setSection] = useState(1);
    let score = 0;
    const [finalScore, setFinalScore] = useState(0);
    const [scoreBoard, setScoreBoard] = useState(false);
    const [patientForm, setPatientForm] = useState({
        Name: '',
        Age: '',
        Sex: '',
        City: '',
        Mob_Number: ''
    })

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
    const processScore = (value) => {
        console.log(value)
        if (value == "Rarely") {
            score = score + 1;
        } else if (value == "Sometimes") {
            score += 2;
        } else if (value == "Frequently") {
            score += 3;
        } else if (value == "Mostly") {
            score += 4;
        } else if (value == "Always") {
            score += 5;
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
        for (let i = 1; i <= 40; i++) {
            val = document.getElementById(`Q${i}`).value;
            console.log(val)
            qsAns.push(val);
            processScore(val);
        }

        console.log(qsAns)
        setAns(qsAns);
    }
    const handleSubmit = () => {

        getVal();
        console.log("Total Score is : ", score);
        setFinalScore(score);
        score = 0;
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
                            <ScoreBoard finalScore={finalScore} patientForm={patientForm} allQs={allQs} ans={ans} />
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
                                            ADHD ISAA2 Indian Autism score
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
                                                                        {/* {
                                                  sendOtp ? (
                                                  <>

                                                        <FormGroup>
                                                            <Label for="exampleSex" sm-2>
                                                            Enter OTP   : 
                                                        </Label>
                                                        <Col sm-10>
                                                            <Input
                                                                id="Otp_number"
                                                                name="Otp_number"
                                                                type="number"
                                                                className="inp"
                                                                onChange={(e) => setOtp(e.target.value) }
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <Button onClick={otpSubmit}>Verify OTP</Button>
                                                  </>
                                                  ):(
                                                      <>
                                               <FormGroup>
                                                <Label for="exampleSex" sm-2>
                                                    Enter Mobile Number : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                           id="Mob_number"
                                                           name="Mob_number"
                                                           type="number"
                                                           className="inp"
                                                           onChange={handleChangeMobNumber}
                                                       />
                                                   </Col>
                                               </FormGroup>
                                                <Button onClick={loginSubmit}> Send OTP</Button>
                                                </>
                                                )
                                              } */}
                                                                    </>)
                                                        }

                                                    </>
                                                )
                                                :
                                                (
                                                    <div style={{marginLeft:"30px"}}>
                                                        <br /> <br /> <br />
                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section1">Section 1 :  Social relation with reciprocity  </Button></div>
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
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>


                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section2">Section 2 : Emotional responsiveness </Button></div>
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
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>

                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section3">Section 3 : Speech Language Communication </Button></div>

                                                        <UncontrolledCollapse toggler="#section3">

                                                            {questionset3.map((qs3) => {
                                                                return (
                                                                    <>
                                                                        <FormGroup row p-0 >
                                                                            <Label for="exampleName" sm-2>
                                                                                {qs3.name}
                                                                            </Label>
                                                                            <Col sm-10>
                                                                                <Input
                                                                                    id={qs3.id}
                                                                                    name={qs3.id}
                                                                                    type="select"
                                                                                    className="inp"

                                                                                >
                                                                                <option>
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>


                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section4">Section 4:  Behavioural pattern </Button></div>

                                                        <UncontrolledCollapse toggler="#section4">

                                                            {questionset4.map((qs4) => {
                                                                return (
                                                                    <>
                                                                        <FormGroup row p-0 >
                                                                            <Label for="exampleName" sm-2>
                                                                                {qs4.name}
                                                                            </Label>
                                                                            <Col sm-10>
                                                                                <Input
                                                                                    id={qs4.id}
                                                                                    name={qs4.id}
                                                                                    type="select"
                                                                                    className="inp"

                                                                                >
                                                                                    <option>
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>

                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section4">Section 5:  Sensory aspects </Button></div>

                                                        <UncontrolledCollapse toggler="#section4">

                                                            {questionset5.map((qs5) => {
                                                                return (
                                                                    <>
                                                                        <FormGroup row p-0 >
                                                                            <Label for="exampleName" sm-2>
                                                                                {qs5.name}
                                                                            </Label>
                                                                            <Col sm-10>
                                                                                <Input
                                                                                    id={qs5.id}
                                                                                    name={qs5.id}
                                                                                    type="select"
                                                                                    className="inp"

                                                                                >
                                                                                    <option>
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>
                                                        <div style={{ textAlign: "center", margin: "15px" }}><Button color="info" id="section4">Section 6:  Cognitive Component </Button></div>

                                                        <UncontrolledCollapse toggler="#section4">

                                                            {questionset6.map((qs6) => {
                                                                return (
                                                                    <>
                                                                        <FormGroup row p-0 >
                                                                            <Label for="exampleName" sm-2>
                                                                                {qs6.name}
                                                                            </Label>
                                                                            <Col sm-10>
                                                                                <Input
                                                                                    id={qs6.id}
                                                                                    name={qs6.id}
                                                                                    type="select"
                                                                                    className="inp"

                                                                                >
                                                                                 <option>
                                                                                        Rarely
                                                                                    </option>
                                                                                    <option>
                                                                                        Sometimes
                                                                                    </option>
                                                                                    <option>
                                                                                        Frequently
                                                                                    </option>
                                                                                    <option>
                                                                                        Mostly
                                                                                    </option>
                                                                                    <option>
                                                                                        Always
                                                                                    </option>
                                                                                </Input>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </>
                                                                )
                                                            })}

                                                        </UncontrolledCollapse>

                                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                                                            <Button color="success" onClick={handleSubmit}>Show Autism Score </Button>
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
