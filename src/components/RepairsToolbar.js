
import { Toolbar, TextField, Button } from '@mui/material'
import { useState } from 'react'
export default function RepairsToolbar(props) {
    const [repairValue, setRepairValue] = useState('init')
    function handleChange(e) {
        setRepairValue(e.target.value)
    }

    function handleSubmit() {
        props.setInputs((oldVal) => { return { ...oldVal, neededRepairs: [...oldVal.neededRepairs, repairValue] } })
    }
    return (
        <>
            <TextField size={'small'} type={'text'} name={'repair'} onChange={handleChange} value={repairValue} label={'Add Repairs'}></TextField>
            <Button onClick={handleSubmit}>
                Add
            </Button>
            </>
    )
}
