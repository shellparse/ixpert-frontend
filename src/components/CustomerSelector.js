import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URI

export default function CustomerSelector() {
    const [customers, setCustomers] = useState([])
    const [temp, setTemp] = useState({name: 'opt'})
    useEffect(() => {
        fetch(`${API}/customer`).then((res) => res.json())
            .then((data) => {
                if (data) {
                    setCustomers(data)
                }
            })
    }, [])
    return (
        <Autocomplete id={'select-customer'}
            size={'small'}
            sx={{ minWidth: '210px', display: 'inline-block' }}
            fullWidth
            isOptionEqualToValue={(option, value) => option.value === value.value}
            options={customers}
            renderInput={(params) => {
                return <TextField {...params} varian={'standard'} label={"select customer"} />
            }
            }
            getOptionLabel={(option) => {
                return option.name
            }}
            value={temp}
            onChange={
                (event, newValue) => {
                    if (newValue) {
                        setTemp((oldVal) => {
                            return { ...oldVal, name: newValue.name, phoneNumber: newValue.phoneNumber, email: newValue.email, _id: newValue._id }
                        })
                    }
                }
            }

        />
    )
}