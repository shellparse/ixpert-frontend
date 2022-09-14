import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
export default function RowActions ({onClick}) {
    

    return (
    <IconButton onClick={onClick}><EditIcon/></IconButton>
    )
}