import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CreateCustomer from './CreateCustomer'
import CustomerBrowser from './customerBrowser'
import TabPanel from './TabPanel'
export default function Customers () {
    const setSnackBarMsg = useOutletContext()[13];

    let [visibleTab,setVisibleTab] = useState(0)

    function handleTabChange (event, newVal) {
        setVisibleTab(newVal)
    }

    return (
        <Box sx={{height: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={visibleTab} onChange={handleTabChange}>
                    <Tab label={'create'} id={0}></Tab>
                    <Tab label={'browse'} id={1}></Tab>
                </Tabs>
            </Box>
            <TabPanel value={visibleTab} index={0}>
                <CreateCustomer setSnackBarMsg={setSnackBarMsg} />
            </TabPanel>
            <TabPanel value={visibleTab} index={1}>
                <CustomerBrowser></CustomerBrowser>
            </TabPanel>
        </Box>
    )
}