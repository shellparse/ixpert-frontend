import { Tab, Tabs, Box } from '@mui/material'
import { useState } from 'react'

import InvoiceBrowser from '../InvoiceBrowser'
import TabPanel from '../TabPanel'
import CreateInvoice from './CreateInvoice'


export default function SalesInvoice() {

  const [visibleTab, setVisibleTab] = useState(0)
  function handleTabChange(event, newVal) {
    setVisibleTab(newVal)
  }

  return (
    <Box sx={{ height: '100%', backgroundColor: 'lightcoral', boxSizing: 'border-box' }}>
      <Tabs value={visibleTab} onChange={handleTabChange} >
        <Tab label={'Create Invoice'} id={'tab-0'} aria-controls={`tabpanel-0`} />
        <Tab label={'Browse Invoices'} id={'tab-1'} aria-controls={`tabpanel-1`} />
      </Tabs>
      <TabPanel value={visibleTab} index={0} >
        <CreateInvoice />
      </TabPanel>
      <TabPanel value={visibleTab} index={1}>
        <InvoiceBrowser />
      </TabPanel>
    </Box>
  )
}