import {Autocomplete, TextField} from "@mui/material"
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URI

export default function CustomerSelector () {
    const [customers, setCustomers] = useState([])
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
                    options={customers}
                    renderInput={(params) => 
                    {
                    return <TextField {...params} varian={'standard'} label={"select customer"}/>
                    }
                }
                    getOptionLabel={(option)=>{
                        return option.phoneNumber}}
                    />
    )
}