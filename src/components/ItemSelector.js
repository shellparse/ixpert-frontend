import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useState } from "react";
const filter = createFilterOptions()
export default function ItemSelector () {
    const [items, setItems] = useState([])
    const [itemValue, setItemValue] = useState(null)
    const [lastSearch, setLastSearch] = useState('')
    return(

    <Autocomplete
    freeSolo
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    options={items}
    value={itemValue}
    onChange={(event, newValue) => {
      if (typeof newValue === 'string') {
        setItemValue({
          sku: newValue,
        });
      } else if (newValue && newValue.inputValue) {
        // Create a new value from the user input
        setItemValue({
          sku: newValue.inputValue,
        });
      } else {
        setItemValue(newValue);
      }
    }}
    filterOptions={(options, params) => {
      const filtered = filter(options, params)
      const { inputValue } = params
      // search the database 
      const isExisting = options.some((option) => option.sku.toLowerCase().includes(inputValue.toLowerCase()));
      if (inputValue !== '' && !isExisting && inputValue!==lastSearch) {
        console.log('all conditions are met so we fetching input not empty string, options does not includ input values and empty search is false')
        fetch(`${process.env.REACT_APP_API_URI}/inventory?sku=${inputValue}`)
        .then(response=>response.json())
        .then((data)=>{
          if(data.length>0){
          setLastSearch(inputValue)
          setItems(data)
          }
        })
          filtered.push({inputValue, sku:'stock item not found'})
      }
      return filtered;
    }}
    renderInput={(params) =><TextField {...params} varian={'standard'} label={"add item"}/>}
    getOptionLabel={(option) => {
      // Value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.inputValue) {
        return option.inputValue;
      }
      // Regular option
      return option.sku;
    }}
    renderOption={(props, option) => <li {...props}>{option.sku}</li>}
    ></Autocomplete>
    )
}