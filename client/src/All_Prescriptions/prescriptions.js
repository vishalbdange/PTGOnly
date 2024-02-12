import React, { useState, useEffect } from 'react'
import aakar from "../aakar.jpg"
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Input, FormGroup } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Label } from 'reactstrap'
import { IconButton } from '@material-ui/core';
import axios from 'axios'
import { Badge } from 'reactstrap';
import NavbarComponent from "../NavbarComponent"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {Grid} from '@mui/material'
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import {
    TablePagination,
  } from '@mui/material';
import Preview from "./Preview"
const Prescriptions = () => {


    const [prescriptions, setPrescriptions] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        const presData = axios.get('http://localhost:5000/all').then((response) => {
            console.log(response)
            setPrescriptions(response.data)
            return response.data

        });
        console.log("displayAll", displayAll)
        console.log(presData)
    }, [])
    localStorage.setItem('all-prescriptions', JSON.stringify(prescriptions))
    const [p_name, setP_name] = useState('')
    const [p_id, setP_id] = useState('')

    const [filteredResults, setFilteredResults] = useState([])
    const [reset, setReset] = useState(true)
    const [displayAll, setDisplayAll] = useState(true)




    const handleChange = (e) => {
        console.log(prescriptions)
        setReset(false)
        if (e.target.pid == 'p_search' || e.target.name == 'p_search' || e.target.name == 'p_search') {
            setP_id(e.target.value);
        }
        console.log(p_id)
    }
    const searchItems = () => {
        // console.log(p_id)
        setDisplayAll(false)
        if (p_id != '') {
            console.log(prescriptions)
            var filteredData = prescriptions.filter((item) => {
                console.log(item.pid)
                console.log(p_id)
                if (item.pid?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } else if (item.name?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } else if (item.address?.toLowerCase().includes(p_id.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            })
            console.log(filteredData)
            setFilteredResults(filteredData)
        }
        else {
            displayAll(true)
        }
        console.log(filteredResults)
    }
    const handleReset = () => {
        setDisplayAll(true);
        setP_id('');
    }

    const [enterPswd, setEnterPswd] = useState(true)
    const onHandleChangePswd = (e) => {
        if (e.target.value == '9064') {
            setEnterPswd(false);
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
    const [currPres,setCurrPres] = useState('')
    const ChangeCurrentPrescription = (link) =>{
        setCurrPres(link);
    }
    
    return (
        <>
            <NavbarComponent />

           
            <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ minHeight: '100vh' }}
>   
<Grid item xs={3}>
                <Paper style={{ minWidth:"10vw",maxWidth:"100%",margin: "20px", padding: "10px" }}>
                    <div style={{ textAlign: "center" }}>
                        <label><Badge style={{ fontSize: "16px", borderBottom: "1px solid Red" }}>Search a prescription</Badge></label> < hr />
                        <Input
                            placeholder='Enter Mobile Number/Name/Address'
                            onChange={handleChange}
                            name='p_search'
                           
                            type="text"
                        />
                        <IconButton
                            size="large"
                            onClick={searchItems}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                        <Button onClick={handleReset}>Clear</Button>
                    </div>

                    <div style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid black" }}>

                        <Badge style={{ fontSize: "12px", borderBottom: "1px solid black" }}>All Prescriptions</Badge>
                    </div>

                    {

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
                                                <th style={{textAlign:"center"}}>Patient's Name</th>
                                                <th style={{textAlign:"center"}}>Mobile No.</th>
                                                <th style={{textAlign:"center"}}>Diagnosis</th>
                                                <th style={{textAlign:"center"}}>Full Prescription</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {(rowsPerPage > 0
                                                ? prescriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : prescriptions
                                            ).map((prescription) => (
                                                <tr key={prescription.p_id}>
                                                     <td style={{ width:440 ,textAlign:"center"}}>{prescription.name}</td>
                                                     {
                                                        prescription.pid == '' && ( <td style={{ width:440 ,textAlign:"center"}}>N/A</td>)
                                                     }
                                                    {
                                                        prescription.pid !== '' && (<td style={{ width:440 ,textAlign:"center"}}>{prescription.pid}  </td>)
                                                    }
                                                    <Tooltip title={prescription.diagnosis}>
                                                    <td  align="center" style={{ width:440 ,textAlign:"center"}}>
                                                        {prescription.diagnosis.slice(0, 10)}...
                                                    </td>
                                                    </Tooltip>
                                                    <td style={{ width:440 ,textAlign:"center"}} align="right">
                                                        <Button size="small" href={`/all/prescriptions/${prescription.pid}-${prescription.name}`} ><a>Show Prescription</a></Button>
                                                    </td>
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
                                                    rowsPerPageOptions={[5, 10, 25, 50,100]}
                                                    colSpan={3}
                                                    count={prescriptions.length}
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

        </>
    )
}


export default Prescriptions

