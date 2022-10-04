import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useState } from "react";
const filter = createFilterOptions()
export default function ItemSelector () {
    const [items, setItems] = useState([])
    const [itemValue, setItemValue] = useState(null)
    //const [skuEntry, setSkuEntry] = useState('')
    return(

    <Autocomplete
    freeSolo
    options={items}
    value={itemValue}
    onChange={(event,newValue)=>{
      setItemValue(newValue)
    }}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);
      const { inputValue } = params;
      // search the database 
      const isExisting = options.some((option) => option.sku.includes(inputValue));
      console.log('is existing', isExisting)
      if (inputValue !== '' && !isExisting) {
        console.log('getting new values')
        fetch(`${process.env.REACT_APP_API_URI}/inventory?sku=${inputValue}`)
        .then(response=>response.json())
        .then((data)=>{
          console.log('setting items')
          setItems(data)
        })
        // filtered.push({
        //   inputValue,
        //   sku: `search "${inputValue}"`,
        // });
      }

      return filtered;
    }}
    renderInput={(params) =><TextField {...params} varian={'standard'} label={"add item"}/>}
    getOptionLabel={(option)=>{
      return option.sku
    }}
    ></Autocomplete>
    )
}