import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

function Login() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
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
            enqueueSnackbar('Login Success', { variant: 'success', preventDuplicate: true });
        }
    }

    const signUpFn = () => {
        navigate('/signup')
    }

    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100vh' }}>
                <Card sx={{ borderRadius: '10px' }}>
                    <Stack gap={2} alignItems={'center'} justifyContent={'center'} sx={{ mx: 2, mb: 2, width: { xs: 'initial', md: 300, height: 300 } }}>
                        <h1>Login</h1>
                        {textFieldList.map((items, index) => (
                            <TextField key={index} fullWidth placeholder={items.placeHolder} size='small' value={items.value} error={items.error} helperText={items.helperTxt} onChange={items.onChangeFn} />
                        ))}
                        <Button variant='contained' fullWidth onClick={loginFn} sx={{ bgcolor: 'black', ":hover": { bgcolor: 'black' } }}>Login</Button>
                        <Typography onClick={signUpFn} sx={{ textDecoration: 'underline', cursor: 'pointer', "::selection": { userSelect: 'none' } }}>Signup</Typography>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default Login