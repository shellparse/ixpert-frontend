import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import { NavLink } from "react-router-dom"
import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
export default function MainNav(){
    const navItems = [{
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
    }]

    return(
        <Drawer variant='permanent'>
            <Toolbar/>
            <Divider/>
            <List sx={{width:'200px'}}>
                    {navItems.map((element, index) => {
                        return (<ListItem disablePadding key={index+1}>
                                        <NavLink style={{color: 'inherit', textDecoration:'none', width:'100%'}} children={({isActive})=>{
                                            return (
                                                    <ListItemButton sx={{color: isActive?'secondary.main':'primary.main'}}>
                                                        <ListItemIcon sx={{color: 'inherit'}}>
                                                            <element.icon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={element.label}/>
                                                    </ListItemButton>
                                            )
                                        }} to={element.link} />
                                </ListItem>
                            )
                        }
                    )}
            </List>
        </Drawer>     
    )
}