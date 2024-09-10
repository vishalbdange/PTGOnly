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
            {!isMobile ? (
                <div  className="homebg">
                <Paper>
                <List>
                <ListItem>
                    <Link to="/prescription" ><Button  color="info" >Prescription </Button></Link> &nbsp;&nbsp;
                </ListItem>
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
