import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { TableRow, TableCell } from '@mui/material'

export default function InvoiceBrowser () {
    const [rows, setRows] = useState([])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`)
    .then(response=>response.json())
    .then((data)=>{
        setRows(data)
    })
    },[])
    

    const colDef = [
        {
            field: 'number',
            flex: 1
        },
        {
            field: 'customerId',
            flex: 2
        },
        {
            field: 'items',
            flex: 2
        },
        {
            field: 'cashier',
            flex: 2
        },
        {
            field: 'notes',
            flex: 2
        },
        {
            field: 'paid',
            flex: 1
        },
        {
            field: 'total',
            flex: 1
        }
    ]
    return (
        
            // <DataGrid
            // columns={colDef}
            // rows={rows}
            // getRowId={(row)=>row._id}
            // disableColumnMenu
            // disableSelectionOnClick
            // autoHeight
            // hideFooter
            // components={{

            //     Row: (props)=> <TableRow {...props}/>
            // }}
            // >
            // </DataGrid>        
    )
}