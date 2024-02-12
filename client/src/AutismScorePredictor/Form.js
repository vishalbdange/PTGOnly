import React,{useState,useEffect} from 'react'
import { Alert,Button,FormGroup,Input,Label,Col,Collapse,UncontrolledCollapse,Badge, CardTitle,Card,UncontrolledAlert} from 'reactstrap'
import Section1  from './Sections/Section1'
import Section2  from './Sections/Section2'
import Section3  from './Sections/Section3'
import Section4  from './Sections/Section4'
import  ScoreBoard  from './Sections/ScoreBoard'
import NavbarComponent from '../NavbarComponent.js'
import {Paper} from '@material-ui/core'
// import Firebase from './firebase';
import aakar from "../aakar.jpg"

const Form = () => {
 

    const questionset1 = [
       {
        name : "Q1.  Inability to establish and/or maintain eye contact",
        id:"Q1"
       },
       {
        name : "Q2. Child does not respond when called,sometimes appears to be deaf",
        id:"Q2"
       },
       {
        name : "Q3. Difficulty in mixing and playing with other children of same age",
        id:"Q3"
       },
       {
        name : "Q4. Lack of appropriate emotional response",
        id:"Q4"
       },
       {
        name : "Q5. Can do certain tasks well,but not the tasks involving social undestanding",
        id:"Q5"
       }
    ]
    const questionset2 = [
        {
         name : "Q6.Difficulty in comprehension/communication",
         id:"Q6"
        },
        {
         name : "Q7.May/may not indicate needs by gestures or leading adults by the hand",
         id:"Q7"
        },
        {
         name : "Q8. Echolalia/using nonsensical words and muttering to self",
         id:"Q8"
        },
        {
         name : "Q9. Lack of Pretend play ",
         id:"Q9"
        },
        {
         name : "Q10.Likes sameness in everyday routine",
         id:"Q10"
        }
     ]
     const questionset3 = [
        {
         name : "Q11. Inappropriate attachment to objects",
         id:"Q11"
        },
        {
         name : "Q12. Unsual body movements such as flapping hands or rocking or jumping",
         id:"Q12"
        },
        {
         name : "Q13. Extreme restlessness,hyperactivity/overpassivity or prefers to be alone all the time ",
         id:"Q13"
        },
        {
         name : "Q14. Not responsive to normal teaching methods",
         id:"Q14"
        },
        {
         name : "Q15. Doesn’t like to be hugged or or touched/apparent insensitivity to pain",
         id:"Q15"
        }
     ]
     const questionset4 = [
        {
         name : " Q16. Intolerance/addiction to certain sounds,tastes,odours,visuals",
         id:"Q16"
        },
        {
         name : "Q17. No understanding or fear of real dangers /Excessive fear for heights,change in position",
         id:"Q17"
        },
        {
         name : "Q18. Enjoys spinning or rotating objects",
         id:"Q18"
        },
        {
         name : " Q19. Inappropriate laughing and giggling/crying spells with extreme distress for no apparent reason",
         id:"Q19"
        },
        {
         name : "Q20. Difficulty in fine motor skills/a tendency to fall/clumsiness/resistance to motor movement activities ",
         id:"Q20"
        }
     ]
     const allQs = [...questionset1,...questionset2,...questionset3,...questionset4];
    var qsAns = [];
    const [ans,setAns ] = useState();
    const [section,setSection] = useState(1);
     let score = 0;
     const [finalScore,setFinalScore] = useState(0);
    const [scoreBoard,setScoreBoard] = useState(false);
    const [patientForm,setPatientForm] = useState({
        Name: '',
        Age:'',
        Sex:'',
        City:'',
        Mob_Number:''
    })

    const goBack = () => {
        window.scroll(0,0);
        if(section > 1){
            setSection(section-1);
        }
        if(scoreBoard){
            setSection(1);
            setScoreBoard(false)
        }
    }
    const goNext = () => {
        window.scroll(0,0);
        if(section >= 4){
            setSection(4);
        }else{
            setSection(section + 1)
        }
   
    }

    const calcScore = ( ) => {
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
        if(value == "Never"){
            console.log("Never")
            console.log(score)
            score = score + 1;
            console.log(score)
        }else if(value == "Sometimes"){
            score += 2;
        }else if(value == "Often"){
            score += 3;
        }else if(value == "Always"){
            score += 4;
        }
    }
    
    const renderSwitch = (param) => {
        switch(param) {
            case  1 :
                return <Section1    />;
            case  2 :
                return <Section2    />;
            case  3 :
                return <Section3    />;
            case  4 :
                return <Section4     />;
            default:
                return <Section1    />;
        }
      }
    const getVal = () => { 
            var val;
            for(let i=1;i<=20;i++){
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
            console.log("Total Score is : ",score);
            setFinalScore(score);
            score = 0;
            setScoreBoard(true);
    }

      const [password,setPassword] = useState("");
      const [submitPswd,setSubmitPswd] = useState(false);
      const [forgotPswd,setForgotPswd] = useState(false);
      const [sendOtp,setSendOtp] = useState(false);
      const [atHome,setAtHome] = useState(true)
      const handleChangePassword = (e) => {
            setPassword(e.target.value);
      }

      const handlesubmitPassword = () =>{
            setSubmitPswd(true)
      }
      const handleforgotPassword = () => {
            setForgotPswd(true);
      }
      const handleChangeMobNumber = () => {

      }
    
    const [validationAlert,setValidationAlert] = useState(false);

    const handleChangeForm = (e) =>{ 

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
        if(document.getElementById('Name') === null || document.getElementById('Age') === null || document.getElementById('Sex') === null || document.getElementById('City ') === null || document.getElementById('Mob_Number') === null){

            setValidationAlert(true);
            setAtHome(false)
        }else{
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
                    <ScoreBoard finalScore={finalScore}  patientForm={patientForm} allQs={allQs} ans={ans} />
                    <Button onClick={() => {setScoreBoard(false)}} style={{margin:"20px",float:"right"}}> Check Score Again ?</Button> 
                    </> ) :
                    (   
                        <>
                        {
                            atHome  ? (<>
                            <div style={{textAlign:"center",fontSize:"22px"}}>
                              <Paper color="info" >
                                    Neuro Developmental Pediatrician Dr Kondekar Treatment for Autism ADHD Learning disability Epilepsy
                                </Paper>
                                </div> <br />
                                <div style={{textAlign:"center",fontSize:"20px"}}>
                                <Badge color="danger" >
                                    DSM 4 Autism score
                                </Badge>
                                </div>
                            <form onSubmit={gotoAssesment} style={{padding:"20px 100px"}}>
                            <FormGroup style={{textAlign:"center"}}>

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
                                                           style={{ width:"400px",padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"4px"}}                                                        
                                                           
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup style={{textAlign:"center"}}>
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
                                                           style={{ width:"400px",padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"4px"}}                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup style={{textAlign:"center"}}>
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
                                                           style={{ width:"400px",padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"4px"}}                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup style={{textAlign:"center"}}>
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
                                                           style={{ width:"400px",padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"4px"}}                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup style={{textAlign:"center"}}>
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
                                                           style={{ width:"400px",padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"4px"}}                                                       />
                                                   </Col>
                            </FormGroup>
                            <div style={{textAlign:"center"}}> <Button type="submit">Go To Assesment</Button> </div>
                           
                            </form>
                            </>) :
                        <>

                       {
                          ( password  != "www.pedneuro.in" || !submitPswd) ?
                            (
                                <>
                                    {
                                       !forgotPswd ? 
                                            <div style={{padding:"20px 100px",textAlign:"center"}}>
                                                <p>Password is : www.pedneuro.in</p>
                                                   <FormGroup >
                                                   <Label for="exampleSex" >
                                                        Enter Password :
                                                   </Label>
                                                   <Col  style={{textAlign:"center"}} >
                                                       <Input
                                                           id="password"
                                                           name="password"
                                                           type="text"
                                                           className="inp"
                                                           onChange={handleChangePassword}
                                                          
                                                       />
                                                   </Col>
                                               </FormGroup>
                                               <div style={{display:"flex",justifyContent:"space-between"}}>
                                               <Button onClick={handlesubmitPassword}>Submit</Button>
                                               <Button onClick={() => {setAtHome(true)}}>Back</Button>
                                               </div>
                                            </div>
                                            :  (
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
                            <>     
                       <br /> <br /> <br />  
                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section1">Section 1 :  SOCIAL INTERACTION  </Button></div>
                        <UncontrolledCollapse  toggler="#section1">
                            {questionset1.map((qs1)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="exampleSex" sm-2>
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
                                                    Never
                                                    </option>
                                                    <option>
                                                    Sometimes
                                                    </option>
                                                    <option>
                                                        Often
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


                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section2">Section 2 : COMMUNICATION </Button></div>
                        <UncontrolledCollapse  toggler="#section2">
                        {questionset2.map((qs2)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="exampleSex" sm-2>
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
                                                    Never
                                                    </option>
                                                    <option>
                                                    Sometimes
                                                    </option>
                                                    <option>
                                                        Often
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

                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info"  id="section3">Section 3 : BEHAVIOURAL CHARACTERISTICS </Button></div>
                        
                        <UncontrolledCollapse  toggler="#section3">

                        {questionset3.map((qs3)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="exampleSex" sm-2>
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
                                                    Never
                                                    </option>
                                                    <option>
                                                    Sometimes
                                                    </option>
                                                    <option>
                                                        Often
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


                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section4">Section 4:  SENSORY INTEGRATION </Button></div>
                        
                        <UncontrolledCollapse  toggler="#section4">

                        {questionset4.map((qs4)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="exampleSex" sm-2>
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
                                                    Never
                                                    </option>
                                                    <option>
                                                    Sometimes
                                                    </option>
                                                    <option>
                                                        Often
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

                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}} >
                            <Button color="success" onClick={handleSubmit}>Show Autism Score </Button>  
                        </div> 
                         </>) }
                        </>
                        }
                        </>
                    )
                
                }
        </div>
    )
}

export default Form
