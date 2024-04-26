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
        sportID: "",
        machineId: "",
        yearsOfExp: ""
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
            sportID: e.target.value,
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
            yearsOfExp: e.target.value,
        }))
    }]

    const validateAndEnqueueSnackbar = (field, message) => {
        const currentDate = dayjs();
        const format = 'DD/MM/YYYY';
        if (!field || (message === 'Please enter a valid date of birth' && dayjs(textFieldValue.dob, format).isAfter(dayjs(currentDate, format)))) {
            enqueueSnackbar(message, { variant: 'error', preventDuplicate: true });
            return false;
        }
        return true;
    };

    const signUpFn = () => {
        if (
            !validateAndEnqueueSnackbar(textFieldValue.name, 'Please enter your name') ||
            !validateAndEnqueueSnackbar(textFieldValue.email, 'Please enter your email ID') ||
            !validateAndEnqueueSnackbar(textFieldValue.password, 'Please enter your password') ||
            !validateAndEnqueueSnackbar(textFieldValue.role, 'Please enter your role') ||
            !validateAndEnqueueSnackbar(textFieldValue.mobile, 'Please enter your mobile') ||
            !validateAndEnqueueSnackbar(
                textFieldValue.dob,
                'Please enter a valid date of birth'
            ) ||
            !validateAndEnqueueSnackbar(textFieldValue.sportID, 'Please enter your sportID') ||
            !validateAndEnqueueSnackbar(textFieldValue.machineId, 'Please enter your machineId') ||
            !validateAndEnqueueSnackbar(textFieldValue.yearsOfExp, 'Please enter your yearsOfExp')
        ) {
            setLoading(false);
        }
        else {
            setLoading(true)
            textFieldValue.sportID = parseInt(textFieldValue.sportID);
            textFieldValue.yearsOfExp = parseInt(textFieldValue.yearsOfExp);
            axios.post('https://cors-h8hq.onrender.com/http://31.220.82.50:202/api/Auth/Register', textFieldValue).then((res) => {
                navigate('/home')
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
                                    onKeyPress={(e) => e.key === 'Enter' && signUpFn()}
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
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
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