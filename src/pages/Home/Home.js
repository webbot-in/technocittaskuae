import { Button, Card, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { tokenVerify } from '../../utils/TokenVerify';
import { jwtDecode } from 'jwt-decode';

function Home() {
    const navigate = useNavigate()
    const decodedToken =  localStorage.getItem('token') && jwtDecode(localStorage.getItem("token"));
    const docodedData = {
        email: localStorage.getItem('token') && decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        name: localStorage.getItem('token') && decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        role: localStorage.getItem('token') && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }
    const { name, role, email } = docodedData ? docodedData : false;
    console.log(name)
    const logoutFn = () => {
        navigate('/')
        localStorage.removeItem('token')
    }

    useEffect(() => {
        const isValidToken = tokenVerify()
        console.log(isValidToken)
        if (!isValidToken) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
                <Card sx={{ borderRadius: '10px' }}>
                    <Stack gap={2} alignItems={'center'} justifyContent={'center'} sx={{ mx: 2, mb: 2, width: { xs: 'initial', md: 300 } }}>
                        <h1>Details</h1>
                        <Typography>{`Name : ${name}`}</Typography>
                        <Typography>{`Email : ${email}`}</Typography>
                        <Typography>{`Role : ${role}`}</Typography>
                        <Button variant='contained' fullWidth onClick={logoutFn} sx={{ bgcolor: 'black', ":hover": { bgcolor: 'black' } }}>Logout</Button>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default Home