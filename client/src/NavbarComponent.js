import React from 'react'
import aakar from "./aakar.jpg"
import {NavbarBrand,Navbar,NavbarToggler,Collapse,Nav,NavbarText,NavItem,NavLink} from "reactstrap"
import { Link } from 'react-router-dom'
// import {Button} from 'reactstrap'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

const NavbarComponent = () => {

    const pages = ['Form1','Form2','CARS','All'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (

        <div>
            {/* <Navbar
                color="light"jpg
                expand="md"
                light   
                style={{height:"50px"}}
            >
                <NavbarBrand href="#">

                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                <Nav
                    className="me-auto"
                    navbar
                >
                </Nav>
                <NavbarText>
                    <mob>Contact Us  : 9869405747</mob>
                </NavbarText>
                </Collapse>
            </Navbar> */}
            <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography> */}
                     <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Logo">
                        {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                            <img style={{width:"200px"}} alt="Remy Sharp" src={aakar} />
                        {/* </IconButton> */}
                        </Tooltip>
                        {/* <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu> */}
                    </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    style={{color:"black"}}
                    >
                     <Button
                        key='home'
                        sx={{ my: 2, display: 'block' }}
                        href='/'
                    >
                       Home
                    </Button>

                    <Button
                        key='prescription'
                        sx={{ my: 2, display: 'block' }}
                        href='/prescription'
                    >
                       Prescription
                    </Button>
                    <Button
                        key='all'
                        sx={{ my: 2, display: 'block' }}
                        href='/all'
                    >
                       All
                    </Button>
                    <Button
                        key='form1'
                        sx={{ my: 2, display: 'block' }}
                        href='/form1'
                    >
                       form1
                    </Button>
                    <Button
                        key='cars'
                        sx={{ my: 2, display: 'block' }}
                        href='/cars'
                    >
                       Cars
                    </Button>
                    <Button
                        key='form2'
                        sx={{ my: 2, display: 'block' }}
                        href='/form2'
                    >
                       form2
                    </Button>
                    <Button
                        key='autism-score'
                        sx={{ my: 2, display: 'block' }}
                        href='/autism-score'
                    >
                       Autism-Score
                    </Button>
                    </Menu>
                </Box>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        key='home'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/'
                    >
                       Home
                    </Button>

                    <Button
                        key='prescription'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/prescription'
                    >
                       Prescription
                    </Button>
                    <Button
                        key='all'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/all'
                    >
                       All
                    </Button>
                    <Button
                        key='form1'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/form1'
                    >
                       form1
                    </Button>
                    <Button
                        key='cars'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/cars'
                    >
                       Cars
                    </Button>
                    <Button
                        key='form2'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/form2'
                    >
                       form2
                    </Button>
                    <Button
                        key='autism-score'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/autism-score'
                    >
                       Autism-Score
                    </Button>
                    {/* <Button
                        key='form2'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        href='/form2'
                    >
                       FORM2
                    </Button> */}
              
                </Box>

                {/* <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box> */}
                </Toolbar>
            </Container>
            </AppBar>
                 {/* <div style={{textAlign:"center"}}>
                    <img src={aakar}  style={{width:"550px",marginTop:"20px"}} alt="Aakar Clinic Image"/>
                    <Link to="/all"> <Button>All Prescriptions</Button></Link>
                </div> */}
        </div>
    )
}

export default NavbarComponent
