import '../App.css'
import Footer from '../components/dashComponents/Footer'
import Header from '../components/dashComponents/Header'
import Main from '../components/dashComponents/Main'
import MainNav from '../components/dashComponents/MainNav'
import SecondaryNav from '../components/dashComponents/SecondaryNav'
import { useState } from 'react'
import { Container, Box } from '@mui/system'

export default function DashBoard() {
    const [activeCustomer, setActiveCustomer] = useState({})
    const [invoiceFooter, setInvoiceFooter] = useState({name: ''})
    const [invoiceItems, setInvoiceItems] = useState([])
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [snackBarMsg, setSnackBarMsg] = useState({show:false, message:'', severity:'info'})

    return (
        <div className='dashboard'>
            <Header />
            <MainNav />
            <Container sx={{width: `calc(100% - 240px)`, marginLeft: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `calc(100% - 72px)`}}>
            <Main activeCustomer={activeCustomer} setCustomer={setActiveCustomer} invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} invoiceNumber={invoiceNumber} setInvoiceNumber={setInvoiceNumber} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> 
            <Footer invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} setInvoiceNumber={setInvoiceNumber} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
            </Container>
        </div>
    )
}