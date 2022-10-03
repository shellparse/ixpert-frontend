import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
const data =  [{sku:'sku1'},{sku:'sku2'}]
export default function ItemSelector () {
    const [items, setItems] = useState([])
    const [value, setValue] = useState(null)
    return(
    <Autocomplete
    freeSolo
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    options={data}
    value={value}
    onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            sku: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            sku: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
    renderInput={(params) =><TextField {...params} varian={'standard'} label={"add item"}/>}
    getOptionLabel={(option)=>{
        if(option.sku){
            return option.sku
        }else {
            console.log(option)
            return 'fuck yeah' 
        }
    }}
    ></Autocomplete>
    )
}