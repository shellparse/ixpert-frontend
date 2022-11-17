
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
export default function RepairsToolbar({repairSlip, setRepairSlip, setSnackBarMsg, repairsSelection}) {
    const [repairValue, setRepairValue] = useState({ repair: '', price: 0 })
    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setRepairValue(oldVal => ({ ...oldVal, [name]: name==='price'?parseFloat(value):value }))
    }

    function handleSubmit() {
        if (repairSlip.neededRepairs.some(e => e.repair === repairValue.repair)) {
            setSnackBarMsg({ show: true, message: 'duplicate repair item', severity: 'warning' })
        } else if (repairValue.repair.length > 0) {
            setRepairSlip((oldVal) => {
                const newRepairs = [...oldVal.neededRepairs, { ...repairValue }]
                let total = 0
                newRepairs.forEach((repair) => total += repair.price)
                return { ...oldVal, neededRepairs: newRepairs, total: total }
            })
            setRepairValue({ repair: '', price: 0 })
        }


    }
    return (
        <Box sx={{ marginBottom: 1, display: 'flex' }} >
            <TextField sx={{ flex: 2 }} size={'small'} type={'text'} name={'repair'} onChange={handleChange} value={repairValue.repair} label={'Add Repairs'} />
            <TextField sx={{ flex: 1 }} size={'small'} type={'number'} name={'price'} onChange={handleChange} value={repairValue.price} label={'price'} />
            <Button sx={{ flex: 1 }} onClick={handleSubmit}>
                Add
            </Button>
            {
                (repairsSelection.length > 0 && <IconButton sx={{ float: 'right' }} onClick={() => {
                    setRepairSlip((oldVal) => {
                        const newRepairs = repairSlip.neededRepairs.filter((repairItem) => {
                            if (repairsSelection.includes(repairItem.repair)) {
                                return false
                            }
                            return true
                        })
                        let total = 0
                        newRepairs.forEach((repair)=>total+=repair.price)
                        return {
                            ...oldVal, neededRepairs: newRepairs, total: total
                        }
                    })
                }}><DeleteIcon></DeleteIcon></IconButton>)
            }
        </Box>
    )
}
