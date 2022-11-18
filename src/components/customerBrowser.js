import { Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
export default function CustomerBrowser (props) {
    const [customersList, setCustomersList] = useState([])
    const colDef = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        }, {
            field: 'email',
            headerName: 'E-mail',
            flex: 1
        }, {
            field: 'phoneNumber',
            headerName: 'Mobile',
            flex: 1
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
        <Box sx={{backgroundColor: 'hotpink', height: '100%', display: 'flex', flexDirection: 'column', padding: 2, boxSizing: 'border-box'}}>
            <Typography variant='h4'>Manage customers</Typography>
            <Divider />
            <DataGrid columns={colDef}
            rows={customersList}
            getRowId= {(row)=>row._id}
            disableSelectionOnClick />
        </Box>
    )
}