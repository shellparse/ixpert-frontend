import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, SortingState } from '@tanstack/react-table'

export default function Inventory () {
    const [inputs,setInputs] = useState({})
    const inventoryNav = useOutletContext()[2]
    const setInventoryNav = useOutletContext()[3]
    const activeItem = useOutletContext()[4]
    const [sorting, setSorting] = useState([])
    const table = useReactTable({data: inventoryNav, columns:[{header:'SKU',accessorKey:'sku'},{header: 'Name',accessorKey:'name'},{header:'Price',accessorKey:'price', sortingFn:"alphanumeric", enableSorting:true, sortDescFirst:true}],
                                 getCoreRowModel: getCoreRowModel(),
                                state: {sorting},
                                onSortingChange:setSorting,
                                getSortedRowModel:getSortedRowModel()})
    console.log(table.getRowModel())

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URI}/inventory`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response)=>response.json())
        .then((data)=>{
            const resDiv = document.getElementById('response')
            if (data.acknowledged){
                setInventoryNav((values)=>([...values,inputs]))
                resDiv.style='visible'
                resDiv.innerHTML="item created !!"
                resDiv.setAttribute('class','notify-success')
                document.getElementById('createItem').reset()
            }else if (data.code===11000) {
                resDiv.style='visible'
                resDiv.innerHTML="error: duplicate item"
                resDiv.setAttribute('class','notify-fail')
            }else {
                resDiv.style='visible'
                resDiv.innerHTML="error: something went wrong"
                resDiv.setAttribute('class','notify-fail')
            }
            setTimeout(()=>{
                resDiv.style.visibility='hidden'
            },3000)
        })
    }
    function handleChange(e) {
        let target = e.target
        let name = target.name
        let value = target.value
        if(e.target.type==="number")value=parseFloat(value)
        setInputs((values)=>({...values,[name]:value}))
    }
    return (
        
        <div>
              <Tabs className={'tabs'} selectedTabClassName={"selectedTab"} selectedTabPanelClassName={"selectedTabPanel"}>
                <TabList className={"tabList"}>
                    <Tab className={"tab"}>Create stock item</Tab>
                    <Tab  className={"tab"}>Browse stock items</Tab>
                </TabList>

                <TabPanel className={"tabPanel"}>
                    <form onChange={handleChange} onSubmit={handleSubmit} id="createItem">
                        <label>
                            SKU:
                            <input type={"text"} name={"sku"} id={"sku"} required />
                        </label>
                        <label>
                            Name:
                            <input type={"text"} name={"name"} id={"name"} required />
                        </label>
                        <label>
                            Category:
                            <input type={"text"} name={"category"} id={"category"} />
                        </label>
                        <label>
                            Description:
                            <input type={"text"} name={"description"} id={"description"} />
                        </label>
                        <label>
                            Price:
                            <input type={"number"} name={"price"} step="0.01" id={"price"} required />
                        </label>
                        <label>
                            Quantity:
                            <input type={"number"} name={"quantity"} id={"quantity"} required />
                        </label>
                        <label>
                            Brand:
                            <input type={"text"} name={"brand"} id={"brand"} />
                        </label>
                        <label>
                            Model:
                            <input type={"text"} name={"model"} id={"model"} />
                        </label>
                        <label>
                            IMEI:
                            <input type={"text"} name={"imei"} id={"imei"} />
                        </label>
                        <label>
                            Ram:
                            <input type={"text"} name={"ram"} id={"ram"} />
                        </label>
                        <label>
                            Storage:
                            <input type={"text"} name={"storage"} id={"storage"} />
                        </label>
                        <label>
                            Color:
                            <input type={"text"} name={"color"} id={"color"} />
                        </label>
                        <input type={"submit"} name={"submit"} value={"create"} />
            </form>
            <div id="response"></div>
            </TabPanel>
            <TabPanel className={"tabPanel"}>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : (
                                    <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>)}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </TabPanel>
            </Tabs>
        </div>
    )
}