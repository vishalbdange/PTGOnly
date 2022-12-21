import React,{useState,useEffect} from 'react'
import { Alert,Button,FormGroup,Input,Label,Col,Collapse,UncontrolledCollapse,Badge, CardTitle,Card,UncontrolledAlert} from 'reactstrap'
import  ScoreBoard  from './ScoreBoard'
import AppContext from '../AppContext';
import { initializeApp,RecaptchaVerifier  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth"
 
// import Firebase from './firebase';
import aakar from "../../src/aakar.jpg"

const Form = () => {

    const questionset1 = [
       {
        name : "1.RELATING TO PEOPLE",
        options : ["1.NO ABNORMALITY","2.AVOIDS LOOKING /EXCESS SHY/CLINGY","3.UNAWARE OF ADULT/ ALOOFNESS/FORCEFUL ATTEMPTS NEEDEDc","4.HARDLY ANY RESPONSE EVEN TO MOST FORCEFUL ATTEMPT"],
        id:"Q1"
       },
       {
        name : "2.IMITATION",
        options :  ["1.APPROPRIATE","2.ONLY SIMPLE BEHAVIOURS LIKE CLAP, NEEDS PROMPT","3.EVEN SIMPLE ONE NEEDS GREAT EFFORTS","4.RARELY OR NEVER IMITATES ANY SOUND OR ACTION EVEN WITH GREAT EFFORTS"],
        id:"Q2"
       },
       {
        name : "3.RESPONSE",
        options :  ["1.AGE-APPROPRIATE SITUATION APPROPRIATE","2.OCCASIONAL INAPPROPRIATE","3.INAPPRPRIATE, INHIBITED OR EXCESSIVE, MAY GRIMACE , LAUGH OR BECOME RIGID EVEN WITHOUT REASON","4.RARELY APPROPRIATE THAT TOO ONLY WHEN MOOD, WILD EMOTIONS EVEN IF NO REASON"],
        id:"Q3"
       },
       {
        name : "4.BODY USE",
        options :  ["1.EASE AND COORDINATION LIKE A NORMAL KID","2.CLUMSY POOR COORDINATION, REPITITIVE MOVEMENTS","3.STARNGE/ UNUSAL BEHAVIOURS/ FINGER MOVEMENTS, STARING, PICKING AT BODY, SELF DIRECTED AGGRESSION, ROCKING SPINNING TOE WALKING, FINGER WRIGGLING","4.SEVERELY ABONORMAL AND REPITITIVE BODY MOVEMENTS DESPITE DIVERSIONS"],
        id:"Q4"
       },
       {
        name : "5.OBJECT USE5",
        options :  ["1.NORMAL INTEREST AND SUE OF TOYS, AGE APPROPRIATE","2.ATYPICAL INTEREST IN A TOY, OR BANGS/ MOUTHS IT	","3.INTEREST IN OTHER OBJECTS OR FASCINATED ABOUT ONLY ONE OBJECT/MOVEMENT /SHAPE","4.SEVERE THAN ABOVE WITH DIFFICULT TO DISTRACT"],
        id:"Q5"
       }
    ]
    const questionset2 = [
        {
         name : "6.ADAPTATION TO CHANGE",
         options : ["1.NOTICES/ COMMENTS ON CHANGES IN ROUTINE, ACCEPTS WITHOUT DISTRESS","2.CHILD CONTINUES WITH SAME TASK EVEN IF ADULT TRIES TO CHANGE ITY","3.ACTIVELY RESISTS CHANGE, DIFFICULT TO DTSRACT, GETS DISTARCTED/ANGRY  WITH CHANGED ROUTINE","4.SEVERE REACTION TO CHANGE WHEN FORCED- GETS ANGRY/VIOLET/TANTRUM"],
         id:"Q6"
        },
        {
         name : "7.VISUAL RESPONSEN",
         options :  ["1.NORMAL AGE APPROPRIATE, VISION USED WITH OTHER NORMAL SENSES TO EXPLORE A NEW OBJECTE","2.SOMETIMES NEEDS REMINDED TO LOOK AT OBJECT, STARES INTO SPACE, MAY AVOID EYE CONTACT","3.NEEDS FREQUENT REMINDER TO LOOK, AVOIDS EYE CONTACT, LOOKS AT OBJECTS IN UNUSUAL ANGLE, HOLDS OBJECTS CLOSE TO EYES","4.CONSISTENTLY AVOIDS , PEOPLE OR SOME OBJECTS, EXTREME STARINGS"],
         id:"Q7"
        },
        {
         name : "8.LISTENING SKILLS",
         options :  ["1.AGE APPROPRIAATE AND NORMAL ALONGWITH OTHER SENSES","2.SOME LACK OF RESPONSE OR MILD OVER REACTION, DELAYED ","3.IGNORES FEW TIMES OR COVERS EARS TO EVERY DAY SOUNDS","4.EXTREME OVER REACTS OR UDNER REACTS"],
         id:"Q8"
        },
        {
         name : "9.TASTE SMELL TOUCH RESPONSE AND USE",
         options :  ["1.USES AND EXPLOTRES NEW OBJECTS AGE APPROPRIATELY","2.MOUTHS, TASTES, SMELLES INEDIBLE, IGNORE OR OVERREACT MILD PAIN","3.MODERATELY ABNORMAL USE, PREOCCUPIED WITH TOUCH , SMELL, TASTE","4.PREOCCUPIED WITH ONLY ANY OF THESE ACTIVITIES, IGNORES PAIN OR REACTS STRONGLYS"],
         id:"Q9"
        },
        {
         name : "10.FEAR Or NERVOUSNESS",
         options :  ["1.NORMAL FOR AGE & SITUATION","2.OCCASIONALLY TOO MUCH OR TOO LITTLE FEAR","3.LITTLE MORE OR LITTLE LESS FEAR THAN A YOUNGER KID","4.DOESN’T SETTLE WITH REPEATED EXPERIENCES, FAILS TO SHOW APPROPRIATE REGARD FOR HAZARDS THAT OTHER KIDS AVOID"],
         id:"Q10"
        }
     ]
     const questionset3 = [
        {
         name : "11.VERBAL COMMUNICATION",
         options : ["1.NORMAL FOR AGE AND SITUATION, ACCEPTS WITHOUT DISTRESS","2.CHILD CONTINUES WITH SAME TASK EVEN IF ADULT TRIES TO CHANGE ITY","3.NO SPEECH OR EXCESSIVE QUESTIONING OR MIXED WITH JARGONING","4.MEANINGLESS SQUEALS, WEIRD SOUNDS, COMPLEX NOISES, BIZZARE"],
         id:"Q11"
        },
        {
         name : "12.NONVERBAL COMMUNICATION",
         options :  ["1.NORMAL FOR AGE & SITUATION","2.IMMATURE, VAGUE POINTING","3.UNABLE TO EXPRESS NONVERBALLY, CANT UNDERSTAND NONVERBAL","4.MEANINGLESS GESTURES, CANT UNDERSTAND OTHERS GESTURES"],
         id:"Q12"
        },
        {
         name : "13.ACTIVITY LEVEL",
         options :  ["1.AGE APPROPRIAATE AND NORMAL ALONGWITH OTHER SENSES","2.SOME LACK OF RESPONSE OR MILD OVER REACTION, DELAYED ","3.IGNORES FEW TIMES OR COVERS EARS TO EVERY DAY SOUNDS","4.EXTREME OVER REACTS OR UDNER REACTS"],
         id:"Q13"
        },
        {
         name : "14.LEVEL AND CONSISTENCY OF INTELLECTUAL RESPONSE",
         options :  ["1.IS INTELLIGENT,AS AGE APPROPRIATE","2.SKILS DELAYED, LOW IQ<70, ACROSS AL AREAS","3.AT LEAST ONE SKIL IN AVERAGE RANGE,IQ 100-115","4.SAVANT SKILLS, SPECIAL ABNORMAL INTELIGENCE"],
         id:"Q14"
        },
        {
         name : "15.GEENRAL IMPRRESSIONS",
         options :  ["1.NOT AUTISM","2.MILD","3.MANY SYMPTOMS","4.MANY MORE / EXTREME SYMPTOMS"],
         id:"Q15"
        }
     ]
     const allQs = [...questionset1,...questionset2,...questionset3];
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
        value = value[0]
        console.log(value)
        if(value == 1){
            console.log(score)
            score = score + 1;
            console.log(score)
        }else if(value == 2){
            score += 2;
        }else if(value == 3){
            score += 3;
        }else if(value == 4){
            score += 4;
        }
    }
    
    const getVal = () => { 
            var val;
            for(let i=1;i<=15;i++){
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
                <div style={{textAlign:"center",margin:"20px"}} >
                        <img src={aakar} alt="aakar" className="aakar-logo"/>
                </div>
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
                              <Card color="info" >
                                  <CardTitle style={{margin:"20px 10px !important"}}> 
                                    Neuro Developmental Pediatrician Dr Kondekar Treatment for Autism ADHD Learning disability Epilepsy
                              </CardTitle>
                                </Card>
                                </div> <br />
                                <div style={{textAlign:"center",fontSize:"20px"}}>
                                <Badge color="danger" >
                                    CARS Assesment
                                </Badge>
                                </div>
                            <form onSubmit={gotoAssesment} style={{padding:"20px 100px"}}>
                            <FormGroup>

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
                                                              style={{padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"10px"}}
                                                        
                                                           
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
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
                                                              style={{padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"10px"}}
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
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
                                                              style={{padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"10px"}}
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
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
                                                              style={{padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"10px"}}
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
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
                                                              style={{padding:"5px",outline:"none",border:"none",boxShadow:"1px 1px 6px grey",borderRadius:"10px"}}
                                                       />
                                                   </Col>
                            </FormGroup>
                            
                            <Button type="submit">Go To Assesment</Button> 
                            </form>
                            </>) :
                        <>

                       {
                          ( password  != "www.pedneuro.in" || !submitPswd) ?
                            (
                                <>
                                    {
                                       !forgotPswd ? 
                                            <div style={{padding:"20px 100px"}}>
                                                <p>Password is : www.pedneuro.in</p>
                                                   <FormGroup row p-0 >
                                                   <Label for="exampleSex" sm-2>
                                                        Enter Password :
                                                   </Label>
                                                   <Col sm-10>
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
                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section1">Section 1 </Button></div>
                        <UncontrolledCollapse  toggler="#section1">
                            {questionset1.map((qs1)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="example" sm-2>
                                             {qs1.name}
                                            </Label>
                                            <Col sm-10>
                                                <Input
                                                    id={qs1.id}
                                                    name={qs1.id}
                                                    type="select"
                                                    className="inp"
                                                    
                                                >
                                                    {
                                                        qs1.options.map(option =>{
                                                            return(
                                                                <><option>{option}</option></>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </>
                                )
                            })}
                       
                        </UncontrolledCollapse>
                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section2">Section 2  </Button></div>
                        <UncontrolledCollapse  toggler="#section2">
                            {questionset2.map((qs1)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="example" sm-2>
                                             {qs1.name}
                                            </Label>
                                            <Col sm-10>
                                                <Input
                                                    id={qs1.id}
                                                    name={qs1.id}
                                                    type="select"
                                                    className="inp"
                                                    
                                                >
                                                    {
                                                        qs1.options.map(option =>{
                                                            return(
                                                                <><option>{option}</option></>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                    </>
                                )
                            })}
                       
                        </UncontrolledCollapse>
                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section3">Section 3  </Button></div>
                        <UncontrolledCollapse  toggler="#section3">
                            {questionset3.map((qs1)=>{
                                return(
                                    <>
                                        <FormGroup row p-0 >
                                            <Label for="example" sm-2>
                                             {qs1.name}
                                            </Label>
                                            <Col sm-10>
                                                <Input
                                                    id={qs1.id}
                                                    name={qs1.id}
                                                    type="select"
                                                    className="inp"
                                                    
                                                >
                                                    {
                                                        qs1.options.map(option =>{
                                                            return(
                                                                <><option>{option}</option></>
                                                            )
                                                        })
                                                    }
                                                </Input>
                                            </Col>
                                            
                                        </FormGroup>
                                    </>
                                )
                            })}
                       
                        </UncontrolledCollapse>


                        {/* <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section2">Section 2 : COMMUNICATION </Button></div>
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

                        </UncontrolledCollapse> */}


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
