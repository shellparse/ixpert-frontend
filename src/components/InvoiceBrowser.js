import { Button, Collapse } from '@mui/material'
import { DataGrid, GridRow } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function ExpandableRow(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ cursor: 'pointer', height: '100%' }} onClick={() => setOpen(oldVal => oldVal ? false : true)}>
            <GridRow {...props}></GridRow>
            <Collapse in={open}>
                <TableContainer sx={{ marginLeft: '10px', width: 'calc(100% - 50px)' }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['SKU', 'Item', 'Price', 'Quantity', 'total'].map((heading, index) => <TableCell key={index}>{heading}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.row.items.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {
                                                ['sku', 'name', 'price', 'amount', 'total'].map((key, index) => <TableCell key={index}>{key === 'total' ? item['price'] * item['amount'] : item[key]}</TableCell>)
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
        </div>
    )
}
export default function InvoiceBrowser() {
    const [rows, setRows] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`)
            .then(response => response.json())
            .then((data) => {
                setRows(data)
            })
    }, [])


    const colDef = [
        {
            field: 'number',
            flex: 1,
        },
        {
            field: 'customerDetails',
            flex: 2,
            valueGetter: row => row.value[0].name
        },
        {
            field: 'items',
            flex: 2,
            renderCell: () => <Button variant='outlined'>show items</Button>
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
        <DataGrid sx={{ backgroundColor: 'primary.light' }}
            columns={colDef}
            rows={rows}
            getRowId={(row) => row._id}
            disableColumnMenu
            disableSelectionOnClick
            components={{
                Row: props => <ExpandableRow {...props} />
            }}
        >
        </DataGrid>
    )
}