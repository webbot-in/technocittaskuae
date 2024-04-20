import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const [textFieldValue, setTextFieldValue] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        mobile: "",
        dob: "",
        sportID: 0,
        machineId: "",
        yearsOfExp: 0
    })

    const textFieldList = [{
        placeHolder: 'Enter Your Name',
        value: textFieldValue.name,
        onChangeFn: (e) => {
            setTextFieldValue((prevData) => ({
                ...prevData,
                name: e.target.value,
            }))
        }
    }, {
        placeHolder: 'Enter Your Email ID',
        value: textFieldValue.email,
        onChangeFn: (e) => {
            setTextFieldValue((prevData) => ({
                ...prevData,
                email: e.target.value,
            }))
        }
    }, {
        placeHolder: 'Enter Your Password',
        value: textFieldValue.password,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            password: e.target.value,
        }))
    }, {
        placeHolder: 'Enter Your role',
        value: textFieldValue.role,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            role: e.target.value,
        }))
    }, {
        placeHolder: 'Enter Your mobile',
        value: textFieldValue.mobile,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            mobile: e.target.value,
        }))
    }, {
        placeHolder: 'Enter Your dob',
        value: textFieldValue.dob,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            dob: e,
        }))
    }, {
        placeHolder: 'Enter Your sportID',
        value: textFieldValue.sportID,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            sportID: parseFloat(e.target.value),
        }))
    }, {
        placeHolder: 'Enter Your machineId',
        value: textFieldValue.machineId,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            machineId: e.target.value,
        }))
    }, {
        placeHolder: 'Enter Your yearsOfExp',
        value: textFieldValue.yearsOfExp,
        onChangeFn: (e) => setTextFieldValue((prevData) => ({
            ...prevData,
            yearsOfExp: parseFloat(e.target.value),
        }))
    }]

    const signUpFn = () => {
        const currentDate = dayjs();
        const format = 'DD/MM/YYYY';
        if (textFieldValue.name === '') {
            enqueueSnackbar('Please enter your name', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.email === '') {
            enqueueSnackbar('Please enter your email ID', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.password === '') {
            enqueueSnackbar('Please enter your password', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.role === '') {
            enqueueSnackbar('Please enter your role', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.mobile === '') {
            enqueueSnackbar('Please enter your mobile', { variant: 'error', preventDuplicate: true });
        }
        else if (dayjs(textFieldValue.dob, format).isAfter(dayjs(currentDate, format))) {
            enqueueSnackbar('Please enter Valid dateofbirth', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.sportID === 0) {
            enqueueSnackbar('Please enter your sportID', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.machineId === '') {
            enqueueSnackbar('Please enter your machineId', { variant: 'error', preventDuplicate: true });
        }
        else if (textFieldValue.yearsOfExp === 0) {
            enqueueSnackbar('Please enter your yearsOfExp', { variant: 'error', preventDuplicate: true });
        }
        else {
            setLoading(true)
            axios.post('https://cors-h8hq.onrender.com/http://31.220.82.50:202/api/Auth/Register', textFieldValue).then((res) => {
                console.log(res)
                navigate('/home', { state: res.data })
                localStorage.setItem('token', res.data.token)
            }).catch((err) => {
                if (err.response.status === 500) {
                    enqueueSnackbar('EmailID already register or invalid DOB', { variant: 'error', preventDuplicate: true });
                }
                else if (err.response.status === 400) {
                    enqueueSnackbar(err.response.data.errors.Email[0], { variant: 'error', preventDuplicate: true });
                }
                else {
                    enqueueSnackbar('Try again later', { variant: 'error', preventDuplicate: true });
                }
                console.log(err)
                setLoading(false)
            })
        }
    }

    const loginFn = () => {
        navigate('/')
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
                    <Stack gap={2} alignItems={'center'} justifyContent={'center'} sx={{ mx: 2, mb: 2, width: { xs: 'initial', md: 500 } }}>
                        <h1>Signup</h1>
                        {textFieldList.map((items, index) => (
                            index !== 5 ?
                                <TextField
                                    type={index === 4 || index === 6 || index === 8 ? 'number' : 'text'}
                                    onInput={
                                        index === 4 || index === 6 || index === 8
                                            ?
                                            (e) => (e.target.value = e.target.value.slice(0, 10))
                                            :
                                            (e) => e.target.value
                                    }
                                    autoFocus={index === 0}
                                    fullWidth
                                    placeholder={items.placeHolder}
                                    size='small'
                                    onChange={items.onChangeFn}
                                    sx={{
                                        "& .MuiOutlinedInput-input": {
                                            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                                                "-webkit-appearance": "none",
                                            },
                                        },
                                    }}
                                />
                                :
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        value={dayjs(items.value)}
                                        onChange={items.onChangeFn}
                                        disableFuture
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                error: false,
                                                fullWidth: true
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                        ))}
                        <Button variant='contained' disabled={loading} fullWidth onClick={signUpFn} sx={{ bgcolor: loading ? 'white' : 'black', ":hover": { bgcolor: loading ? 'white' : 'black' } }}>{loading ? 'Signing up...' : 'Signup'}</Button>
                        <Typography onClick={loginFn} sx={{ textDecoration: 'underline', cursor: 'pointer', "::selection": { userSelect: 'none' } }}>Login</Typography>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default Signup