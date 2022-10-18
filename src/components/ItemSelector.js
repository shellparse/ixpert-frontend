import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useEffect, useState } from "react";
const filter = createFilterOptions()
export default function ItemSelector ({setInvoiceFooter, invoiceItems, setInvoiceItems}) {

    const [items, setItems] = useState([])
    const [lastSearch, setLastSearch] = useState('')
    const [inputValue, setInputValue]= useState('')
    
    useEffect(()=>{
      setInvoiceFooter((oldVal)=>{
        let total = 0
        invoiceItems.forEach((item)=>{
          total+=item.price*item.amount
        })
        return {...oldVal, total}
      })
    },[invoiceItems, setInvoiceFooter])
    return(
    <>
    <Autocomplete
    size="small"
    freeSolo
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    options={items}
    inputValue={inputValue}
    onInputChange={(event, newValue)=>{
      setInputValue(newValue)
    }}
    value={null}
    onChange={(event, newValue) => {
      if (newValue && newValue._id){
        let existingItem
        let isExistingItem = invoiceItems.some((item,index)=>{
          if (item.sku===newValue.sku){
              existingItem=index
              return true 
          }
          return false
      })
      if (isExistingItem){
        setInvoiceItems((oldVal)=>{
          return [...oldVal.map((val, index)=>index!==existingItem? val: {...val,amount: ++val.amount})]
        })
      } else {
        setInvoiceItems((oldVal)=>{
          return [...oldVal,{...newValue, id: invoiceItems.length+1, amount: 1}]
        })
          
      }
    }
    setInputValue('')
  }
}
    filterOptions={(options, params) => {
      const filtered = filter(options, params)
      const { inputValue } = params
      // search the database 
      const isExisting = options.some((option) => option.sku.toLowerCase().includes(inputValue.toLowerCase()));
      if (inputValue !== '' && !isExisting && inputValue!==lastSearch) {
        console.log('all conditions are met so we fetching input not empty string, options does not include input values and empty search is false')
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

    </>
    )
}