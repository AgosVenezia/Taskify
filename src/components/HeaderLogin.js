import { useState } from 'react';
import { Container, IconButton, Menu, MenuItem, Button, Dialog, DialogContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DialogForm from './DialogForm';
import "./HeaderLogin.css";

function HeaderLogin() {
  const [showDialog, setShowDialog] = useState(false)
  //const user = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="header">
        <Container maxWidth='xl'>
          <nav className="header__navbar">
            <img className="navbar__logo" src="img/logorectangular.png" alt="Logo" />

            {/* Links desktop */}
            <div className="navbar__links">
              <Button className='btn-login' variant='contained' onClick={e => setShowDialog(true)} >Log in</Button>
            </div>

            {/* Menu mobile */}
            <IconButton
              className='navbar__menu-btn'
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'navbar-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>Acerca</MenuItem>
              <MenuItem>Soporte</MenuItem>
              <MenuItem>Descarga</MenuItem>
              <MenuItem>
                <Button
                  className='btn-login'
                  variant='contained'
                  onClick={e => setShowDialog(true)} 
                >
                  Log in
                </Button>
              </MenuItem>
            </Menu>
            
          </nav>
        </Container>
      </div>

      {/* Diálogo de forms para inicio de sesión y registro */}
      <Dialog open={showDialog} onClose={e => setShowDialog(false)}>
        <DialogContent className='bg-gradient'>
          <DialogForm />
        </DialogContent>
      </Dialog>

    </>
  );
}

export default HeaderLogin;
