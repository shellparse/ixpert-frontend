import {Autocomplete, TextField} from "@mui/material"
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URI

export default function CustomerSelector ({invoiceFooter, setInvoiceFooter}) {
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    useEffect(()=>{
        fetch(`${API}/customer`).then((res)=>res.json())
        .then((data)=>{
            if(data){
                setCustomers(data)
            }
        })
    },[])
    return (
        <Autocomplete id={'select-customer'}
                    size={'small'}
                    loading
                    options={customers}
                    renderInput={(params) => 
                    {
                    return <TextField {...params} varian={'standard'} label={"select customer"}/>
                    }
                }
                    getOptionLabel={(option)=>{
                        return option.name}}
                    value={selectedCustomer}
                    onChange={
                        (event,newValue)=>{
                            setSelectedCustomer(newValue)
                            setInvoiceFooter((oldVal)=>{
                                return {...oldVal, name: newValue.name, phoneNumber: newValue.phoneNumber, email: newValue.email, _id: newValue._id}
                            })
                        }
                    }
                    />
    )
}