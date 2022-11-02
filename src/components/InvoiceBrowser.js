import { Button, Collapse } from '@mui/material'
import { DataGrid, GridRow } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'



function ExpandableRow (props) {
    const [open, setOpen] = useState(false)

    return (
        <div style={{backgroundColor: 'yellow', cursor: 'pointer'}} onClick={()=>setOpen(oldVal=>oldVal?false:true)}>
            <h4>show items</h4>
            <Collapse in={open}>
                <ul>
                    {props.items.map(item=><li>{item.name}</li>)}
                </ul>
            </Collapse>
            {/* <GridRow {...props}></GridRow> */}
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
            renderCell: ({row})=><ExpandableRow items={row.items} />
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

            <DataGrid sx={{height:'100%'}}
            columns={colDef}
            rows={rows}
            getRowId={(row)=>row._id}
            disableColumnMenu
            disableSelectionOnClick
            autoHeight
            hideFooter
            getRowHeight={() => 'auto' }
            components={{
                
            }}
            >
            </DataGrid>        
    )
}