import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
export default function RowActions ({onEdit, onApply, onDiscard}) {
    const [isEdit, setIsEdit] = useState(false)
    function editHandler(e){
        onEdit(e)
        setIsEdit(true)
    }
    function applyHandler(e){
        onApply(e)
        setIsEdit(false)
    }
    function discardHandler(e){
        onDiscard(e)
        setIsEdit(false)
    }
    if(isEdit){
        return (
            <>
                <IconButton onClick={discardHandler}><CloseIcon/></IconButton>
                <IconButton onClick={applyHandler}><CheckIcon/></IconButton>
            </>
        )
    }else {
        return (
        <IconButton onClick={editHandler}><EditIcon/></IconButton>
        )
    }

}