import { Tab, Tabs, Grid, TextField } from "@mui/material";
import { useState } from "react";
import CustomerSelector from "../CustomerSelector";
import ItemSelector from "../ItemSelector";
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
export default function SalesInvoice () {

    const [val, setVal] = useState(0)
    return (
        <>
            <h3 style={{padding:0, margin:0}}>Invoice</h3>
            <Tabs value={val} onChange={(e,value)=>setVal(value)} sx={{marginBottom:3}}>
                <Tab label={'Create'} id={'tab-0'} aria-controls={`tabpanel-0`} />
                <Tab label={'Browse'} id={'tab-1'} aria-controls={`tabpanel-1`} />
            </Tabs>
            <TabPanel value={val} index={0} >
              <Grid container spacing={2}>
                <Grid item md={6}>
                <CustomerSelector />
                </Grid>
                <Grid item md={6}>
                <TextField disabled defaultValue={'1554'} label={'invoice NO: '} />
                </Grid>
                <Grid item xs={12}>
                  <ItemSelector></ItemSelector>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={val} index={1} >
            </TabPanel>
        </>
    )
}