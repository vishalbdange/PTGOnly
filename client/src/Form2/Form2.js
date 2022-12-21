import React,{useState,useEffect} from 'react'
import { Alert,Button,FormGroup,Input,Label,Col,Collapse,UncontrolledCollapse,Badge, CardTitle,Card,UncontrolledAlert} from 'reactstrap'
import  ScoreBoard  from './ScoreBoard'
import AppContext from '../AppContext';
import { initializeApp,RecaptchaVerifier  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth"
 
// import Firebase from './firebase';
import aakar from "../aakar.jpg"
import { ElevatorSharp } from '@mui/icons-material';

const Form2 = () => {
 

    const questionset1 = [
       {
        name : "A1.1: Abnormal Social Approach, age inappropriateness",
        id:"Q1"
       },
       {
        name : "A1.2: Abnormal Back and forth conversation.age inappropriateness",
        id:"Q2"
       },
       {
        name : "A1.3: Reduced sharing of interest, emotions, affect, feelings.age inappropriateness",
        id:"Q3"
       },
       {
        name : "A1.4: Failure to initiate or respond to social intercations.age inappropriateness",
        id:"Q4"
       },
       {
        name : "A2.1: Poor eye contact, poor nonverbal or verbal communication.age inappropriateness",
        id:"Q5"
       },
        {
         name : "A2.2: Poor body language.age inappropriateness",
         id:"Q6"
        },
        {
         name : "A2.3: Deficit in use of gestures.age inappropriateness",
         id:"Q7"
        },
        {
         name : "A2.4: Total lack of facial expressions, or lacks nonverbal communication.age inappropriateness",
         id:"Q8"
        },
        {
         name : "A3.1: Deficit in developing maintaining and understanding relationshipsage inappropriateness",
         id:"Q9"
        },
        {
         name : "A 3.2: Difficulty in adjusting behaviours to various social contexts.age inappropriateness",
         id:"Q10"
        },
        {
            name : "A3.3: Difficulty in sharing imaginative play or making friends.age inappropriatenes",
            id:"Q11"
        },
        {
            name : "A3.4: Absence of interest in peers or friends.age inappropriateness",
            id:"Q12"
        },

     ]
     const questionset2 = [
        {
         name : "B1.1: Repetitive movements /stereotypes with objects .age inappropriateness",
         id:"Q13"
        },
        {
         name : "B1.2:Repetitive movements /stereotypes Movements.age inappropriateness",
         id:"Q14"
        },
        {
         name : "B1.3:Repetitive movements /stereotypes lining up toys, shoes etc.age inappropriateness",
         id:"Q15"
        },
        {
         name : " B 1.4: Repetitive movements /stereotypes with flipping objects / movements .age inappropriateness",
         id:"Q16"
        },
        {
         name : "B1.5: Repetitive words: echolalia / copying .age inappropriateness",
         id:"Q17"
        },
        {
         name : "B1.6: Repetitive phrases with or without meaning.age inappropriateness",
         id:"Q18"
        },
        {
         name : "B2.1: Sameness / Rigidness: Extreme distress at small change.Describe age inappropriateness",
         id:"Q19"
        },
        {
         name : "B2.2:Sameness / Rigidness: difficulty in change or transition from routine.age inappropriatenes",
         id:"Q20"
        },
        {
            name : "B2.3: Sameness / Rigidness: Rigid thinking patterns.age inappropriateness",
            id:"Q21"
        },
        {
            name : "B2.4: Sameness / Rigidness: Greeting rituals.age inappropriatenes",
            id:"Q22"
        },
        {
            name : "B2.5:Sameness / Rigidness: Need to take same route.age inappropriateness",
            id:"Q23"
        },
        {
            name : "B2.6: Sameness / Rigidness: Same food pattern every day.age inappropriateness ",
            id:"Q24"
        },
        {
            name : "B3.1: Restricted fixed interest or focus: strong attachment / unusually busy with unusual objects",
            id:"Q25"
        },
        {
            name : "B3.2: Restricted fixed interest or focus: excessive circumscribed interest-not to confuse with passion: highly preferred interest that makes child non sharing, inflexible. its interest without its usefulness or progress.",
            id:"Q26"
        },
        {
            name : "B 4.1:Hypo or hyper response to sensory input : indifference to pain / temperature",
            id:"Q27"
        },
        {
            name : "B 4.2:Hypo or hyper response to sensory input : sound / texture",
            id:"Q28"
        },
        {
            name : "B4.3: Hypo or hyper response to sensory input : excessive smelling / touching",
            id:"Q29"
        },
        {
            name : "B4.4: Hypo or hyper response to sensory input : Visual Fascination with lght or movement ",
            id:"Q30"
        },
        {
            name : "C: Was all this present before age six years. yes/ no, did it manifest only after stress like studies?",
            id:"Q31"
        },
        {
            name : "D: definitely affecting day to day life or schooling?",
            id:"Q32"
        },
        {
            name : "Developmental delay Yes/ No, Mental subnormality Yes/ no; Developmental age inappropriate",
            id:"Q33"
        },
]

    let a1=0,a2=0,a3=0,b1=0,b2=0,b3=0,b4=0;
    const allQs = [...questionset1,...questionset2];
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
        if(value == "Never"){
            console.log("Never")
            score = score + 0;
        }else if(value == "Sometimes"){
            score += 4;
        }else if(value == "Often"){
            score += 8;
        }else if(value == "Always"){
            score += 12;
        }
    }

    const processAndCalc = (idx1,idx2,it) => {
        let sum = 0;
        for(let i = idx1;i<=idx2;i++){
            let value = document.getElementById(`Q${i}`).value;
            if(value == "Sometimes"){
                sum += 4;
            }else if(value == "Often"){
                sum += 8;
            }else if(value == "Always"){
                sum += 12;
            }
        } 
        if(it == "a1"){
            a1 += sum;
        }else if(it == "a2") {
            a2 += sum;
        }else if(it == "a3"){
            a3 += sum;
        }else if(it == "b1") {
            b1 += sum;
        }else if(it == "b2"){
            b2 += sum;
        }else if(it == "b3"){
            b3 += sum;
        }
    }

    const getVal = () => { 
            var val;
            for(let i=1;i<=33;i++){
                val = document.getElementById(`Q${i}`).value;   
                 
                qsAns.push(val);
                processScore(val);
            }
            
            console.log(qsAns)
            setAns(qsAns);
        }

     
    const handleSubmit = () => {  
            
            getVal();
            
        //Writing Special conditions for A1s,B1s conditions
            
            processAndCalc(1,4,"a1");
            processAndCalc(5,8,"a2");
            processAndCalc(9,12,"a3");

            processAndCalc(13,18,"b1");
            processAndCalc(19,25,"b2");
            processAndCalc(26,28,"b3");
            processAndCalc(29,32,"b4");
            console.log(a1,a2,a3,b1,b2,b3,b4);
 
           if(a1 == 0 || a2 == 0 || a3 == 0){
            setFinalScore(0);
           }
           if(b1+b2+b3 == 0 || b2+b3+b4 == 0 || b3+b4+b1 == 0 || b1+b2+b4 == 0){
            setFinalScore(0);
           }
           else{
            setFinalScore(score);
           }
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
                                <div style={{textAlign:"center",fontSize:"30px"}}>
                                <Badge color="danger" >
                                    Form 2 DSM for Autism score
                                </Badge>
                                </div>
                            <form onSubmit={gotoAssesment} style={{padding:"20px 100px"}}>
                            <FormGroup>

                            <Label for="exampleName" sm-2>
                                                    Enter Name : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                           id="Name"
                                                           name="Name"
                                                           type="text"
                                                           className="autInp"
                                                           onChange={handleChangeForm}
                                                                                                                   
                                                           
                                                       />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
                            <Label for="exampleAge" sm-2>
                                                    Enter Age : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                           id="Age"
                                                           name="Age"
                                                           type="number"
                                                           className="autInp"
                                                           onChange={handleChangeForm}
                                                                                                                  />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
                            <Label for="exampleSex" sm-2>
                                                    Enter Sex : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                           id="Sex"
                                                           name="Sex"
                                                           type="text"
                                                           className="autInp"
                                                           onChange={handleChangeForm}
                                                                                                                  />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
                            <Label for="exampleSex" sm-2>
                                                    Enter City : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                           id="City"
                                                           name="City"
                                                           type="text"
                                                           className="autInp"
                                                           onChange={handleChangeForm}
                                                                                                                  />
                                                   </Col>
                            </FormGroup>
                            <FormGroup>
                            <Label for="example" sm-2>
                                                    Enter Mobile Number : 
                                                   </Label>
                                                   <Col sm-10>
                                                       <Input
                                                        
                                                           id="Mob_Number"
                                                           name="Mob_Number"
                                                           type="number"
                                                           className="autInp"
                                                           onChange={handleChangeForm}
                                                                                                                  />
                                                   </Col>
                            </FormGroup>
                            
                            <Button type="submit">Go To Assesment Form2</Button> 
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

                                            </>)
                                    }          
 
                                </>
                            )   
                            :    
                        (
                            <>     
                       <br /> <br /> <br />  
                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section1">Section 1 </Button></div>
                        <div style={{margin:"30px"}}>
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
                        </div>


                        <div style={{textAlign:"center",margin:"15px"}}><Button color="info" id="section2">Section 2 </Button></div>
                        <div style={{margin:"30px"}}>
                        <UncontrolledCollapse  toggler="#section2" style={{margin:"15px"}}>
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
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}} >
                            <Button color="success" onClick={handleSubmit}>Show Autism Form2 score </Button>  
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

export default Form2
