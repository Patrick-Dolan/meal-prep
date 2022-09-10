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
import TakeoutDining from '@mui/icons-material/TakeoutDining';
import { Link } from "react-router-dom";
import RegisterDialog from '../dialogs/RegisterDialog';
import SigninDialog from "../dialogs/SigninDialog";
import { useState } from "react";
import { UserAuth } from '../../Contexts/AuthContext';
import { Alert, Snackbar} from "@mui/material";

const pages = ["Meal Plans", "My Recipes", "Browse"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, logout } = UserAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleUserRegisterClick = () => {
    setRegisterOpen(true);
    setAnchorElUser(null);
  };

  const handleUserSigninClick = () => {
    setSigninOpen(true);
    setAnchorElUser(null);
  };

  const handleUserLogoutClick = async () => {
    setAnchorElUser(null);
    try {
      await logout();
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  }

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackbarOpen(false);
  }

  const handleErrorSnackbar = () => {
    setErrorSnackbarOpen(true);
  }

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorSnackbarOpen(false);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <TakeoutDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Meal Prep
          </Typography>

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
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to={`/${page}`}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <TakeoutDining sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Meal Prep
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{textDecoration: "none", color: "white"}} to={`/${page}`}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* TODO add conditional that adds user avatar if they've uploaded a profile pic */}
                <Avatar alt={(user?.uid) ? (`${user.firstName} ${user.lastName}`) : ""} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {(user?.uid) ? (
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
                <MenuItem key="Account">
                  <Typography textAlign="center">
                    {/* TODO change color to theme regular text color */}
                    <Link style={{textDecoration: "none", color: "black"}} to={`/account`}>
                      Account
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleUserLogoutClick}>
                  <Link style={{textDecoration: "none"}} to={`/`}>
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            ) : (
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
                <MenuItem key="Register" onClick={handleUserRegisterClick}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
                <MenuItem key="Sign-in" onClick={handleUserSigninClick}>
                  <Typography textAlign="center">Sign-in</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
        
        <RegisterDialog 
          open={registerOpen} 
          setRegisterOpen={setRegisterOpen} 
          successSnackbar={handleSuccessSnackbar}
          errorSnackbar={handleErrorSnackbar}
          setErrorMessage={setErrorMessage}
        />
        <SigninDialog 
          open={signinOpen} 
          setSigninOpen={setSigninOpen} 
        />
      </Container>
      <Snackbar 
        autoHideDuration={4000}
        message="You're registered. Welcome to Meal Prep!"
        open={successSnackbarOpen}
        onClose={handleSuccessSnackbarClose}
      >
        {/* // TODO change alert styling */}
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{backgroundColor: "green", color: "white"}}>
          You're registered. Welcome to Meal Prep!
        </Alert>
      </Snackbar>
      <Snackbar 
        autoHideDuration={4000}
        message={`Registration failed. Error: ${errorMessage}`} 
        open={errorSnackbarOpen}
        onClose={handleErrorSnackbarClose}
      >
        {/* // TODO change alert styling */}
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{backgroundColor: "red", color: "white"}}>
        {`Registration failed. Error: ${errorMessage}`} 
        </Alert>
      </Snackbar>
    </AppBar>
  );
};
export default Navbar;