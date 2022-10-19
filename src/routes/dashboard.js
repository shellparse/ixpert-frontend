import '../App.css'
import Footer from '../components/dashComponents/Footer'
import Header from '../components/dashComponents/Header'
import Main from '../components/dashComponents/Main'
import MainNav from '../components/dashComponents/MainNav'
import SecondaryNav from '../components/dashComponents/SecondaryNav'
import { useState } from 'react'

export default function DashBoard() {
    const [activeCustomer, setActiveCustomer] = useState({})
    const [invoiceFooter, setInvoiceFooter] = useState({})
    const [invoiceItems, setInvoiceItems] = useState([])
    return (
        <div className='dashboard'>
            <MainNav />
            <Header />
            <Main activeCustomer={activeCustomer} setCustomer={setActiveCustomer} invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems}  /> 
            <SecondaryNav/>
            <Footer invoiceFooter={invoiceFooter} setInvoiceFooter={setInvoiceFooter} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
        </div>
    )
}