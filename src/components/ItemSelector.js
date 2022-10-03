import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
const data =  [{sku:'sku1'},{sku:'sku2'}]
export default function ItemSelector () {
    const [items, setItems] = useState([])
    const [skuEntry, setSkuEntry] = useState('')
    return(
    <Autocomplete
    freeSolo
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    options={items}
    inputValue={skuEntry}
    onInputCapture={(event,newValue)=>{
      console.log(event.target.value)
      setSkuEntry(event.target.value)
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