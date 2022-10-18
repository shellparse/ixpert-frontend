import { useLocation } from "react-router-dom"
import Paper from '@mui/material/Paper'
import { Typography, Button } from "@mui/material"
export default function Footer({invoiceFooter, setInvoiceFooter}){
    const currentPath = useLocation()
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
                <Button sx={{height:'100%', width:'100%'}} variant="contained">Generate</Button>
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