import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useState } from "react";
const filter = createFilterOptions()
export default function ItemSelector({ invoiceItems, setInvoice, setSnackBarMsg }) {

  const [items, setItems] = useState([])
  const [lastSearch, setLastSearch] = useState('')
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <Autocomplete
        size="small"
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={items}
        inputValue={inputValue}
        onInputChange={(event, newValue) => {
          setInputValue(newValue)
        }}
        value={null}
        onChange={(event, newValue) => {
          if (newValue && newValue._id) {
            let existingItem
            let isExistingItem = invoiceItems.some((item, index) => {
              if (item.sku === newValue.sku) {
                existingItem = index
                return true
              }
              return false
            })
            if (isExistingItem) {
              setInvoice((oldVal) => {
                return (
                  {
                    ...oldVal, items: [...oldVal.items.map((val, index) => {
                      if (index !== existingItem) {
                        return val
                      } else if (val.amount + 1 > newValue.quantity) {
                        setSnackBarMsg({ show: true, severity: 'warning', message: 'not enough items in stock' })
                        return val
                      } else {
                        return { ...val, amount: ++val.amount }
                      }
                    })]
                  }
                )
              })
            } else {
              setInvoice((oldVal) => {
                if (newValue.quantity > 0) {
                  return { ...oldVal, items: [...oldVal.items, { _id: newValue._id, sku: newValue.sku, name: newValue.name, price: newValue.price, id: invoiceItems.length + 1, amount: 1 }] }
                }
                setSnackBarMsg({ show: true, severity: 'warning', message: 'out of stock' })
                return oldVal
              })

            }
            setInvoice((oldVal)=>{
              let total =0
              oldVal.items.forEach(item => {
                total+=item.price*item.amount
              })
              return {...oldVal, total: total}
            })
          }
          setInputValue('')
        }
        }
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const { inputValue } = params
          // search the database 
          const isExisting = options.some((option) => option.sku.toLowerCase().includes(inputValue.toLowerCase()));
          if (inputValue !== '' && !isExisting && inputValue !== lastSearch) {
            fetch(`${process.env.REACT_APP_API_URI}/inventory?sku=${inputValue}`)
              .then(response => response.json())
              .then((data) => {
                if (data.length > 0) {
                  setLastSearch(inputValue)
                  setItems(data)
                }
              })
            filtered.push({ inputValue, sku: 'stock item not found' })
          }
          return filtered;
        }}
        renderInput={(params) => <TextField {...params} varian={'standard'} label={"add item"} />}
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