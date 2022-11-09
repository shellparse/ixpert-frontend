import Userfront from '@userfront/react'
import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Divider, FormGroup, TextField, Button, FormControl, Input, InputLabel, FormHelperText, FormLabel} from '@mui/material'
import CustomerSelector from './CustomerSelector'

export default function CreateRepairSlip ({setSnackBarMsg}) {
    let [inputs,setInputs] = useState({
        slipNumber: '',
        checkInStat:{
            'frontCamera': false,
            'backCamera': false,
            'backGlass': false,
            'frontGlass': false,
            'lcd': false,
            'network': false,
            'chargingPort': false,
            'battery': false,
            'wirelessCharging': false,
            'fingerPrint': false,
            'faceId': false,
            'speaker': false,
            'microphone': false,
            'screws': false
        },
        neededRepairs: [],
        cashier: Userfront.user.name,
        returned: false,
    })
    const API = process.env.REACT_APP_API_URI
    function handleSubmit (e) {

    }
    function handleChange (e) {

    }
    useEffect(()=>{
        fetch(`${API}/slipnumber`).then(response=>response.json())
        .then((data)=>{
            if (data && data.lastSlip) {
                setInputs((oldVal)=>{return{...oldVal, slipNumber: data.lastSlip+1}})
            } else {
                setInputs((oldVal)=>{return{...oldVal, slipNumber: 1}})
            }
        },[API])
    },[])

    return (
        <Box sx={{padding: 2}} component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
            <Typography variant={'h4'} >Create repair slip</Typography>
            <Divider sx={{margin: 2}}/>
            <Grid container>
                <Grid xs={6} item>
                <TextField fullWidth size='small' type={'text'} inputProps={{readOnly: true}} value={inputs.slipNumber} label={'Slip No'}></TextField>
                </Grid>
                <Grid xs={6} item>
                    <CustomerSelector/>
                </Grid>
            </Grid>

            {/* <Button variant='contained' type={'submit'}>Create</Button> */}
        </Box>
    )
}