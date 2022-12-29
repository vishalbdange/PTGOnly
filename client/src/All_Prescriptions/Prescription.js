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
import {useParams} from 'react-router-dom';
import Preview from './Preview.js'

const Prescription = () => {
    
    const params = useParams();
    console.log(params.pid)
    var pname = (params.pid).split('-')[1];
    
    const pid = (params.pid).split('-')[0];
    var prescription = {};
    // useEffect(()=>{
    //     axios.get('https://aakar-clinic.onrender.com/all')
    //     .then(response => setPrescriptions(response.data)  );
    //     if (prescriptions.find((pr) => pr.pid === pid) !== undefined) {
    //         setPrescription(prescriptions.find((pr) => pr.pid === pid))
    //       }
    //     console.log(prescription)
    // },[window.onload])
    const prescriptions = JSON.parse(localStorage.getItem('all-prescriptions'));
    if(pid !== ''){
        if (prescriptions.find((pr) => pr.pid === pid) !== undefined) {
            prescription = prescriptions.find((pr) => pr.pid === pid)
        }
    }else{
        if (prescriptions.find((pr) => pr.name === pname) !== undefined) {
            prescription = prescriptions.find((pr) => pr.name === pname)
        }
    }

    console.log(prescription)   
    return (
       
        <div>
            <br />
            <Preview prescription={prescription} />
        </div>
       
    )
}

export default Prescription

