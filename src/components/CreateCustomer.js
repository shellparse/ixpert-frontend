import { TextField, Box, Typography, Divider, FormGroup, Button } from "@mui/material"

import { useState } from "react"
export default function CreateCustomer ({setSnackBarMsg}) {

    const API = process.env.REACT_APP_API_URI
    let [inputs,setInputs] = useState({name: '', email: '', phoneNumber: ''})
    function handleChange(e) {
        let newVal = e.target.value
        let name = e.target.name
        setInputs((values) => ({...values,[name]:newVal}))
    }
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${API}/customer`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response)=>response.json())
        .then(data=>{
            if(data.acknowledged){
                console.log('user created')
                setSnackBarMsg({show: true, message: 'customer created successfully!', severity: 'success'})
        } else if(data.code===11000) {
            console.log('user exists')

            setSnackBarMsg({show: true, message: 'customer already exists!', severity: 'warning'})
        } else {
            console.log('error')
            setSnackBarMsg({show: true, message: 'something went wrong!', severity: 'error'})
        }
        e.target.reset()
        })
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit}>
            <Typography variant={'h4'} >Create customer:</Typography>
            <Divider/>
            <FormGroup sx={{borderRadius: 2, border: '1px solid', borderColor: 'primary.main'}}>
                <TextField sx={{margin:3}} required type={'text'} name={'name'} onChange={handleChange} value={inputs.name} variant='outlined' label={'Name'} />
                <TextField sx={{margin:3}} required type={'email'} name={'email'} onChange={handleChange} value={inputs.email} variant='outlined' label={'E-mail'} />
                <TextField sx={{margin:3}} required type={'tel'} name={'phoneNumber'} onChange={handleChange} value={inputs.phoneNumber} variant='outlined' label={'Phone number'} />
                <Button variant='contained' type={'submit'}>Create</Button>
            </FormGroup>
        </Box>
    )
}