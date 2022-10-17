import { useLocation, useOutletContext } from "react-router-dom"
export default function Footer(){
    const currentPath = useLocation()
    const invoiceFooter = useOutletContext()[6]
    const setInvoiceFooter = useOutletContext()[7]
    if(currentPath.pathname==='/dashboard/invoice'){
        return(
            <div className="dashFooter">
                customer name: {invoiceFooter.name}
                email: {invoiceFooter.email}
                phone number: {invoiceFooter.phoneNumber}
                total: {invoiceFooter.total}
            </div>
        )
    }
    return(
        <div className="dashFooter">
            Footer
        </div>
    )

}