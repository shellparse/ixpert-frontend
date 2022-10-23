import { Outlet } from "react-router-dom";

export default function Main(props){
    return(
        <div className="dashMain">
            <Outlet context={[props.activeCustomer, props.setCustomer, props.inventoryNav, props.setInventoryNav, props.activeItem, props.setActiveItem, props.invoiceFooter, props.setInvoiceFooter, props.invoiceItems, props.setInvoiceItems, props.invoiceNumber, props.setInvoiceNumber, props.snackBarMsg, props.setSnackBarMsg]} />
        </div>
    )
}