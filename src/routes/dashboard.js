import '../App.css'
import Footer from '../components/dashComponents/Footer'
import Header from '../components/dashComponents/Header'
import Main from '../components/dashComponents/Main'
import MainNav from '../components/dashComponents/MainNav'
import SecondaryNav from '../components/dashComponents/SeconderyNav'
import { useState } from 'react'

export default function DashBoard() {
    const [inventoryNav, setInventoryNav] = useState([]) 
    const [activeCustomer, setActiveCustomer] = useState({})
    const [activeItem, setActiveItem] = useState({})
    return (
        <div className='dashboard'>
            <MainNav />
            <Header />
            <Main activeCustomer={activeCustomer} setCustomer={setActiveCustomer} inventoryNav={inventoryNav} setInventoryNav={setInventoryNav} activeItem={activeItem} setActiveItem={setActiveItem} /> 
            <SecondaryNav inventoryNav={inventoryNav} setInventoryNav={setInventoryNav} activeItem={activeItem} setActiveItem={setActiveItem}/>
            <Footer />
        </div>
    )
}