import { useLocation } from "react-router-dom"
import Paper from '@mui/material/Paper'
import { Typography, Button } from "@mui/material"
import Userfront from "@userfront/react"
export default function Footer({invoiceFooter, setInvoiceFooter, invoiceItems}){
    const currentPath = useLocation()
    function submitInvoice () {
        let invoice = {
            number:invoiceFooter.invoiceNumber,
            customerId: invoiceFooter._id,
            cashier: Userfront.user.name,
            items:invoiceItems
        }
        console.log(invoice)
        fetch(`${process.env.REACT_APP_API_URI}/salesinvoice`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoice)
        }).then(response=>response.json())
        .then((data)=>{
            console.log('reply from server')
            console.log(data)
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
            </div>
        )
    }
    return(
        <div className="dashFooter">
            Footer
        </div>
    )

}