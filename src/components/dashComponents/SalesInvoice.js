import { Tab, Tabs, Grid, TextField, Box } from "@mui/material"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import CustomerSelector from "../CustomerSelector"
import ItemSelector from "../ItemSelector"
import { DataGrid } from '@mui/x-data-grid'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
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
      <div
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
export default function SalesInvoice (props) {
    const setInvoiceFooter = useOutletContext()[7]
    const [val, setVal] = useState(0)
    const [invoiceItems, setInvoiceItems] = useState([])
    return (
        <>
            <h3 style={{padding:0, margin:0}}>Invoice</h3>
            <Tabs value={val} onChange={(e,value)=>setVal(value)} sx={{marginBottom:3}}>
                <Tab label={'Create'} id={'tab-0'} aria-controls={`tabpanel-0`} />
                <Tab label={'Browse'} id={'tab-1'} aria-controls={`tabpanel-1`} />
            </Tabs>
            <TabPanel value={val} index={0} >
              <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField size="small" disabled defaultValue={'1554'} label={'invoice NO: '} />
                </Grid>
                <Grid item xs={4}>
                <CustomerSelector setInvoiceFooter={setInvoiceFooter} />
                </Grid>
                <Grid item xs={4}>
                  <ItemSelector setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}></ItemSelector>
                </Grid>
                <Grid xs={12}>
                <DataGrid
                  rows={invoiceItems}
                  columns={colDef}
                  disableColumnMenu
                  checkboxSelection
                  disableSelectionOnClick
                  autoHeight
                  hideFooter
                  rowHeight={30}
                  components={{
                    NoRowsOverlay: ()=><Box alignItems="center" justifyContent="center" display={'flex'}><InfoTwoToneIcon /><h3>Add Items</h3></Box>,
                  }}
                />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={val} index={1} >
            </TabPanel>
        </>
    )
}