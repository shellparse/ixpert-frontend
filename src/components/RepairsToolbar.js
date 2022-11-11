
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useState } from 'react'
export default function RepairsToolbar(props) {
    const [repairValue, setRepairValue] = useState('')
    function handleChange(e) {
        setRepairValue(e.target.value)
    }

    function handleSubmit() {
        if (props.inputs.neededRepairs.includes(repairValue)){
            props.setSnackBarMsg({show: true, message: 'duplicate repair item', severity: 'warning'})
        } else if (repairValue.length>0){
            props.setInputs((oldVal) => { return { ...oldVal, neededRepairs: [...oldVal.neededRepairs, repairValue] } })
            setRepairValue('')
        }


    }
    return (
        <Box sx={{marginBottom: 1}}>
            <TextField size={'small'} type={'text'} name={'repairItem'} onChange={handleChange} value={repairValue} label={'Add Repairs'}></TextField>
            <Button onClick={handleSubmit}>
                Add
            </Button>
            {
                (props.repairsSelection.length>0 && <IconButton sx={{float: 'right'}} onClick={()=>{
                    props.setInputs((oldVal)=>({...oldVal, neededRepairs: props.inputs.neededRepairs.filter((repairItem)=>{
                        if (props.repairsSelection.includes(repairItem)){
                            return false
                        }
                        return true
                    })}))
                }}><DeleteIcon></DeleteIcon></IconButton>)
            }
            </Box>
    )
}
