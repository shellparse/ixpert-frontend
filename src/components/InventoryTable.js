import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable} from '@tanstack/react-table'
import { useState } from 'react'
import RowActions from '../components/RowActions'
const columnHelper = createColumnHelper()
const columns = [
    columnHelper.display({
        header:()=>'Actions',
        id: 'actions',
        cell: props => <RowActions row={props.row} />,
      }),
    columnHelper.accessor('sku',{
        header:()=>'SKU',
    }),
    columnHelper.accessor('name',{
        header:()=>'Name'
    }),
    columnHelper.accessor('color',{
        header:()=>'Color'
    }),
    columnHelper.accessor('price',{
        header:()=>'Price'
    }),
    columnHelper.accessor('quantity',{
        header:()=>'Quantity'
    }),
    columnHelper.accessor('description',{
        header:()=>'Description'
    }),
    columnHelper.accessor('category',{
        header:()=>'Category'
    }),
    columnHelper.accessor('brand',{
        header:()=>'Brand'
    }),
    columnHelper.accessor('model',{
        header:()=>'Model'
    }),
    columnHelper.accessor('imei',{
        header:()=>'IMEI'
    }),
    columnHelper.accessor('ram',{
        header:()=>'Ram'
    }),
    columnHelper.accessor('storage',{
        header:()=>'Storage'
    })
]

export default function InventoryTable (props) {
    const [sorting, setSorting] = useState([])
    const table=useReactTable({data:props.data, columns:columns, state: {sorting}, getCoreRowModel: getCoreRowModel(),getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting,enableRowSelection:true })
    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup)=>{
                    return <tr key={headerGroup.id}>{headerGroup.headers.map((header)=>{
                        return <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={header.column.getCanSort()?{cursor:'pointer', userSelect:'none'}:{}}>{
                            flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}{{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted()] ?? null}</th>
                    })}</tr>
                })}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row)=>{
                    return <tr style={row.id%2===0?{backgroundColor:'#d7edff'}:{backgroundColor:''}} key={row.id}>{row.getVisibleCells().map((cell)=>{
                        return <td key={cell.id}>{
                            flexRender(cell.column.columnDef.cell,
                                cell.getContext()
                                )}</td>
                    })}</tr>
                })}
            </tbody>
            <tfoot>
               
            </tfoot>
        </table>
    )
    
}