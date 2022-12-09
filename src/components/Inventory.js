import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import InventoryTable from "./InventoryTable"
import { Box, Divider, Typography, FormGroup, TextField, Button } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from './TabPanel'
export default function Inventory() {
    const [visibleTab, setVisibleTab] = useState(0)
    const defaultValues = {
        sku: '',
        name: '',
        price: 0,
        quantity: 0,
        color: '',
        description: '',
        brand: '',
        model: '',
        imei: '',
        ram: '',
        storage: '',
        category: ''
    }
    const [inputs, setInputs] = useState(defaultValues)
    const { snackBarMsg, setSnackBarMsg } = useOutletContext()
    function handleTabChange(event, newVal) {
        setVisibleTab(newVal)
    }
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URI}/inventory`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    setSnackBarMsg((oldVal) => ({ ...oldVal, severity: 'success', message: 'Item added', show: true }))
                    setInputs(defaultValues)
                } else if (data.code === 11000) {
                    setSnackBarMsg(oldVal => ({ ...oldVal, show: true, severity: 'warning', message: 'Duplicate item' }))
                } else {
                    setSnackBarMsg(oldVal => ({ ...oldVal, show: true, severity: 'error', message: 'Something went wrong' }))
                }
            })
    }

    function handleChange(e) {
        let target = e.target
        let name = target.name
        let value = target.value
        if (e.target.type === "number") value = parseFloat(Math.abs(value))
        setInputs((values) => ({ ...values, [name]: value }))
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={visibleTab} onChange={handleTabChange}>
                    <Tab label={'Create stock item'} id={0}></Tab>
                    <Tab label={'Browse stock items'} id={1}></Tab>
                </Tabs>
            </Box>
            <TabPanel value={visibleTab} index={0}>
                <Box component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
                    <Typography variant={'h4'} >Create stock Item</Typography>
                    <Divider />
                    <FormGroup sx={{ borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}>
                        <Box>
                            <TextField sx={{ margin: 2 }} size='small' required type={'text'} name={'sku'} value={inputs.sku} variant='outlined' label={'SKU'} />
                            <TextField sx={{ margin: 2 }} size='small' required type={'text'} name={'name'} value={inputs.name} variant='outlined' label={'Name'} />
                            <TextField sx={{ margin: 2 }} size='small' required type={'number'} step='1' name={'price'} value={inputs.price} variant='outlined' label={'Price'} />
                            <TextField sx={{ margin: 2 }} size='small' required type={'number'} step='1' name={'quantity'} value={inputs.quantity} variant='outlined' label={'Quantity'} />
                            <TextField sx={{ margin: 2, backgroundColor: inputs.color }} size='small' required type={'text'} name={'color'} value={inputs.color} variant='outlined' label={'Color'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'description'} value={inputs.description} variant='outlined' label={'Description'} />
                        </Box>
                        <Box>
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'brand'} value={inputs.brand} variant='outlined' label={'Brand'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'model'} value={inputs.model} variant='outlined' label={'Model'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'imei'} value={inputs.imei} variant='outlined' label={'IMEI'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'ram'} value={inputs.ram} variant='outlined' label={'Ram'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'storage'} value={inputs.storage} variant='outlined' label={'Storage'} />
                            <TextField sx={{ margin: 2 }} size='small' type={'text'} name={'category'} value={inputs.category} variant='outlined' label={'Category'} />
                        </Box>
                        <Button variant='contained' type={'submit'}>Add</Button>
                    </FormGroup>
                </Box>
            </TabPanel>
            <TabPanel value={visibleTab} index={1}>
                <Box sx={{ backgroundColor:'green', height: 'calc(100% - 75px)', display: 'flex', flexDirection: 'column'}}>
                <Typography variant={'h4'} >Browse Stock</Typography>
                    <Divider />
                <InventoryTable data={visibleTab} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
                </Box>
            </TabPanel>
        </Box>
    )
}