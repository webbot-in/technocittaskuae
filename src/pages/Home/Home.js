import { Button, Card, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const logoutFn = () => {
    navigate('/')
    localStorage.removeItem('token')
    }
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
                <Card sx={{ borderRadius: '10px' }}>
                    <Stack gap={2} alignItems={'center'} justifyContent={'center'} sx={{ mx: 2, mb: 2, width: { xs: 'initial', md: 300 } }}>
                        <h1>Details</h1>
                        
                        <Button variant='contained' fullWidth onClick={logoutFn} sx={{ bgcolor: 'black', ":hover": { bgcolor: 'black' } }}>Logout</Button>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default Home