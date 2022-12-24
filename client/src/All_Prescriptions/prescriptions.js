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
import NavbarComponent from "../NavbarComponent"


const Prescriptions = () => {
    
 
  
    const [prescriptions,setPrescriptions] = useState([]);
   
    useEffect(async ()=>{
        await axios.get('https://aakar-clinic.onrender.com/all')
        .then(response => setPrescriptions(response.data) );
    },[])
    localStorage.setItem('all-prescriptions', JSON.stringify(prescriptions))
    const [p_name,setP_name] = useState('')
    const [p_id,setP_id] = useState('')

    const [filteredResults,setFilteredResults] = useState([])
    const [reset,setReset] = useState(true)

    console.log(prescriptions)
    const handleOnSearch = () =>{
        console.log("Providing your search results")
       
    }
    const handleChange = (e) =>{
        console.log(prescriptions)
        setReset(false)
        if(e.target.name == 'p_id'){
            setP_id(e.target.value);
        }else if(e.target.name == 'p_name'){
            setP_name(e.target.value)
        }
        console.log(p_id)
        console.log(p_name)

    }
    const searchItems = () => {
        // console.log(p_id)

        if (p_id != '') {
            var filteredData = prescriptions.filter((item) => {
                console.log(item.pid)
                console.log(p_id)
                return item.pid?.includes(p_id)
            })
            console.log(filteredData)
            setFilteredResults(filteredData)
            if(p_name != ''){
                filteredData = filteredResults.filter((item) => {
                    return item.name?.toLowerCase().includes(p_name.toLowerCase())
                })
                console.log(filteredData)
                setFilteredResults(filteredData)
            }
        }
        else if(p_name !== ''){
            var filteredData = prescriptions.filter((item) => {
                return item.name?.toLowerCase().includes(p_name.toLowerCase())
            })
            console.log(filteredData)
            setFilteredResults(filteredData) 
            // filteredData = filteredResults.filter((item) => {
            //     return item.pid?.includes(p_id.toLowerCase())
            // })
            console.log(filteredData)
            // setFilteredResults(filteredData) 
        }
        if(p_name === '' && p_id === ''){
            setFilteredResults(prescriptions)
        }
        console.log(filteredResults)
    }
    const handleReset = () => {
        setReset(true);
        setP_id('');
        setP_name('')
    }

    
   
    return (
        <>
        <NavbarComponent />
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            
            <Paper style={{margin:"20px",padding:"10px"}}>
             <div style={{textAlign:"center"}}>
                <label>Search a prescription</label> < hr/>
                <Input 
                    placeholder='Patient ID' 
                    onChange={handleChange}
                    name='p_id' 
                    type="text" 
                /> 
                &nbsp;
                <Input 
                    placeholder='Patient Name' 
                    name='p_name'
                    onChange={handleChange} 
                    type="text" 
                />
                <IconButton
                    size="large"
                    onClick={searchItems}
                    color="inherit"
                    >
                    <SearchIcon />
                    </IconButton>
             </div>
            <Button onClick={handleReset}>Reset</Button>
            <div style={{textAlign:"center",padding:"10px",borderBottom:"1px solid black"}}>

            <Badge style={{fontSize:"16px",borderBottom:"1px solid black"}}>All Prescriptions</Badge>
            </div>
            
            {
                (!reset && (p_id !== '' || p_name !== '') ) ? (
           
                    // console.log(filteredResults)
                    filteredResults.map((item1,key) => {
                        console.log(item1)
                        return(
                            <> 
                                <Card sx={{ width: 400,}} style={{margin:"10px"}}>
                                    <CardContent>
                                        <Typography sx={{ mb: 1.5 }} variant="body2">
                                        Patient ID : {item1.pid}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} variant="body2">
                                        Name : {item1.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} variant="body2">
                                         Visit No. : {item1.visit_no}
                                        </Typography>
                                        <Typography variant="body2">
                                        Age : {item1.age} &nbsp;&nbsp;&nbsp;&nbsp; Sex : {item1.sex} 
                                        <br />
                                        {/* {'"a benevolent smile"'} */}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" href={`/all/prescriptions/${item1.pid}`}>View More</Button>
                                    </CardActions>
                                </Card>
                            </>
                        )
                    })
                  
                )
                : (
                    prescriptions.map((prescription,key) => {
                    return(
                        <> 
                            <Card sx={{ width: 300}} style={{margin:"10px"}}>
                                <CardContent>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                    Patient ID : {prescription.pid}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                    Name : {prescription.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                     Visit No. : {prescription.visit_no}
                                    </Typography>
                                    <Typography variant="body2">
                                    Age : {prescription.age} &nbsp;&nbsp;&nbsp;&nbsp; Sex : {prescription.sex} 
                                    <br />
                                    {/* {'"a benevolent smile"'} */}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={`/all/prescriptions/${prescription.pid}`} >View More</Button>
                                </CardActions>
                            </Card>
                        </>
                    )
                })
                )
            }
            </Paper>
        </div>
        </>
    )
}

export default Prescriptions

