import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
export default function CustomerBrowser (props) {
    const [customersList, setCustomersList] = useState([])
    const colDef = [
        {
            field: 'name',
            header: 'Name'
        }, {
            field: 'email',
            header: 'E-mail'
        }, {
            field: 'phoneNumber',
            heading: 'Mobile'
        }
    ]
    const API = process.env.REACT_APP_API_URI
    useEffect(()=>{
        fetch(`${API}/customer`).then((res)=>res.json())
        .then((data)=>{
            if(data){
                setCustomersList(data)
            }
        })
    },[API,setCustomersList])

    return (
        <Box sx={{backgroundColor: 'hotpink', boxSizing: 'border-box'}}>
            <Typography variant='h4'>Manage customers</Typography>
            <DataGrid columns={colDef}
            rows={customersList}
            getRowId= {(row)=>row._id} />
        </Box>
    )
}