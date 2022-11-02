import { Button, Collapse } from '@mui/material'
import { DataGrid, GridRow } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'



function ExpandableRow (props) {
    const [open, setOpen] = useState(false)

    return (
        <div style={{backgroundColor: 'lightBlue', cursor: 'pointer', height: '100%'}} onClick={()=>setOpen(oldVal=>oldVal?false:true)}>
            <GridRow {...props}></GridRow>
            <Collapse in={open}>
                {props.row.items.map(item=><div key={item.id}>{item.name}</div>)}
            </Collapse>
        </div>
    )
}
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
            flex: 1, 
        },
        {
            field: 'customerId',
            flex: 2
        },
        {
            field: 'items',
            flex: 2,
            renderCell: ()=><Button variant='outlined'>show items</Button>
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

            <DataGrid sx={{backgroundColor:'primary.light'}}
            columns={colDef}
            rows={rows}
            getRowId={(row)=>row._id}
            disableColumnMenu
            disableSelectionOnClick
            components={{
                Row: props=><ExpandableRow {...props} />
            }}
            >
            </DataGrid>        
    )
}