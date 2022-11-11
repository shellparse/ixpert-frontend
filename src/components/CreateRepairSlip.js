import Userfront from '@userfront/react'
import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Divider, FormGroup, TextField, Button, FormControl, FormControlLabel, Checkbox, Input, InputLabel, FormHelperText, FormLabel, Toolbar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomerSelector from './CustomerSelector'
import RepairsToolbar from './RepairsToolbar'

export default function CreateRepairSlip({ setSnackBarMsg }) {
    const [repairsSelection, setRepairsSelection] = useState([])
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
            'frontGlass': false,
            'backGlass': false,
            'network': false,
            'lcd': false,
            'chargingPort': false,
            'wirelessCharging': false,
            'battery': false,
            'fingerPrint': false,
            'faceId': false,
            'speaker': false,
            'microphone': false,
            'screws': false
        },
        neededRepairs: ['glass', 'ass', 'battery'],
        cashier: Userfront.user.name,
        returned: false,
        notes: ''
    })


    const colDef = [
        {
            headerName: 'Needed Repairs',
            field: 'repair',
            flex: 1
        }
    ]
    console.log(inputs.checkInStat)
    const API = process.env.REACT_APP_API_URI
    function handleSubmit(e) {

    }
    function handleChange(e) {
        console.log(e.target.value)
        let target = e.target
        let value = target.value
        let name = target.name
        if (name === "repairItem") {
            return
        } else if (target.type === "checkbox" && name!=='') {
            setInputs((values) => ({ ...values, checkInStat: { ...values.checkInStat, [name]: value === "on" ? true : false } }))
        } else if (name === 'notes') {
            setInputs((values) => ({ ...values, [name]: value }))
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
            <Grid container spacing={2}  >
                <Grid xs={4} item>
                    <TextField sx={{marginBottom: 2}} name='slipNumber' fullWidth size='small' type={'text'} inputProps={{ readOnly: true }} value={inputs.slipNumber} label={'Slip No'} />
                    <FormLabel component="legend" >Phone details:</FormLabel>
                    <TextField sx={{ marginTop: 1 }} name='imei' fullWidth size='small' type={'text'} value={inputs.imei} label={'IMEI number'} />
                    <TextField sx={{ marginTop: 1 }} name='brand' fullWidth size='small' type={'text'} value={inputs.brand} label={'Brand'} />
                    <TextField sx={{ marginTop: 1 }} name='model' fullWidth size='small' type={'text'} value={inputs.model} label={'Model'} />
                    <TextField sx={{ marginTop: 1, backgroundColor: `${inputs.color}` }} name='color' fullWidth size='small' type={'text'} value={inputs.color} label={'Color'} />
                    <TextField sx={{ marginTop: 1 }} name='passcode' fullWidth size='small' type={'text'} value={inputs.passcode} label={'Pass code'} />
                </Grid>
                <Grid xs={4} item>
                    <CustomerSelector />
                    <Box sx={{marginTop: 2}}>
                        <FormLabel component="legend">Phone status:</FormLabel>
                        <Grid container spacing={0}>
                            {Object.keys(inputs.checkInStat).map((state) => {
                                return (
                                    <Grid key={state} item xs={4}>
                                        <FormControlLabel
                                            key={state}
                                            control={
                                                <Checkbox checked={inputs.checkInStat.state} name={state} />
                                            }
                                            label={state}
                                        />
                                    </Grid>
                                )
                            })}
                            <TextField name='notes' label='notes' value={inputs.notes} fullWidth size='small' type='text' />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{ height: '100%' }}>
                        <RepairsToolbar setInputs={setInputs} inputs={inputs} setSnackBarMsg={setSnackBarMsg} repairsSelection={repairsSelection} setRepairsSelection={setRepairsSelection} />
                        <DataGrid
                            rows={inputs.neededRepairs.map(repair => { return { repair: repair } })}
                            columns={colDef}
                            checkboxSelection
                            getRowId={row => row.repair}
                            density={'compact'}
                            hideFooter
                            disableColumnMenu
                            onSelectionModelChange={(newSelection)=>{
                                setRepairsSelection(newSelection)
                            }}
                            selectionModel={repairsSelection}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}