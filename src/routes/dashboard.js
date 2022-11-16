import '../App.css'
import Header from '../components/dashComponents/Header'
import Main from '../components/dashComponents/Main'
import MainNav from '../components/dashComponents/MainNav'
import { useState } from 'react'
import { Snackbar, Alert} from '@mui/material'

export default function DashBoard() {
    // const [activeCustomer, setActiveCustomer] = useState({})
    // const [invoiceFooter, setInvoiceFooter] = useState({name: ''})
    // const [invoiceItems, setInvoiceItems] = useState([])
    // const [repairSlip, setRepairSlip] = useState({

    // })
    // const [invoiceNumber, setInvoiceNumber] = useState('')
    const [snackBarMsg, setSnackBarMsg] = useState({show:false, message:'', severity:'info'})

    return (
        <div className='dashboard'>
            <Header />
            <MainNav />
            <Main snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> 
            <Snackbar onClose={()=>setSnackBarMsg((state)=>{return{...state,show:false}})} autoHideDuration={3500} children={<Alert variant='filled' sx={{ width: '100%' }} severity={snackBarMsg.severity}>{snackBarMsg.message}</Alert>} open={snackBarMsg.show}/>
        </div>
    )
}