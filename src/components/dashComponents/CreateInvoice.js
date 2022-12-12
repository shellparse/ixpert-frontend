import { Box, Divider, Grid, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomerSelector from '../CustomerSelector'
import ItemSelector from '../ItemSelector'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import Footer from './Footer'
const colDef = [
    {
        field: 'sku',
        headerName: 'SKU',
        flex: 1,
        sortable: false
    },
    {
        field: 'name',
        headerName: 'Item',
        flex: 2,
        sortable: false
    },
    {
        field: 'amount',
        headerName: 'Quantity',
        flex: 1,
        sortable: false
    },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        sortable: false
    },
    {
        field: 'total',
        headerName: 'Total',
        flex: 1,
        sortable: false,
        valueGetter: (params) => {
            return params.row.amount * params.row.price
        }
    }
]
const defInvoice = {
    number: '',
    customerId: '',
    total: 0,
    cashier: '',
    items: [],
    notes: '',
    paid: true,
    customerDetails: { name: '', phoneNumber: '', email: '' }
}

export default function CreateInvoice() {
    const { setSnackBarMsg } = useOutletContext()
    const [selection, setSelection] = useState([])
    const [invoice, setInvoice] = useState(defInvoice)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URI}/invoicenumber`).then((res) => res.json()).then((data) => {
            setInvoice(prevInvoice => ({ ...prevInvoice, number: data ? data.lastInvoice + 1 : 1 }))
        })
    }, [setInvoice])

    function handleSubmit(e) {
        e.preventDefault()
        if (invoice.number && invoice.customerId) {
            fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            }).then((response) => {
                if (response.headers.has('Content-Type')) {
                    return null
                } else {
                    return response.blob()
                }
            })
                .then((blob) => {
                    if (blob) {
                        blob = blob.slice(0, blob.size, "application/pdf")
                        let blobURL = URL.createObjectURL(blob)
                        setTimeout(() => {
                            window.open(blobURL)
                        }, 1500)
                        e.target.reset()
                        setSnackBarMsg({ show: true, message: 'Invoice Created', severity: 'success' })
                        setInvoice((oldVal)=>{
                            return {...defInvoice, number: oldVal.number+1}
                        })
                    }
                })
        }
    }
    return (
        <Box sx={{ height: '100%', backgroundColor: 'yellowgreen' }}>
            <Box sx={{ height: '100%', backgroundColor: 'pink', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'flex-start' }} component={'form'} onSubmit={handleSubmit}>
                <Box>

                    <Typography variant={'h4'} >Create Invoice</Typography>
                    <Divider />
                    <Grid container columnSpacing={4} sx={{ padding: 2 }}>
                        <Grid item xs={4}>
                            <TextField sx={{ width: '100%', fontStyle: 'oblique', fontVariantNumeric: 'slashed-zero' }} size='small' inputProps={{ readOnly: true }} value={invoice.number} label={'invoice number'} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomerSelector setInputs={setInvoice} />
                        </Grid>
                        <Grid item xs={4}>
                            <ItemSelector invoiceItems={invoice.items} setInvoice={setInvoice} setSnackBarMsg={setSnackBarMsg}></ItemSelector>
                        </Grid>
                        <Grid sx={{ marginTop: 2 }} item xs={12}>
                            <DataGrid
                                rows={invoice.items}
                                columns={colDef}
                                disableColumnMenu
                                checkboxSelection
                                selectionModel={selection}
                                onSelectionModelChange={(gridSelection, details) => {
                                    setSelection([...gridSelection])

                                }}
                                disableSelectionOnClick
                                autoHeight
                                hideFooter
                                rowHeight={30}
                                components={{
                                    NoRowsOverlay: () => <Box alignItems='center' justifyContent='center' display={'flex'}><InfoTwoToneIcon /><h3>Add Items</h3></Box>,
                                    Toolbar: () => <Box alignItems='right' justifyContent='right' display={'flex'}><DeleteForeverTwoToneIcon sx={{ cursor: 'pointer', visibility: selection.length === 0 ? 'hidden' : 'visible' }} onClick={() => {
                                        setInvoice((oldVal) => {
                                            return oldVal.items.filter((item) => !selection.includes(item.id))
                                        })
                                    }} /></Box>
                                }}

                            />
                        </Grid>
                    </Grid>
                </Box>
                <Footer customerDetails={invoice.customerDetails} total={invoice.total} items={invoice.items} />
            </Box>
        </Box>
    )
}