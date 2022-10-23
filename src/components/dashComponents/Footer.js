import { useLocation } from "react-router-dom"
import Paper from '@mui/material/Paper'
import { Typography, Button, Snackbar, Alert } from "@mui/material"
import Userfront from "@userfront/react"
export default function Footer({invoiceFooter, setInvoiceFooter, invoiceItems, setInvoiceItems, setInvoiceNumber, snackBarMsg, setSnackBarMsg}){
    const currentPath = useLocation()
    console.log(invoiceItems)
    function submitInvoice () {
        let invoice = {
            number:invoiceFooter.invoiceNumber,
            customerId: invoiceFooter._id,
            cashier: Userfront.user.name,
            items: invoiceItems,
            total: invoiceFooter.total
        }
        if(invoice.number&&invoice.customerId)
        fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoice)
        }).then(response=>response.json())
        .then((data)=>{
            if(data.acknowledged){
                setInvoiceFooter((oldValue)=>{
                    return {...oldValue, total: 0}
                })
                setInvoiceItems([])
                setInvoiceNumber((prevNo)=>{
                    return prevNo+=1
                })
                setSnackBarMsg((oldVal)=>{
                    return {show: true, message: 'Invoice Created', severity: 'success'}
                })
            }
        })
    }
    if(currentPath.pathname==='/dashboard/invoice'){
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
                <Button onClick={submitInvoice} sx={{height:'100%', width:'100%'}} variant="contained">Generate</Button>
                </div>
                <div className="invoiceTotal">
                    <Typography sx={{fontSize:'100%', color:'secondary.main'}}>
                        {`R${invoiceFooter.total}`}
                    </Typography>
                </div>
                <Snackbar onClose={()=>setSnackBarMsg((state)=>{return{...state,show:false}})} autoHideDuration={3500} children={<Alert variant='filled' sx={{ width: '100%' }} severity={snackBarMsg.severity}>{snackBarMsg.message}</Alert>} open={snackBarMsg.show}/>
            </div>
        )
    }
    return(
        <div className="dashFooter">
            Footer
        </div>
    )

}