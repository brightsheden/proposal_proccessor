import React from 'react'
import { Box, AppBar, Container, Toolbar, Button, Typography, Menu, MenuItem, Modal } from '@mui/material'
//import { Navbar,Nav,Container,NavDropdown} from "react-bootstrap";
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AlgoSigner from './utils'
import { useUserContext } from '../overview/Account'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));



const Navbar = () => {   
    const { users, addUsers, addselectedUser, selectedUser } = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [modalOpen, setModalOpen] = React.useState(false);
    const modalHandleOpen = () => {
      setModalOpen(true);
    };
    const modalHandleClose = () => {
      setModalOpen(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelected = (index) => {
      addselectedUser(users[index])
      handleClose();
    }
    const addWallet = async (e) => {
      if (typeof AlgoSigner !== "undefined"){
        const algoUsers = await AlgoSigner.connect().then(() => AlgoSigner.users({
            ledger: 'TestNet'
        }));
        addselectedUser(algoUsers[0])
        addUsers(algoUsers);
      }
      else {
        modalHandleOpen()
      }
    }

    return (
      <>
      





        <AppBar>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography component="h4">snapshot</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {users.length > 0 ?
                        users.length > 1 ?
                            <>
                                <Button
                                    id="users-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    color="secondary" 
                                    variant="outlined"
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        {selectedUser.address.slice(0,7)}...{selectedUser.address.slice(-4)}
                                </Button>
                                <StyledMenu id="users-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'users-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    >
                                      {users.map((user, index) => (
                                        <MenuItem key={index} onClick={() => handleSelected(index)}>
                                            {users[index].address.slice(0,7)}...{users[1].address.slice(-4)}
                                        </MenuItem>
                                      ))}

                                </StyledMenu>
                            </>
                        :
                            <Button color="secondary" variant="outlined">{selectedUser.address.slice(0,7)}...{selectedUser.address.slice(-4)}</Button>
                        
                    :
                        <Button color="secondary" variant="outlined" onClick={() => addWallet()}>Connect Wallet</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
        <Modal open={modalOpen} onClose={modalHandleClose}>
          <Box sx={style}>
            <Typography variant="h6">AlgoSigner Not Installed</Typography>
            <Typography sx={{ mt: 2 }}>You don't have Algosigner installed! You can get it from <a target="_blank" rel="noreferrer" href="https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm">Chrome Web Store</a>.</Typography>
          </Box>
        </Modal>
      </>
    )
}

export default Navbar;