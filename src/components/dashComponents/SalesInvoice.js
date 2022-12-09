import { Tab, Tabs, Grid, TextField, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CustomerSelector from '../CustomerSelector'
import ItemSelector from '../ItemSelector'
import { DataGrid } from '@mui/x-data-grid'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import InvoiceBrowser from '../InvoiceBrowser'
import TabPanel from '../TabPanel'

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

export default function SalesInvoice() {
  const { setSnackBarMsg } = useOutletContext()
  const [selection, setSelection] = useState([])
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
  const [invoice, setInvoice] = useState(defInvoice)
  const [visibleTab, setVisibleTab] = useState(0)
  function handleTabChange(event, newVal) {
    setVisibleTab(newVal)
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/invoicenumber`).then((res) => res.json()).then((data) => {
        setInvoice(prevInvoice=>({...prevInvoice, number: data?data.lastInvoice + 1:1}))
    })
  }, [setInvoice])

  return (
    <Box sx={{ height: '100%', backgroundColor: 'lightcoral', boxSizing: 'border-box' }}>
      <Tabs value={visibleTab} onChange={handleTabChange} >
        <Tab label={'Create Invoice'} id={'tab-0'} aria-controls={`tabpanel-0`} />
        <Tab label={'Browse Invoices'} id={'tab-1'} aria-controls={`tabpanel-1`} />
      </Tabs>
      <TabPanel value={visibleTab} index={0} >
        <Typography variant={'h4'} >Create Invoice</Typography>
        <Grid container columnSpacing={4} sx={{padding: 2}}>
          <Grid item xs={4}>
            <TextField sx={{ width: '100%', fontStyle: 'oblique', fontVariantNumeric: 'slashed-zero' }} size='small' inputProps={{ readOnly: true }} value={invoice.number} label={'invoice number'} />
          </Grid>
          <Grid item xs={4}>
            <CustomerSelector />
          </Grid>
          <Grid item xs={4}>
            <ItemSelector invoiceItems={invoice.items} setInvoiceItems={setInvoice} setSnackBarMsg={setSnackBarMsg}></ItemSelector>
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
      </TabPanel>
      <TabPanel value={visibleTab} index={1}>
        <InvoiceBrowser />
      </TabPanel>
    </Box>
  )
}