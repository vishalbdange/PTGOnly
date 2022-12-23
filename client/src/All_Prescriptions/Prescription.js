import React,{useState,useEffect} from 'react'
import aakar from "../aakar.jpg"
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Input, Paper } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from '@material-ui/core';
import axios from 'axios'
import { Badge } from 'reactstrap';

const Prescription = ({match}) => {
    
    const pid = match.params.pid;
    const [prescriptions,setPrescriptions] = useState([])
    const [prescription,setPrescription] = useState({})
    useEffect(()=>{
        axios.get('https://aakar-clinic.onrender.com/all')
        .then(response => setPrescriptions(response.data)  );
        if (prescriptions.find((pr) => pr.pid === pid) !== undefined) {
            setPrescription(prescriptions.find((pr) => pr.pid === pid))
          }
        console.log(prescription)
    },[])
   
    return (
        <>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            Prescription with ID : {pid}
        </div>
        </>
    )
}

export default Prescription

