import Paper from '@mui/material/Paper'
import { Typography, Button } from '@mui/material'
export default function Footer({customerDetails, total, items}){
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
                <Button type={'submit'} sx={{height:'100%', width:'100%'}} disabled={!items.length>0} variant="contained">Generate</Button>
                </div>
                <div className="invoiceTotal">
                    <Typography sx={{fontSize:'100%', color:'secondary.main'}}>
                        {`R${total}`}
                    </Typography>
                </div>
            </div>
        )

}