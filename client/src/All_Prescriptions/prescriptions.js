import React,{useState,useEffect} from 'react'
import aakar from "../aakar.jpg"
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const Prescriptions = () => {
    
 
   
    const [prescriptions,setPrescriptions] = useState([]);
   
    useEffect(()=>{
        axios.get('http://localhost:5000/all')
        .then(response => setPrescriptions(response.data)  );
         
    },[])
   
    console.log(prescriptions)


    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{fontSize:"25px",padding:"20px",marginTop:"20px",border:"2px solid violet-blue"}}>All prescriptions</div>
             
            <div style={{margin:"20px",padding:"10px"}}>
            {
                
                prescriptions.map((prescription,key) => {
                    console.log(prescription)
                    return(
                        <> 
                            <Card sx={{ width: 500,}} style={{margin:"10px"}}>
                                <CardContent>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                    Patient ID : {prescription.pid}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                    Name : {prescription.Name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                     Visit No. : {prescription.Visit_No}
                                    </Typography>
                                    <Typography variant="body2">
                                    Age : {prescription.Age} &nbsp;&nbsp;&nbsp;&nbsp; Sex : {prescription.Sex} 
                                    <br />
                                    {/* {'"a benevolent smile"'} */}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View More</Button>
                                </CardActions>
                            </Card>
                        </>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Prescriptions

