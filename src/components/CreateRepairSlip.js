import Userfront from '@userfront/react'
import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Divider, FormGroup, TextField, Button, FormControl, Input, InputLabel, FormHelperText, FormLabel, Toolbar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomerSelector from './CustomerSelector'

function RepairsToolbar(props) {
    const [value, setValue] = useState('')
    return (
        <Toolbar>
            <TextField onChange={(e) => setValue(e.target.value)} value={value} label={'Add Repairs'}></TextField>
            <Button onClick={() => { props.setInputs((oldVal)=>{return {...oldVal, neededRepairs: [...oldVal.neededRepairs, value]}}) }}>
                Add
            </Button>
        </Toolbar>
    )
}


export default function CreateRepairSlip({ setSnackBarMsg }) {
    let [inputs, setInputs] = useState({
        slipNumber: '',
        imei: '',
        brand: '',
        color: '',
        passcode: '',
        model: '',
        checkInStat: {
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
        neededRepairs: ['glass', 'ass', 'battery'],
        cashier: Userfront.user.name,
        returned: false,
    })


    const colDef = [
        {
            headerName: 'Needed Repairs',
            field: 'repair',
        }
    ]

    const API = process.env.REACT_APP_API_URI
    function handleSubmit(e) {

    }
    function handleChange(e) {
        let target = e.target
        let value = target.value
        let name = target.name
        if (name === "repairItem") {
            return
        } else if (target.type === "checkbox") {
            setInputs((values) => ({ ...values, checkInStat: { ...values.checkInStat, [name]: value === "on" ? true : false } }))
        } else if (name === 'notes') {
            setInputs((values) => ({ ...values, checkInStat: { ...values.checkInStat, [name]: value } }))
        } else {
            if (name === "total") value = parseFloat(value)
            setInputs((values) => ({ ...values, [name]: value }))
        }
    }
    useEffect(() => {
        fetch(`${API}/slipnumber`).then(response => response.json())
            .then((data) => {
                if (data && data.lastSlip) {
                    setInputs((oldVal) => { return { ...oldVal, slipNumber: data.lastSlip + 1 } })
                } else {
                    setInputs((oldVal) => { return { ...oldVal, slipNumber: 1 } })
                }
            }, [API])
    }, [])

    return (
        <Box sx={{ padding: 2 }} component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
            <Typography variant={'h4'} >Create repair slip</Typography>
            <Divider sx={{ margin: 2 }} />
            <Grid container spacing={2} >
                <Grid xs={6} item>
                    <TextField name='slipNumber' fullWidth size='small' type={'text'} inputProps={{ readOnly: true }} value={inputs.slipNumber} label={'Slip No'} />
                </Grid>
                <Grid xs={6} item>
                    <CustomerSelector />
                </Grid>
                <Grid item xs={6}>
                    <FormLabel>Phone details:</FormLabel>
                    <TextField sx={{ marginTop: 1 }} name='imei' fullWidth size='small' type={'text'} value={inputs.imei} label={'IMEI number'} />
                    <TextField sx={{ marginTop: 1 }} name='brand' fullWidth size='small' type={'text'} value={inputs.brand} label={'Brand'} />
                    <TextField sx={{ marginTop: 1 }} name='model' fullWidth size='small' type={'text'} value={inputs.model} label={'Model'} />
                    <TextField sx={{ marginTop: 1, backgroundColor: `${inputs.color}` }} name='color' fullWidth size='small' type={'text'} value={inputs.color} label={'Color'} />
                    <TextField sx={{ marginTop: 1 }} name='passcode' fullWidth size='small' type={'text'} value={inputs.passcode} label={'Pass code'} />
                </Grid>
                <Grid xs={6} item>
                    <DataGrid
                        rows={inputs.neededRepairs.map(repair => { return { repair: repair } })}
                        columns={colDef}
                        checkboxSelection
                        getRowId={row => row.repair}
                        density={'compact'}
                        hideFooter
                        disableColumnMenu
                        autoHeight
                        components={{ Toolbar: RepairsToolbar(setInputs)}}
                    />
                </Grid>
            </Grid>

            {/* <Button variant='contained' type={'submit'}>Create</Button> */}
        </Box>
    )
}