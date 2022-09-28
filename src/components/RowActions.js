import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
export default function RowActions ({isEdit, setIsEdit, rowId, rowToUpdate, setRowToUpdate, discardedRow, setDiscardedRow, original, table}) {
    const [snackBarMsg, setSnackBarMsg] = useState({show:false, message:'', severity:'info'})
    function editHandler(e){
        setIsEdit(rowId)
    }
    function applyHandler(e){
        fetch(`${process.env.REACT_APP_API_URI}/inventory/${original._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(rowToUpdate)
        }).then((response)=>response.json()).then((data)=>{
            if('lastErrorObject' in data && data.lastErrorObject.updatedExisting){
                setIsEdit('')
                setRowToUpdate({})
                setSnackBarMsg({
                    show:true,
                    message:'Inventory Item Updated',
                    severity:'success'
                })
                fetch(`${process.env.REACT_APP_API_URI}/inventory`).then((response)=>response.json())
        .then((data)=>{
            if(data.length>0){
                table.options.meta.setInventoryNav(()=>([...data]))
            }
        })
            }else if('code' in data && data.code === 121){
                setSnackBarMsg({
                    show:true,
                    message:'Error: validation failed',
                    severity:'error'
                })
            }
        })
    }
    function discardHandler(e){
        setIsEdit('')
        setRowToUpdate({})
    }
    if(isEdit===rowId){
        return (
            <>
                <IconButton onClick={discardHandler}><CloseIcon/></IconButton>
                <IconButton  onClick={applyHandler}><CheckIcon/></IconButton>
                <Snackbar onClose={()=>setSnackBarMsg((state)=>{return{...state,show:false}})} autoHideDuration={3500} children={<Alert variant='filled' sx={{ width: '100%' }} severity={snackBarMsg.severity}>{snackBarMsg.message}</Alert>} open={snackBarMsg.show}/>
            </>
        )
    }else {
        return (
            <>
                <IconButton onClick={editHandler}><EditIcon/></IconButton>
                <Snackbar onClose={()=>setSnackBarMsg((state)=>{return{...state,show:false}})} autoHideDuration={3500} children={<Alert variant='filled' sx={{ width: '100%' }} severity={snackBarMsg.severity}>{snackBarMsg.message}</Alert>} open={snackBarMsg.show}/>
            </>
        )
    }

}