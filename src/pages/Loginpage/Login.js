import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState()
    const [textFieldValue, setTextFieldValue] = useState({
        email: '',
        password: '',
        emailErr: false,
        passwordErr: false,
        emailErrMessage: '',
        passwordErrMessage: ''
    })
    const textFieldList = [{
        placeHolder: 'Enter Your Email ID',
        value: textFieldValue.email,
        error: textFieldValue.emailErr,
        helperTxt: textFieldValue.emailErrMessage,
        onChangeFn: (e) => {
            setTextFieldValue((prevData) => ({
                ...prevData,
                email: e.target.value,
                emailErrMessage: '',
                emailErr: false
            }))
        }
    }, {
        placeHolder: 'Enter Your Password',
        value: textFieldValue.password,
        error: textFieldValue.passwordErr,
        helperTxt: textFieldValue.passwordErrMessage,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            password: e.target.value,
            passwordErrMessage: '',
            passwordErr: false
        }))
    }]

    const loginFn = () => {
        if (textFieldValue.email === '') {
            setTextFieldValue((prevData) => ({
                ...prevData,
                emailErr: true,
                emailErrMessage: 'Please enter your emailID'
            }))
        }
        else if (textFieldValue.password === '') {
            setTextFieldValue((prevData) => ({
                ...prevData,
                passwordErr: true,
                passwordErrMessage: 'Please enter your password'
            }))
        }
        else {
            setLoading(true)
            axios.post('https://cors-h8hq.onrender.com/http://31.220.82.50:202/api/Auth/Authentication', textFieldValue).then((res) => {
                navigate('/home', { state: res.data })
                localStorage.setItem('token', res.data.token)
                enqueueSnackbar('Login Success', { variant: 'success', preventDuplicate: true });
            }).catch((err) => {
                if (err.response.status === 404) {
                    enqueueSnackbar(err.response.data, { variant: 'error', preventDuplicate: true });
                }
                else {
                    enqueueSnackbar('Try again later', { variant: 'error', preventDuplicate: true });
                }
                setLoading(false)
            })
        }
    }

    const signUpFn = () => {
        navigate('/signup')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [])

    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
                <Card sx={{ borderRadius: '10px' }}>
                    <Stack gap={2} alignItems={'center'} justifyContent={'center'} sx={{ mx: 2, mb: 2, width: { xs: 'initial', md: 300, height: 300 } }}>
                        <h1>Login</h1>
                        {textFieldList.map((items, index) => (
                            <TextField key={index} fullWidth placeholder={items.placeHolder} size='small' value={items.value} error={items.error} helperText={items.helperTxt} onChange={items.onChangeFn} />
                        ))}
                        <Button variant='contained' disabled={loading} fullWidth onClick={loginFn} sx={{ bgcolor: loading ? 'white' : 'black', ":hover": { bgcolor: loading ? 'white' : 'black' } }}>{loading ? 'Logging in...' : 'Login'}</Button>
                        <Typography onClick={signUpFn} sx={{ textDecoration: 'underline', cursor: 'pointer', "::selection": { userSelect: 'none' } }}>Signup</Typography>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default Login