
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
export default function RepairsToolbar(props) {
    const [repairValue, setRepairValue] = useState({repair: '', price: ''})
    const setRepairItems = useOutletContext()[15]
    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setRepairValue(oldVal=>({...oldVal, [name]: value}))
    }

    function handleSubmit() {
        if (props.inputs.neededRepairs.some(e=>e.repair === repairValue.repair)){
            props.setSnackBarMsg({show: true, message: 'duplicate repair item', severity: 'warning'})
        } else if (repairValue.repair.length>0){
            props.setInputs((oldVal) => { 
                setRepairItems([...oldVal.neededRepairs, {...repairValue}])
                return { ...oldVal, neededRepairs: [...oldVal.neededRepairs, {...repairValue}] } })

            setRepairValue({repair: '', price: 0})
        }


    }
    return (
        <Box sx={{marginBottom: 1, display: 'flex'}} >
            <TextField sx={{flex: 2}} size={'small'} type={'text'} name={'repair'} onChange={handleChange} value={repairValue.repair} label={'Add Repairs'} />
            <TextField sx={{flex: 1}} size={'small'} type={'number'} name={'price'} onChange={handleChange} value={repairValue.price} label={'price'} />
            <Button sx={{flex: 1}} onClick={handleSubmit}>
                Add
            </Button>
            {
                (props.repairsSelection.length>0 && <IconButton sx={{float: 'right'}} onClick={()=>{
                    console.log(props.repairsSelection)
                    props.setInputs((oldVal)=>({...oldVal, neededRepairs: props.inputs.neededRepairs.filter((repairItem)=>{
                        if (props.repairsSelection.includes(repairItem.repair)){
                            return false
                        }
                        return true
                    })}))
                }}><DeleteIcon></DeleteIcon></IconButton>)
            }
            </Box>
    )
}
