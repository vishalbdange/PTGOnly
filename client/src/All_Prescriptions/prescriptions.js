import React, { useState, useEffect } from 'react'
import aakar from "../aakar.jpg"
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton ,InputBase,Button as Button2} from '@material-ui/core';
import axios from 'axios'
import { Badge } from 'reactstrap';
import NavbarComponent from "../NavbarComponent"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Grid, TextField } from '@mui/material'
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { FormGroup, Form, Input,Label, Button, Col, Alert } from 'reactstrap'
import { styled } from '@mui/system';
import {
    TablePagination,
} from '@mui/material';
import Preview from "./Preview"
import { deflate } from 'pako';

const Prescriptions = () => {


    const [prescriptions, setPrescriptions] = useState([]);
    const [lastTenPrescriptions, setLastTenPrescriptions] = useState([]);
    const [lastTwentyFivePrescriptions, setLastTwentyFivePrescriptions] = useState([]);
    const [currentPrescriptions,setCurrentPrescriptions] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [loading, setLoading] = useState(true)

    const sortPrescriptionsByDate = (allprescriptions) => {
        return allprescriptions.sort((a,b)=>{
            return new Date(parseInt((b._id).substring(0, 8), 16) * 1000) - new Date(parseInt((a._id).substring(0, 8), 16) * 1000);
        })
    }

    useEffect(async () => {
        const lastTenPresData = await axios.get('https://aakar-clinic-02.onrender.com/getLastTen').then((response) => {
            setLoading(true)   
            setLastTenPrescriptions(response.data);
            setLoading(true)   
            return response.data

        });
        const lastTwentyFivePresData = await axios.get('https://aakar-clinic-02.onrender.com/getLastTwentyFive').then((response) => {
            setLoading(true)    
            console.log(response)
            setLastTwentyFivePrescriptions(response.data)
            setLoading(false)
            return response.data

        });
        const presData = await axios.get('https://aakar-clinic-02.onrender.com/all').then((response) => {
            setLoading(true)
            console.log(response)
            setPrescriptions(sortPrescriptionsByDate(response.data))
            setLoading(false)
            return response.data

        });
        console.log(lastTenPresData);
        console.log(lastTwentyFivePresData);
        console.log(presData);
        setCurrentPrescriptions(lastTenPresData);
        }, [])
    console.log(prescriptions)
    const compressedPrescriptions = deflate(prescriptions);
    console.log(compressedPrescriptions)
    localStorage.setItem('all-prescriptions', compressedPrescriptions)

    const [p_name, setP_name] = useState('')
    const [p_id, setP_id] = useState('')

    const [filteredResults, setFilteredResults] = useState([])
    const [reset, setReset] = useState(true)
    const [displayAll, setDisplayAll] = useState(true)
    const viewAllPrescriptions = () => {
        setCurrentPrescriptions(prescriptions);
    }
    const viewLastTenPrescriptions = () => {
        setCurrentPrescriptions(lastTenPrescriptions);
    }
    


    const handleChange = (e) => {
        console.log(prescriptions)
        setReset(false)
        setP_id(e.target.value);
        // if (e.target.pid == 'p_search' || e.target.name == 'p_search' || e.target.name == 'p_search') {
        //     setP_id(e.target.value);
        // }
        console.log(p_id)
    }
    const searchItems = () => {
        // console.log(p_id)
        setDisplayAll(false)
        console.log("PID")
        console.log(p_id)
        if (p_id != '') {
            console.log(currentPrescriptions)
            var filteredData = currentPrescriptions.filter((item) => {
                console.log(item.pid)
                console.log(p_id)
                if (item.pid?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } 
                else if (pswd=="9064" && item.name?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } else if (pswd=="9064" && item.address?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } 
                else {
                    return false;
                }
            })
            
            console.log(filteredData)
            setFilteredResults(filteredData)
        }
        else {
            setDisplayAll(true)
        }
        console.log(filteredResults)
    }
    const handleReset = () => {
        console.log("clearing")
        setP_id('');
        setDisplayAll(true);
        
    }

    const [enterPswd, setEnterPswd] = useState(true)
    const [pswd,setPswd] = useState("")
    const onHandleChangePswd = (e) => {
        setPswd(e.target.value  )
        if(e.target.value == '9064'){
            setEnterPswd(false);
        }
    }
    const findPatientByNumber = () => {

        pswd.replaceAll(' ','')
        console.log(pswd)
        
        if (pswd == '9064') {
            setEnterPswd(false);
        }else {
            //if patient enter a number
            var filteredData = prescriptions.filter((item) => {
                
                
                if (pswd !== "" && item.pid.includes(pswd)) {
                    console.log(item.pid)
                    setDisplayAll(false)
                    setEnterPswd(false);
                    return true;
                }
                else {
                    
                    return false;
                }
            })
            if(filteredData.length != 0) {
                console.log(filteredData)
                setFilteredResults(filteredData)
            }else{
                // if(pswd=="" || pswd!="9064"){
                //     alert("Please Enter a Valid Mobile Number")
                // }
                // alert("No PAtient Found")
                
            }
            setPswd("")
            
        }
    }
    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prescriptions.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    /*Styling*/
    const Root = styled('div')(
        ({ theme }) => `
        table {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.875rem;
          border-collapse: collapse;
          width: 100%;
        }
      
        td,
        th {
          border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
          text-align: left;
          padding: 8px;
        }
      
        th {
          background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        }
        `,
    );

    let datetime = ""
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            padding: theme.spacing(4)


        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            padding: theme.spacing(4)


        },
    }));
    const [currPres, setCurrPres] = useState('')
    const ChangeCurrentPrescription = (link) => {
        setCurrPres(link);
    }

    return (
        <>
            <NavbarComponent />
            {enterPswd ? (
                <div className="password-container">
                    <div style={{ textAlign: "center", fontSize: "26px", fontWeight: "200 !important", margin: "20px", padding: "10px" }}>
                        <Button varient="contained" color="success" style={{ padding: "20px" }} >
                            View Prescriptions
                        </Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cborder: "2px solid black" }}>
                        
                        <FormGroup floating style={{ width: "400px", margin: "4px" }}>
                            <Input
                                id="adminpswd"
                                name="pswd"
                                placeholder="Enter password to proceed"
                                type="password"
                                onChange={onHandleChangePswd}
                                className="inp"
                                required    
                            />
                            <Label for="exampleDate" >
                                Enter Password :
                            </Label>
                        </FormGroup>

                    </div>
                    </div>
                    ) :(

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={3}>
                            <Paper style={{ minWidth: "10vw", maxWidth: "100%", margin: "20px", padding: "30px" }}>
                                {
                                    pswd=="9064" ? (<> <div style={{ textAlign: "center" }}>
                                    <label><Badge style={{ fontSize: "22px" }}>View Prescriptions</Badge></label> < hr />
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                    <Paper
                                        component="form"
                                        sx={{ p: '4px 4px', display: 'flex',flexDirection:"row",alignItems:"center",justifyContent:"center",width:"840px"}}
                                        >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1,width:"340px"}}
                                        placeholder="Enter Mobile Number/Name/Address"
                                        inputProps={{ 'aria-label': 'Enter Mobile Number/Name/Address' }}
                                        onChange={handleChange}
                                        value={p_id}
                                        fullWidth
                                    />
                                    <IconButton
                                        size="large"
                                        onClick={searchItems}
                                        color="primary"
                                        label="Search a Prescription"
                                        style={{ margin: '0px 10px 0px 0px' }}
                                    >
                                        <SearchIcon fontSize="large" color="primary"/>
                                    </IconButton>
                                    <Button onClick={handleReset} >Clear</Button>
                                    <Button onClick={viewAllPrescriptions} style={{margin:"0px 0px 0px 15px ",width:"330px"}}>View All</Button>
                                    <Button onClick={viewLastTenPrescriptions} style={{margin:"0px 0px 0px 15px ",width:"330px"}}>Last 10</Button>
                                    </Paper>
                                    </div>
                                </div>
                                    </>) : (<>  </>)
                                }
                               

                                <div style={{ textAlign: "center", padding: "10px" }}>
                                    
                                   <hr />
                                </div>
                                {loading ? (<>
                                    <div><LinearProgress /></div>
                                </>) :

                                    !displayAll ? (
                                        
                                        // console.log(filteredResults)
                                        
                                        filteredResults.map((item1, key) => {
                                            console.log(item1)
                                            return (
                                                <>
                                                    <Card sx={{ width: 400, }} style={{ margin: "10px" }}>
                                                        <CardContent>
                                                            {
                                                                item1.pid && (
                                                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                                                        Patient ID : {item1.pid}
                                                                    </Typography>)
                                                            }
                                                            {
                                                                item1.name && (
                                                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                                                        Name : {item1.name}
                                                                    </Typography>)
                                                            }
                                                            {
                                                                new Date(parseInt((item1._id).substring(0, 8), 16) * 1000).toDateString() && (
                                                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                                                    Date : {new Date(parseInt((item1._id).substring(0, 8), 16) * 1000).toDateString()}
                                                                    </Typography>
                                                                )
                                                            }
                                                            {
                                                                item1.visit_no && (
                                                                    <Typography sx={{ mb: 1.5 }} variant="body2">
                                                                        Visit No. : {item1.visit_no}
                                                                    </Typography>)
                                                            }
                                                            {
                                                                (item1.age && item1.sex) && (

                                                                    <Typography variant="body2">
                                                                        Age : {item1.age} &nbsp;&nbsp;&nbsp;&nbsp; Sex : {item1.sex}
                                                                        <br />
                                                                    </Typography>)
                                                            }

                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" href={`/all/prescriptions/${item1.pid}-${item1.name}`}>View More</Button>
                                                        </CardActions>
                                                    </Card>
                                                </>
                                            )
                                        })

                                    )
                                        : (

                                            <>
                                                <Root sx={{ maxWidth: '100%' }}>  <table aria-label="custom pagination table">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ textAlign: "center" ,fontSize:"18px"}}>Patient's Name</th>
                                                            <th style={{ textAlign: "center" ,fontSize:"18px"}}>Mobile No.</th>
                                                            <th style={{ textAlign: "center" ,fontSize:"18px"}}>Diagnosis</th>
                                                            <th style={{ textAlign: "center" ,fontSize:"18px"}}>Date</th>
                                                            <th style={{ textAlign: "center" ,fontSize:"18px"}}>Full Prescription</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {(rowsPerPage > 0
                                                            ? currentPrescriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : currentPrescriptions
                                                        ).map((prescription) => (
                                                            <tr key={prescription.p_id}>
                                                                
                                                                
                                                                <td style={{ width: 440, textAlign: "center" }}>{prescription.name}</td>
                                                                {
                                                                    prescription.pid == '' && (<td style={{ width: 300, textAlign: "center" }}>N/A</td>)
                                                                }
                                                                {
                                                                    prescription.pid !== '' && (<td style={{ width: 300, textAlign: "center" }}>{prescription.pid}  </td>)
                                                                }
                                                                <Tooltip title={prescription.diagnosis}>
                                                                    <td align="center" style={{ width: 300, textAlign: "center" }}>
                                                                        {prescription.diagnosis.slice(0, 18)}...
                                                                    </td>
                                                                </Tooltip>
                        
                                                                <td style={{ width: 300, textAlign: "center" }}>{new Date(parseInt((prescription._id).substring(0, 8), 16) * 1000).toDateString()}</td>
                                                                <td style={{ width: 300, textAlign: "center" }} align="right">
                                                                    <Button size="small" href={`/all/prescriptions/${prescription.pid}-${prescription.name}`} style={{margin:"4px 0px 4px 0px"}} ><a>Show Prescription</a></Button>
                                                                </td>
                                                                {/* <td>
                                                   
                                                       {datetime = new ObjectId(prescription._id).getTimestamp()}
                                                    </td> */}
                                                            </tr>
                                                        ))}
                                                        {emptyRows > 0 && (
                                                            <tr style={{ height: 41 * emptyRows }}>
                                                                <td colSpan={3} aria-hidden />
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <TablePagination
                                                                rowsPerPageOptions={[30,50,75, 100]}
                                                                colSpan={3}
                                                                count={currentPrescriptions.length}
                                                                rowsPerPage={rowsPerPage}
                                                                page={page}
                                                                slotProps={{
                                                                    select: {
                                                                        'aria-label': 'rows per page',
                                                                    },
                                                                    actions: {
                                                                        showFirstButton: true,
                                                                        showLastButton: true,
                                                                    },
                                                                }}
                                                                onPageChange={handleChangePage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                               
                                                </Root>
                                            </>
                                        )
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                )}
                </>
            )
}


            export default Prescriptions

