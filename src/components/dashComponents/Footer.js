import { useLocation } from "react-router-dom"
import Paper from '@mui/material/Paper'
import { Typography, Button } from "@mui/material"
import Userfront from "@userfront/react"
export default function Footer({invoiceFooter, setInvoiceFooter, invoiceItems, setInvoiceItems, setInvoiceNumber, setSnackBarMsg, repairItems}){
    const currentPath = useLocation()
    function submitInvoice () {
        let invoice = {
            number:invoiceFooter.invoiceNumber,
            customerId: invoiceFooter._id,
            cashier: Userfront.user.name,
            items: invoiceItems,
            total: invoiceFooter.total,
            customerDetails: {name: invoiceFooter.name, phoneNumber: invoiceFooter.phoneNumber, email: invoiceFooter.email}
        }
        if(invoice.number&&invoice.customerId){
        fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoice)
        }).then((response)=>{
            if(response.headers.has('Content-Type')){
                return null
            }else{
                return response.blob()
            }
        })
        .then((blob)=>{
            if(blob){
                blob = blob.slice(0, blob.size, "application/pdf")
                let blobURL = URL.createObjectURL(blob);
                setTimeout(()=>{
                    window.open(blobURL);
                },1500)
                setInvoiceFooter((oldValue)=>{
                    return {...oldValue, _id: null, name:'', email: '', phoneNumber: '', total: 0}
                })
                setInvoiceItems([])
                setInvoiceNumber((prevNo)=>{
                    return prevNo+=1
                })
                setInvoiceFooter((oldVal)=> {return {...oldVal, invoiceNumber:++oldVal.invoiceNumber }})
                setSnackBarMsg({show: true, message: 'Invoice Created', severity: 'success'})
            }
        })
    } else if (!invoice.customerId){
        setSnackBarMsg({show: true, severity: 'error', message: 'customer not selected'})
    } else {
        setSnackBarMsg({show: true, severity:'error', message: 'database error'})
    }
}

function submitRepairSlip(){
    
}




    if((currentPath.pathname==='/dashboard/invoice' && (invoiceFooter.visibleTab === 0 || !invoiceFooter.visibleTab )) || (currentPath.pathname==='/dashboard/repairslip' && (invoiceFooter.visibleTab === 0 || !invoiceFooter.visibleTab )) ) {
        return(
            <div className="dashFooter">
                <div className="invoiceName">
                    <Paper sx={{height:'100%', fontSize: '120%'}} elevation={1}>
                        {invoiceFooter.name}
                    </Paper>
                </div>
                <div className="invoiceEmail">
                    <Paper sx={{height:'100%', fontSize: '120%'}} elevation={1}>
                        {invoiceFooter.email}
                    </Paper>
                </div>
                <div className="invoicePhone">
                    <Paper sx={{height:'100%', fontSize:'120%'}} elevation={1}>
                        {invoiceFooter.phoneNumber}
                    </Paper>
                </div>
                <div className="invoiceGenerate">
                <Button onClick={currentPath.pathname==='/dashboard/invoice'?submitInvoice:submitRepairSlip} sx={{height:'100%', width:'100%'}} disabled={invoiceItems.length>0||repairItems.length>0?false:true} variant="contained">Generate</Button>
                </div>
                <div className="invoiceTotal">
                    <Typography sx={{fontSize:'100%', color:'secondary.main'}}>
                        {`R${invoiceFooter.total}`}
                    </Typography>
                </div>
            </div>
        )
    }
    return(
        <div className="dashFooter">
            Footer
        </div>
    )

}