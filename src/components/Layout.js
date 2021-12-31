import React from 'react';
import { Box, CssBaseline, Alert, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
//import { Outlet } from 'react-router-dom';
//import { Outlet } from "react-router-dom";
import outlet from 'react-router-dom'

import Navbar from './Navbar';
import { useUserContext } from '../overview/Account'

const Main = styled('main')(({theme}) => ({
    width: '100%',
    marginTop: '100px'
}))

const Index = () => {
    const { selectedUser } = useUserContext();
    return (
        <Box>
            <CssBaseline />
            <Navbar />
            <Main>
                <Container maxWidth="lg">
                    {selectedUser.address === undefined && <Alert severity="error" sx={{ mb : 2 }}>You are not connected to any wallet. Please click on the "Connect Wallet" button on the navbar.</Alert>}
                    <outlet/>
                </Container>
            </Main>
        </Box>
    )
}

export default Index