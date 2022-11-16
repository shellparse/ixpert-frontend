import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Divider, TextField, FormControlLabel, Checkbox, FormLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomerSelector from './CustomerSelector'
import RepairsToolbar from './RepairsToolbar'
import { useOutletContext } from 'react-router-dom'
import Footer from './dashComponents/Footer'
import Userfront from '@userfront/react'
export default function CreateRepairSlip() {
    const API = process.env.REACT_APP_API_URI
    const [repairsSelection, setRepairsSelection] = useState([])
    const { setSnackBarMsg } = useOutletContext()
    const [repairSlip, setRepairSlip] = useState({
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
        neededRepairs: [],
        cashier: Userfront.user.name,
        returned: false,
        notes: ''
    })
    useEffect(() => {
        fetch(`${API}/slipnumber`).then(response => response.json())
            .then((data) => {
                if (data && data.lastSlip) {
                    setRepairSlip((oldVal) => { return { ...oldVal, slipNumber: data.lastSlip + 1 } })
                } else {
                    setRepairSlip((oldVal) => { return { ...oldVal, slipNumber: 1 } })
                }
            })
    }, [API, setRepairSlip])
    
    const colDef = [
        {
            headerName: 'Needed Repairs',
            field: 'repair',
            flex: 2
        }, {
            headerName: 'Price',
            field: 'price',
            flex: 1
        }
    ]
    function handleSubmit(e) {

    }
    function handleChange(e) {
        let target = e.target
        let value = target.value
        let name = target.name
        if (name === "repairItem") {
            return
        } else if (target.type === "checkbox" && name !== '') {
            setRepairSlip((values) => ({ ...values, checkInStat: { ...values.checkInStat, [name]: value === "on" ? true : false } }))
        } else if (name === 'notes') {
            setRepairSlip((values) => ({ ...values, [name]: value }))
        } else {
            if (name === "total") value = parseFloat(value)
            setRepairSlip((values) => ({ ...values, [name]: value }))
        }
    }

    return (
        <Box sx={{ padding: 2 }} component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
            <Typography variant={'h4'} >Create repair slip</Typography>
            <Divider sx={{ margin: 2 }} />
            <Grid container spacing={2}  >
                <Grid xs={2} item>
                    <TextField sx={{ marginBottom: 2 }} name='slipNumber' fullWidth size='small' type={'text'} inputProps={{ readOnly: true }} value={repairSlip.slipNumber} label={'Slip No'} />
                    <FormLabel component="legend" >Phone details:</FormLabel>
                    <TextField sx={{ marginTop: 1 }} name='imei' fullWidth size='small' type={'text'} value={repairSlip.imei} label={'IMEI number'} />
                    <TextField sx={{ marginTop: 1 }} name='brand' fullWidth size='small' type={'text'} value={repairSlip.brand} label={'Brand'} />
                    <TextField sx={{ marginTop: 1 }} name='model' fullWidth size='small' type={'text'} value={repairSlip.model} label={'Model'} />
                    <TextField sx={{ marginTop: 1, backgroundColor: `${repairSlip.color}` }} name='color' fullWidth size='small' type={'text'} value={repairSlip.color} label={'Color'} />
                    <TextField sx={{ marginTop: 1 }} name='passcode' fullWidth size='small' type={'text'} value={repairSlip.passcode} label={'Pass code'} />
                </Grid>
                <Grid xs={5} item>
                    <CustomerSelector invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} />
                    <Box sx={{ marginTop: 2 }}>
                        <FormLabel component="legend">Phone status:</FormLabel>
                        <Grid container spacing={0}>
                            {Object.keys(repairSlip.checkInStat).map((state) => {
                                return (
                                    <Grid key={state} item xs={4}>
                                        <FormControlLabel
                                            key={state}
                                            control={
                                                <Checkbox checked={repairSlip.checkInStat.state} name={state} />
                                            }

                                            label={state.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                                        />
                                    </Grid>
                                )
                            })}
                            <TextField name='notes' label='notes' value={repairSlip.notes} fullWidth size='small' type='text' />
                        </Grid>
                    </Box>
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }} item xs={5}>
                    <RepairsToolbar setRepairSlip={setRepairSlip} repairSlip={repairSlip} setSnackBarMsg={setSnackBarMsg} repairsSelection={repairsSelection} setRepairsSelection={setRepairsSelection} />
                    <DataGrid
                        rows={repairSlip.neededRepairs}
                        columns={colDef}
                        checkboxSelection
                        getRowId={row => row.repair}
                        density={'compact'}
                        hideFooter
                        disableColumnMenu
                        onSelectionModelChange={(newSelection) => {
                            setRepairsSelection(newSelection)
                        }}
                        selectionModel={repairsSelection}
                    />
                </Grid>
            </Grid>
            <Footer setSnackBarMsg={setSnackBarMsg} repairSlip={repairSlip} setRepairSlip={setRepairSlip} total={total} customerDetails={customerDetails} />
        </Box>
    )
}