import { TextField } from "@mui/material"


export default function EditableCell({isEdit, value, rowId, rowToUpdate, setRowToUpdate, discardedRow, setDiscardedRow, colId}){
    function onBlur (e){
        if(!value){
            value=''
        }
        let fieldValue = e.target.value
        if(colId==='price')
            fieldValue = parseFloat(fieldValue)
        if(colId==='quantity')
            fieldValue = parseInt(fieldValue)
        if(value.toString()===e.target.value){
            return
        }else{
            setRowToUpdate((row)=>{return{...row,[colId]:fieldValue}})
        }
    }
    if(isEdit===rowId){
    return (
        <TextField defaultValue={value} variant="standard" onBlur={onBlur} type={colId==='quantity'||colId==='price'?'number':'text'} />
    )
    }else {
        return (
            <span>{value}</span>
        )
    }
}