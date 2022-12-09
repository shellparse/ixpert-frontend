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
        passCode: '',
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
        notes: '',
        customerDetails: { name: '', phoneNumber: '', email: '' },
        total:0
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
        e.preventDefault()
        if(repairSlip.slipNumber&&repairSlip.customerId){
        fetch(`${process.env.REACT_APP_API_URI}/slip`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(repairSlip)
        }).then((response)=>{
            if(response.headers.has('Content-Type')){
                return null
            }else{
                return response.blob()
            }
        })
        .then((blob)=>{
            if(blob){
                blob = blob.slice(0, blob.size, "application/pdf")
                let blobURL = URL.createObjectURL(blob)
                setTimeout(()=>{
                    window.open(blobURL)
                },1500)
                console.log(e)
                e.target.reset()
                setSnackBarMsg({show: true, message: 'Invoice Created', severity: 'success'})
            }
        })
    } else if (!repairSlip.customerId){
        setSnackBarMsg({show: true, severity: 'error', message: 'customer not selected'})
    } else {
        setSnackBarMsg({show: true, severity:'error', message: 'database error'})
    }
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
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'yellowgreen' }}>
            <Box sx={{ height: '100%', backgroundColor: 'pink', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start' }} component={'form'} onSubmit={handleSubmit} >
                    <Typography variant={'h4'} >Create repair slip
                    <Divider sx={{ marginBottom: 2 }} />
                    </Typography>
                    <Grid container spacing={2}  >
                        <Grid xs={2} item>
                            <TextField sx={{ marginBottom: 2 }} name='slipNumber' fullWidth size='small' type={'text'} inputProps={{ readOnly: true }} value={repairSlip.slipNumber} label={'Slip No'} />
                            <FormLabel component="legend" >Phone details:</FormLabel>
                            <TextField required sx={{ marginTop: 1 }} name='imei' fullWidth size='small' type={'text'} value={repairSlip.imei} label={'IMEI number'} onChange={handleChange} />
                            <TextField required sx={{ marginTop: 1 }} name='brand' fullWidth size='small' type={'text'} value={repairSlip.brand} label={'Brand'} onChange={handleChange} />
                            <TextField required sx={{ marginTop: 1 }} name='model' fullWidth size='small' type={'text'} value={repairSlip.model} label={'Model'} onChange={handleChange} />
                            <TextField required sx={{ marginTop: 1, backgroundColor: `${repairSlip.color}` }} name='color' fullWidth size='small' type={'text'} onChange={handleChange} value={repairSlip.color} label={'Color'} />
                            <TextField required sx={{ marginTop: 1 }} name='passCode' fullWidth size='small' type={'text'} value={repairSlip.passcode} label={'Pass code'} onChange={handleChange} />
                        </Grid>
                        <Grid xs={5} item>
                            <CustomerSelector setInputs={setRepairSlip} />
                            <Box sx={{ marginTop: 2 }}>
                                <FormLabel component="legend">Phone status:</FormLabel>
                                <Grid container spacing={0}>
                                    {Object.keys(repairSlip.checkInStat).map((state) => {
                                        return (
                                            <Grid key={state} item xs={4}>
                                                <FormControlLabel
                                                    key={state}
                                                    control={
                                                        <Checkbox onChange={handleChange} checked={repairSlip.checkInStat.state} name={state} />
                                                    }

                                                    label={state.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                                                />
                                            </Grid>
                                        )
                                    })}
                                    <TextField onChange={handleChange} name='notes' label='notes' value={repairSlip.notes} fullWidth size='small' type='text' />
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
                <Footer customerDetails={repairSlip.customerDetails} total={repairSlip.total} items={repairSlip.neededRepairs} />
            </Box>
        </Box>
    )
}