import { useState } from 'react'
import TabPanel from './TabPanel'
import { Tabs, Tab, Box } from '@mui/material'
import CreateRepairSlip from './CreateRepairSlip'

export default function RepairSlip () {
    const [visibleTab, setVisibleTab] = useState(0)

    function handleTabChange (e, newVal) {
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
                <CreateRepairSlip />
            </TabPanel>
            <TabPanel value={visibleTab} index={1}>
            </TabPanel>
        </Box>
    )
}