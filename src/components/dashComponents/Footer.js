import Paper from '@mui/material/Paper'
import { Typography, Button } from '@mui/material'
export default function Footer({setSnackBarMsg, invoice, repairSlip, setInvoice, setRepairSlip}){
    const {customerDetails, total} = invoice || repairSlip
    function submit () {

        if((invoice.number&&invoice.customerId)||(repairSlip.slipNumber&&repairSlip.customerId)){
        fetch(`${process.env.REACT_APP_API_URI}/${invoice?'salesinvoice':'slip'}`,{
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
                let blobURL = URL.createObjectURL(blob)
                setTimeout(()=>{
                    window.open(blobURL)
                },1500)
                invoice?setInvoice({}):setRepairSlip({})
                // setInvoiceNumber((prevNo)=>{
                //     return prevNo+=1
                // })
                setSnackBarMsg({show: true, message: 'Invoice Created', severity: 'success'})
            }
        })
    } else if (!invoice.customerId||!repairSlip.customerId){
        setSnackBarMsg({show: true, severity: 'error', message: 'customer not selected'})
    } else {
        setSnackBarMsg({show: true, severity:'error', message: 'database error'})
    }
}
        return(
            <div className="dashFooter">
                <div className="invoiceName">
                    <Paper sx={{height:'100%', fontSize: '120%'}} elevation={1}>
                        {customerDetails.name}
                    </Paper>
                </div>
                <div className="invoiceEmail">
                    <Paper sx={{height:'100%', fontSize: '120%'}} elevation={1}>
                        {customerDetails.email}
                    </Paper>
                </div>
                <div className="invoicePhone">
                    <Paper sx={{height:'100%', fontSize:'120%'}} elevation={1}>
                        {customerDetails.phoneNumber}
                    </Paper>
                </div>
                <div className="invoiceGenerate">
                <Button onClick={submit} sx={{height:'100%', width:'100%'}} disabled={(invoice&&invoice.invoiceItems.length>0)||repairSlip.neededRepairs.length>0?false:true} variant="contained">Generate</Button>
                </div>
                <div className="invoiceTotal">
                    <Typography sx={{fontSize:'100%', color:'secondary.main'}}>
                        {`R${total}`}
                    </Typography>
                </div>
            </div>
        )

}