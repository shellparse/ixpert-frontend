import { TextField, Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { useState } from "react";
const filter = createFilterOptions()
export default function ItemSelector () {
    const [items, setItems] = useState([])
    const [lastSearch, setLastSearch] = useState('')
    const [invoiceItems, setInvoiceItems] = useState([])
    const [inputValue, setInputValue]= useState('')
    const colDef = [
      {
        field:'sku',
        headerName: 'SKU',
        flex: 1,
        sortable: false
      },
      {
        field: 'name',
        headerName: 'Item',
        flex: 2,
        sortable: false
      },
      {
        field: 'amount',
        headerName: 'Quantity',
        flex: 1,
        sortable: false
      },
      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        sortable: false
      },
      {
        field: 'total',
        headerName: 'Total',
        flex: 1,
        sortable: false,
        valueGetter: (params)=>params.row.amount*params.row.price
      }

    ]
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
    <DataGrid
      rows={invoiceItems}
      columns={colDef}
      disableColumnMenu
      checkboxSelection
      disableSelectionOnClick
      autoHeight
      hideFooter
      rowHeight={30}
      components={{
      NoRowsOverlay: ()=><Box alignItems="center" justifyContent="center" display={'flex'}><InfoTwoToneIcon /><h3>Add Items</h3></Box>,
      }}
    />
    </>
    )
}