import React, { useRef, useState, useMemo, useCallback } from 'react'
import Pdf from "react-to-pdf";
import TestPDF from './TestPDF';
import { Link, useNavigate } from "react-router-dom"
import './Form.css'
import aakar from "./aakar.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Form, Input, Label, Button, Col, Alert} from 'reactstrap'
import ImageCapture from "react-image-data-capture";
import {FormControl,InputLabel,Select,MenuItem,Badge} from '@material-ui/core'
import {ArrowCircleDown,ArrowCircleUp,ArrowCircleUp1} from '@mui/icons-material';
import {IconButton} from '@material-ui/core';
const prescription_Items = require('./prescription_Items').prescription_Items;

const PrescriptionFormEmpty = ({ changeImgURL }) => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        DOB: new Date(Date.now()),
        file: null,
        Visit_No: '',
        Name: '',
        Address: '',
        Age: '',
        Sex: '',
        Diagnosis: '',
        Goal: '',
        MoblieNo: '',
        Prescription: [],
        Receipt: ' ',
        Certificate : '',
        textArea1 : '',
        textArea2 : '',
        textArea3:'',
        Description: "For neurodevelopmental disorders and delays Daily Occupational Therapy,behaviour Therapy and Speech therapy is important to achieve milestones needed for activities of daily living and later control and regulation of sensory and motor issues related to development and speech,so that concrete operations can be taught and further complex skills can be achieved.Its like tutions."
    });
    var prescription = [];
    var ImageURL = null;
    var imageSource = null;
    const [emptyStates, setEmptyStates] = useState({
        isName: true,
        isAddress: true,
        isAge: true,
        isSex: true,
        isDOB: true,
        isMobileNo: true,
        isReceipt: true,
        isCertificate : true,
        istextArea1:true,
        istextArea2:true,
        istextArea3:true

    })
    localStorage.setItem('state', JSON.stringify(state))
    localStorage.setItem('prescription', JSON.stringify(prescription))
    const validateForm = () => {
        // console.log("Validating")
        // if(state.Name == ""){
        //     setEmptyStates({...emptyStates,isName:false})
        //     validateContent(emptyStates)
        // }
        // else   if(state.Address == ""){
        //     setEmptyStates({...emptyStates,isAddress:false})
        //     validateContent(emptyStates)
        // }
        // else   if(state.Age == ""){
        //     setEmptyStates({...emptyStates,isAge:false})
        //     validateContent(emptyStates)
        // }
        // else{

        prescription = values.val;
        setState({ ...state, Prescription: values.val })
        localStorage.setItem('prescription', JSON.stringify(prescription))

        navigate("/short-prescription-view")
        // }
    }
    const [values, setValues] = useState({ val: [] });

    
    function createInputs() {
        return values.val.map((el, i) =>
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => moveUp(i)}
                    color="inherit"
                    >
                    <ArrowCircleUp />
                    </IconButton>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => moveDown(i)}
                color="inherit"
                >
                <ArrowCircleDown />
                </IconButton>
                {/* <Input type='button' style={{ width: "60px", borderRadius: "10%", margin: "10px" }} value='Up' onClick={() => moveUp(i)} /> */}
                <Input type="text" value={el || ''} style={{ margin: "10px", width: "720px" }} onChange={e => { handleChangeList(e, i) }} />
                <Input type='button' style={{ width: "60px", borderRadius: "10%", margin: "10px" }} value='X' onClick={() => removeClick(i)} />
            </div>
        );
    }


    const handleImageFile = (e) => {
        // console.log(e.target.files[0]);
        ImageURL = URL.createObjectURL(e.target.files[0]);
        console.log(ImageURL)
        changeImgURL(ImageURL);
    }

    function handleChangeList(e, i) {
        let vals = [...values.val];
        vals[i] = e.target.value;
        setValues({ val: vals });
    }
    const addClick = (text) => {
        setValues({ val: [...values.val, text] })
    }

    const removeClick = (i) => {
        let vals = [...values.val];
        vals.splice(i, 1);
        console.log(vals)
        setValues({ val: vals });
    }

    const handleSubmit = event => {
        alert('A name was submitted: ' + values.val.join(', '));
        event.preventDefault();
    }

    const handleChange = (e) => {
        console.log(state.Description)
        const name = e.target.name;
        if (name == "Name") {
            setEmptyStates({ ...emptyStates, isName: true })
        } else if (name == "Address") {
            setEmptyStates({ ...emptyStates, isAddress: true })
        } else if (name == "Age") {
            setEmptyStates({ ...emptyStates, isAge: true })
        } else if (name == "DOB") {
            setEmptyStates({ ...emptyStates, isDOB: true })
        } else if (name == "MobileNo") {
            setEmptyStates({ ...emptyStates, isMobileNo: true })
        } else if (name == "Receipt") {
            setEmptyStates({ ...emptyStates, isReceipt: true })
        } else if (name == "ImageFile") {
            setEmptyStates({ ...emptyStates, isImageFile: true })
        }
        const value = name == "ImageFile" ? e.target.files[0] : e.target.value;

        setState({ ...state, [name]: value })

    }


    const [enterPswd, setEnterPswd] = useState(true);
    const [pswd, setPswd] = useState('');
    const onHandleChangePswd = (e) => {
        const value = e.target.value;
        // setPswd(value);
        if(value == '9064'){
            setEnterPswd(false);
        }
    }
    const onHandleChangeCertificate = (e) => {
        const name = e.target.name;
        if (name == "Certificate") {
            setEmptyStates({ ...emptyStates, isCertificate: true })
        } else if (name == "textArea1") {
            setEmptyStates({ ...emptyStates, istextArea1: true })
        } else if (name == "textArea2") {
            setEmptyStates({ ...emptyStates, istextArea2: true })
        }
        const value = e.target.value;

        setState({ ...state, [name]: value })
        // setState({ ...state, e.target.name : value })
    }
    
    function moveUp(i){
        console.log(i)
        let vals = [...values.val]
        var temp = vals[i];
        console.log(vals[i])
        console.log(vals[i-1])
        if(i>0){
            vals[i]=vals[i-1];
            vals[i-1]=temp;
        }
        setValues({ val: vals });
    }
    function moveDown(i){
        console.log(i)
        let vals = [...values.val]
        let n = vals.length;
        var temp = vals[i];
        console.log(vals[i])
        console.log(vals[i+1])
        if(i<n-1){
            vals[i]=vals[i+1];
            vals[i+1]=temp;
        }
        setValues({ val: vals });
    }

    const submitPswd = () => {
        if (pswd == '9064') {
            setEnterPswd(false);
        }
    }
    const [imageOpen, setImageOpen] = useState(false)
    const [showImgCapture, setShowImgCapture] = useState(true);
    const [imageTaken, setImageTaken] = useState(false)
    const config = useMemo(() => ({ video: true }), []);
    /*
      { video: true } - Default Camera View
      { video: { facingMode: environment } } - Back Camera
      { video: { facingMode: "user" } } - Front Camera
    */
    const [imgSrc, setImgSrc] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const onCapture = (imageData) => {
        // read as webP

        // Unmount component to stop the video track and release camera

        console.log(imageData.webP)
        imageSource = imageData.webP;
        // read as file
        setImgFile(imageData.file);

        console.log(imageSource)
        // setTimeout(()=>{
        setState(
            { ...state, file: imageSource }
        )
        // },2000)
        setImageTaken(true)
        setImageOpen(false);
        setShowImgCapture(false);
    };
    const onError = useCallback((error) => {

        console.log(error);
    }, []);
    //   const handleKeyDown = (e) => {
    //     console.log("HII")
    //     if (e.key === 'Enter') {
    //         console.log("HII")
    //          submitPswd();
    //       }
    //  }


    // imgFile can be used as a file upload form submission
    const formData = new FormData();
    formData.append("file", imgFile);
    return (


        <div className="PreForm">
            <div style={{ textAlign: "center", display: "flex", justifyContent: "center", padding: "20px" }}><img src={aakar} className="aakar-logo" alt="Aakar Clinic" /> </div>
            {/* {validateContent} */}
            {
                enterPswd ? (<div className="password-container">
                    <div style={{ textAlign: "center", fontSize: "26px", fontWeight: "200 !important", margin: "20px", padding: "10px" }}>
                        <Badge color="success" style={{ padding: "20px" }} >
                            Prescription Form  :
                        </Badge>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cborder: "2px solid black" }}>
                        <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="examplepswd"
                                name="pswd"
                                placeholder="pswd"
                                type="password"
                                onChange={onHandleChangePswd}
                                className="inp"
                                required
                            />
                            <Label for="exampleDate" >
                                Enter Password :
                            </Label>
                        </FormGroup>

                        {/* <Button onClick={submitPswd} style={{ width: "400px", margin: "4px" }} >Go To Prescription Form</Button> */}
                    </div>

                </div>) : (<>

                    <Form className="prescription-form" >
                        {/* <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",cborder:"2px solid black"}}> */}
                          <div style={{textAlign:"center"}}> <Button className='btn btn-danger' >Generate Certificate</Button></div>
                        <br />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="exampleCertificate"
                                name="Certificate"
                                placeholder="Certificate"
                                type="textarea"
                                style={{ height: "100px" }}
                                onChange={onHandleChangeCertificate}
                                className="inp"
                                required
                            />
                            <Label for="exampleCertificate" >
                                Certificate
                            </Label>
                        </FormGroup>
                            <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="textArea1"
                                name="textArea1"
                                placeholder="textArea1"
                                type="textarea"
                                style={{ height: "100px" }}
                                onChange={onHandleChangeCertificate}
                                className="inp"
                                required
                            />
                        </FormGroup>
                        <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="textArea2"
                                name="textArea2"
                                placeholder="textArea2"
                                type="textarea"
                                style={{ height: "100px" }}
                                onChange={onHandleChangeCertificate}
                                className="inp"
                                required
                            />
                        </FormGroup>
                        <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="textArea3"
                                name="textArea3"
                                placeholder="textArea3"
                                type="textarea"
                                style={{ height: "100px" }}
                                onChange={onHandleChangeCertificate}
                                className="inp"
                                required
                            />
                        </FormGroup>
                            {createInputs()}
                            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-around"}}>
                                <Input type='button' value='+ Add Prescription ' onClick={() => addClick('')} style={{ marginBottom: "10px",marginRight:"15px", width: "500px" }} />
                                <Badge badgeContent="New" color="primary">
                                <Select    
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select" 
                                    value='All'
                                    label='All'
                                    style={{padding:"2px",backgroundColor:"white"}}
                                    
                                >
                                    {prescription_Items.map((p_item,key) => {
                                        return(<>
                                        
                                            <MenuItem onClick={() => addClick({p_item}.p_item)}  >{p_item}</MenuItem>
                                       
                                        </>
                                        )                                        
                                    })}
                                </Select>   
                                </Badge>               
                            </div>
 
                            <Button
                                color="success"
                                onClick={validateForm}
                            >Submit
                            </Button>
                        </div>
                    </Form>
                </>
                )
            }
        </div>


    ) 
}

export default PrescriptionFormEmpty
