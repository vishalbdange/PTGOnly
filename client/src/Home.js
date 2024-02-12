import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { FormGroup,Input,Label,Col,Button} from 'reactstrap'
import NavbarComponent from "./NavbarComponent"
import UseFulLinks from './UseFulLinks'
import { List,ListItem,Divider,ListItemText,Paper} from '@mui/material'
import { padding } from '@mui/system'

const Home = () => {
    const style = {
        maxWidth: 140,
        bgcolor: 'background.paper',
        padding:"0px"
      };    
    
    const [isMobile,setIsMobile] = useState(false)

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900 && window.innerWidth > 100
            ? setIsMobile( true )
            : setIsMobile(false );
        };
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);
    return (
        <div className='home'>
            <NavbarComponent />
            {/* <div style={{textAlign:"center"}}>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem >
                    <Button color='white'>
                    <ListItemText primary="Prescription" />
                    </Button>
                </ListItem>
                <Divider />
                <ListItem  divider>
                    <ListItemText primary="Certificate" />
                </ListItem>
                <ListItem >
                    <ListItemText primary="Autism-Score" />
                </ListItem>
                <Divider light />
                <ListItem divider>
                    <ListItemText primary="Form2" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="Form1" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="CARS" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="Form-10IA" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="All" />
                </ListItem>
            </List>
            </div> */}
            {!isMobile ? (
                <div  className="homebg">
                <Paper>
                <List>
                <ListItem>
                    <Link to="/prescription" ><Button  color="info" >Prescription </Button></Link> &nbsp;&nbsp;
                    <Link to="/short-prescription" ><Button  color="info" >Certificate </Button></Link> &nbsp;    &nbsp;   
                    <Link to="/autism-score" ><Button color="info" >Autism-Score </Button></Link>&nbsp;&nbsp;
                    <Link to="/form2" ><Button color="info" >Form2</Button></Link>&nbsp;&nbsp;
                    <Link to="/dsm5-for-adhd" ><Button color="info" >DSM5 for ADHD</Button></Link>
                </ListItem>
                <ListItem>
                       
                    <Link to="/indian-autism-score" ><Button color="info" >Indian-Autism-Score </Button></Link>&nbsp;&nbsp;<Link to="/form1" ><Button color="info" >Form1</Button></Link> &nbsp; &nbsp; <Link to="/cars" ><Button color="info" >CARS</Button></Link>&nbsp; &nbsp; <Link to="/all" ><Button color="info" >All</Button></Link>
                </ListItem>
                {/* <ListItem>
                    
                </ListItem> */}
                {/* <ListItem>
                    <Link to="/form10ia" ><Button color="info" >Form_10IA</Button></Link>
                </ListItem> */}
                </List>
                </Paper>
            </div>
            )
            : (
                <div  className="homebg">
                <Paper>
                <List>
                <ListItem>
                    <Link to="/prescription" ><Button  color="info" >Prescription </Button></Link> 
                </ListItem>
                <ListItem>  
                    <Link to="/short-prescription" ><Button  color="info" >Certificate </Button></Link>
                </ListItem>
                <ListItem>
                    <Link to="/autism-score" ><Button color="info" >Autism-Score </Button></Link>
                </ListItem>
                <ListItem>
                    <Link to="/indian-autism-score" ><Button color="info" >Indian-Autism-Score </Button></Link>
                </ListItem>
                <ListItem>
                    <Link to="/form2" ><Button color="info" >Form2</Button></Link>
                </ListItem>
                <ListItem>
                    <Link to="/form1" ><Button color="info" >Form1</Button></Link>
                </ListItem>
                <ListItem>
                    <Link to="/cars" ><Button color="info" >CARS</Button></Link>
                </ListItem>
                {/* <ListItem>
                    <Link to="/form10ia" ><Button color="info" >Form_10IA</Button></Link>
                </ListItem> */}
                </List>
                </Paper>
            </div>
            )}
           
            <div>
                <UseFulLinks />
            </div>

        </div>
    )
}   
export default Home
