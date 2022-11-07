import { Tab, Tabs, Grid, TextField, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import CustomerSelector from "../CustomerSelector"
import ItemSelector from "../ItemSelector"
import { DataGrid } from '@mui/x-data-grid'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import InvoiceBrowser from "../InvoiceBrowser"

const colDef = [
  {
    field:'sku',
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
    valueGetter: (params)=>{
      return params.row.amount*params.row.price
    }
  }
]
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div style={{height:'80%'}}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={` tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }
export default function SalesInvoice () {
    const invoiceFooter = useOutletContext()[6]
    const setInvoiceFooter = useOutletContext()[7]
    const invoiceItems = useOutletContext()[8]
    const setInvoiceItems = useOutletContext()[9]
    const invoiceNumber = useOutletContext()[10]
    const setInvoiceNumber = useOutletContext()[11]
    const snackBarMsg = useOutletContext()[12]
    const setSnackBarMsg = useOutletContext()[13]
    const [selection, setSelection] = useState([])
    const [val, setVal] = useState(0)
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URI}/invoicenumber`).then((res)=>res.json()).then((data)=>{
        if(data){
          setInvoiceNumber(data.lastInvoice+1)
          setInvoiceFooter((oldValue)=>{
            return {...oldValue,invoiceNumber:data.lastInvoice+1}
          })
        } else {
          setInvoiceNumber(1)
          setInvoiceFooter((oldValue)=>{
            return {...oldValue,invoiceNumber:1}
          })
        }
    })
    },[setInvoiceNumber, setInvoiceFooter])

    return (
        <Box sx={{height:'100%',backgroundColor:'lightcoral'}}>
            <h3 style={{padding:0, margin:0}}>Invoice</h3>
            <Tabs value={val} onChange={(e,value)=>{
              setInvoiceFooter((oldVal)=>{
                return {...oldVal, visibleTab: value}
              })
              setVal(value)
            }} sx={{marginBottom:3}}>
                <Tab label={'Create'} id={'tab-0'} aria-controls={`tabpanel-0`} />
                <Tab label={'Browse'} id={'tab-1'} aria-controls={`tabpanel-1`} />
            </Tabs>
            <TabPanel value={val} index={0} >
              <Grid container >
              <Grid item xs={4}>
                <TextField sx={{width:'100%', fontStyle:'oblique', fontVariantNumeric:'slashed-zero'}} size="small" inputProps={{readOnly: true}} value={invoiceNumber} label={'invoice NO: '} />
                </Grid>
                <Grid item xs={4}>
                <CustomerSelector invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} />
                </Grid>
                <Grid item xs={4}>
                  <ItemSelector setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} setSnackBarMsg={setSnackBarMsg}></ItemSelector>
                </Grid>
                <Grid item xs={12}>
                <DataGrid
                  rows={invoiceItems}
                  columns={colDef}
                  disableColumnMenu
                  checkboxSelection
                  selectionModel={selection}
                  onSelectionModelChange={(gridSelection, details)=>{
                    setSelection([...gridSelection])

                  }}
                  disableSelectionOnClick
                  autoHeight
                  hideFooter
                  rowHeight={30}
                  components={{
                    NoRowsOverlay: ()=><Box alignItems="center" justifyContent="center" display={'flex'}><InfoTwoToneIcon /><h3>Add Items</h3></Box>,
                    Toolbar: ()=><Box alignItems="right" justifyContent="right" display={'flex'}><DeleteForeverTwoToneIcon sx={{cursor: 'pointer', visibility:selection.length===0?'hidden':'visible'}} onClick={()=>{
                      setInvoiceItems((oldVal)=>{
                        return oldVal.filter((item)=>!selection.includes(item.id))
                      })
                    }} /></Box>
                  }}

                />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={val} index={1}>
                  {val===1?<InvoiceBrowser/>:''}
            </TabPanel>
        </Box>
    )
}