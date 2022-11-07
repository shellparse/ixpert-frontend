import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CreateCustomer from "./CreateCustomer"
export default function Customers () {
    const setSnackBarMsg = useOutletContext()[13];

    let [visibleTab,setVisibleTab] = useState(0)

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
          >
            {value === index && (
              children
            )}
          </div>
        )
      }
    function handleTabChange (event, newVal) {
        setVisibleTab(newVal)
    }

    // useEffect(()=>{
    //     fetch(`${API}/customer`).then((res)=>res.json())
    //     .then((data)=>{
    //         if(data){
    //         const select = document.getElementById('last10Customers')
    //         select.addEventListener("change",handleCustomerSelect)
    //         data.forEach(customer => {
    //             let option = select.appendChild(document.createElement('option'))
    //             option.setAttribute('value',customer._id)
    //             option.innerHTML=customer.name
    //         });
    //         }
    //     })
    // },[API,setCustomer])

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={visibleTab} onChange={(e,value)=>setVisibleTab(value)}>
                    <Tab label={'create'} id={0}></Tab>
                    <Tab label={'browse'} id={1}></Tab>
                </Tabs>
            </Box>
            <TabPanel value={visibleTab} index={0}>
                <CreateCustomer setSnackBarMsg={setSnackBarMsg} />
            </TabPanel>
            <TabPanel value={visibleTab} index={1}>

            </TabPanel>
        </Box>
        // <div>
        //     create a customer: 
        //     <form onChange={handleChange} onSubmit={handleSubmit}>
        //         <label>
        //             Name: {" "}
        //             <input required type={"text"} name="name" />
        //         </label>
        //         <label>
        //             E-mail: {" "}
        //             <input required type={"email"} name="email" />
        //         </label>
        //         <label>
        //             Phone Number: {" "}
        //             <input required type={"tel"} name="phoneNumber" />
        //         </label>
        //         <input type={"submit"}/>
        //     </form>
        //     <div id="response"></div>

        //     select a customer:
        //     <form>
        //         <fieldset>
        //         <select size={'5'} id={'last10Customers'}>
        //         </select>
        //         </fieldset>
        //     </form>
        // </div>
    )
}