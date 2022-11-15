import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import TabPanel from './TabPanel'
import { Tabs, Tab, Box } from '@mui/material'
import CreateRepairSlip from './CreateRepairSlip'

export default function RepairSlip (props) {
    const [visibleTab, setVisibleTab] = useState(0)
    const setSnackBarMsg = useOutletContext()[13]
    const setInvoiceFooter = useOutletContext()[7]
    const setInvoiceItems = useOutletContext()[9]

    function handleTabChange (e, newVal) {
        setVisibleTab(newVal)
        setInvoiceFooter((oldVal)=>{
            return {...oldVal, visibleTab: newVal}
          })
    }
    useEffect(()=>{
    setInvoiceItems([])
    setInvoiceFooter({name: '', total: 0})
    },[setInvoiceFooter,setInvoiceItems])
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     fetch(`${API}/slip`,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(inputs)
    //     }).then((response)=>{
    //         if(response.headers.has('Content-Type')){
    //             return null
    //         }else{
    //             return response.blob()
    //         }
    //     })
    //     .then(blob=>{
    //         if(blob){
    //         blob = blob.slice(0, blob.size, "application/pdf")
    //         let blobURL = URL.createObjectURL(blob);
    //         setTimeout(()=>{
    //             window.open(blobURL);
    //         },1500)
    //         setSnackBarMsg({show: true, message: 'repair slip created!'})
    //         fetch(`${API}/slipnumber`,{method:'POST'}).then((res)=>res.json()).then((data)=>{
    //             // if(data){
    //             // document.getElementById('slipNumber').setAttribute('value',data.value.lastSlip+1)
    //             // setInputs((current)=>({...current,slipNumber: (data.value.lastSlip+1).toString()}))
    //             // } else {
    //             //     document.getElementById('slipNumber').setAttribute('value',1)
    //             //     setInputs((current)=>({...current,slipNumber: "1"}))
    //             // }
    //         })
    //         } else {

    //         }

    //         e.target.reset()

    //     })

    return (
        <Box sx={{height: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={visibleTab} onChange={handleTabChange}>
                    <Tab label={'create'} id={0}></Tab>
                    <Tab label={'browse'} id={1}></Tab>
                </Tabs>
            </Box>
            <TabPanel value={visibleTab} index={0}>
                <CreateRepairSlip setSnackBarMsg={setSnackBarMsg} />
            </TabPanel>
            <TabPanel value={visibleTab} index={1}>
            </TabPanel>
        </Box>
    )
}