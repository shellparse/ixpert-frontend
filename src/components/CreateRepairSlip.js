import Userfront from '@userfront/react'
import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Divider, FormGroup, TextField, Button, FormControl, FormControlLabel, Checkbox, Input, InputLabel, FormHelperText, FormLabel, Toolbar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomerSelector from './CustomerSelector'
import RepairsToolbar from './RepairsToolbar'
import { ImageNotSupportedSharp } from '@mui/icons-material'

export default function CreateRepairSlip({ setSnackBarMsg }) {
    const [inputs, setInputs] = useState({
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
            flex: 1
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
                <Grid xs={4} item>
                    <TextField name='slipNumber' fullWidth size='small' type={'text'} inputProps={{ readOnly: true }} value={inputs.slipNumber} label={'Slip No'} />
                </Grid>
                <Grid xs={4} item>
                    <CustomerSelector />
                </Grid>
                <Grid item xs={4}>
                    <FormLabel>Phone details:</FormLabel>
                    <TextField sx={{ marginTop: 1 }} name='imei' fullWidth size='small' type={'text'} value={inputs.imei} label={'IMEI number'} />
                    <TextField sx={{ marginTop: 1 }} name='brand' fullWidth size='small' type={'text'} value={inputs.brand} label={'Brand'} />
                    <TextField sx={{ marginTop: 1 }} name='model' fullWidth size='small' type={'text'} value={inputs.model} label={'Model'} />
                    <TextField sx={{ marginTop: 1, backgroundColor: `${inputs.color}` }} name='color' fullWidth size='small' type={'text'} value={inputs.color} label={'Color'} />
                    <TextField sx={{ marginTop: 1 }} name='passcode' fullWidth size='small' type={'text'} value={inputs.passcode} label={'Pass code'} />
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Phone Status</FormLabel>
                            <FormGroup>
                                {Object.keys(inputs.checkInStat).map((state) => {
                                    console.log(inputs.checkInStat)
                                    return (
                                        <FormControlLabel
                                            key={state}
                                            control={
                                                <Checkbox checked={inputs.checkInStat.state} name={state} />
                                            }
                                            label={state}
                                        />
                                    )
                                })}
                                {/* {() => {
                                    const formControls = []
                                    for (const state in inputs.checkInStat) {
                                        formControls.push(
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={inputs.checkInStat[state]} name={state} />
                                                }
                                                label={state}
                                            />
                                        )
                                    }
                                    return formControls
                                }} */}
                            </FormGroup>
                            {/* <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                        <FormControl
                            required
                            error={error}
                            component="fieldset"
                            sx={{ m: 3 }}
                            variant="standard"
                        >
                            <FormLabel component="legend">Pick two</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                    }
                                    label="Gilad Gray"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                    }
                                    label="Jason Killian"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                                    }
                                    label="Antoine Llorca"
                                />
                            </FormGroup>
                            <FormHelperText>You can display an error</FormHelperText> */}
                        </FormControl>
                    </Box>
                </Grid>
                <Grid xs={4} item>
                    <Box sx={{ height: '100%' }}>
                        <RepairsToolbar setInputs={setInputs} />
                        <DataGrid
                            rows={inputs.neededRepairs.map(repair => { return { repair: repair } })}
                            columns={colDef}
                            checkboxSelection
                            getRowId={row => row.repair}
                            density={'compact'}
                            hideFooter
                            disableColumnMenu
                        />
                    </Box>
                </Grid>
            </Grid>

            <Button variant='contained' type={'submit'}>Create</Button>
        </Box>
    )
}