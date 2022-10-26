import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { NavLink } from "react-router-dom"
import { IconButton, Paper } from '@mui/material';
export default function MainNav(){
    return(
            <Paper variant='outlined' className={'dashMainNav'}>
                <ul>
                    {[{
                        label: 'Customers',
                        link: 'customers',
                        icon: PeopleAltTwoToneIcon
                    },{
                        label: 'Repair slip',
                        link: 'repairslip',
                        icon: EngineeringTwoToneIcon
                    },{
                        label: 'Inventory',
                        link: 'inventory',
                        icon: Inventory2TwoToneIcon
                    },{
                        label: 'Invoice',
                        link: 'invoice',
                        icon: DescriptionTwoToneIcon
                    }].map((element, index) => {
                        return (<li key={index+1}>
                                    <NavLink children={({isActive})=>isActive?<IconButton  sx={{borderRadius:0, width:'100%', justifyContent:'left', color:'secondary.main'}}>
                                            <element.icon/>
                                            {element.label}
                                        </IconButton>:<IconButton  sx={{borderRadius:0, width:'100%', justifyContent:'left', color:'primary.main'}}>
                                            <element.icon/>
                                            {element.label}
                                        </IconButton>} className={({isActive})=> isActive?'activeNav':'notActiveNav'} to={element.link}>
                                    </NavLink>
                                </li>)
                            }
                        )}
                </ul>
                </Paper>
 
            
    )
}