import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import { useState } from 'react'
import RowActions from '../components/RowActions'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ArrowUpward  from '@mui/icons-material/ArrowUpward'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
const columnHelper = createColumnHelper()
const columns = [
    columnHelper.display({
        header:()=>'Actions',
        id: 'actions',
        cell: ({getValue, row:{index,getAllCells}, column:{id}, table, row}) => {
            const editHandler = (e)=>{
                table.options.meta.editRow(getValue(), index, id, getAllCells(),e)
            }
            const applyHandler = (e) => {
                table.options.meta.saveRowChanges(e)
            }
            const discardHandler = (e) =>{
                table.options.meta.discardRowChanges(e)
            }
        
            return (<RowActions onEdit={editHandler} onApply={applyHandler} onDiscard={discardHandler} />)
    },
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
function editRow(value, index, id, row, event){
    let parent = event.target.closest('tr')
    let cellsArray = Array.from(parent.children)
    cellsArray.forEach((tableCell,index)=>{
        if(index!==0){
            let input = document.createElement('input')
            input.value=tableCell.innerHTML
            tableCell.appendChild(input)
            if(tableCell.childNodes.length===2)
                tableCell.firstChild.remove()
        }
    })
}
function saveRowChanges(){

}
function discardRowChanges(event){
    let parent = event.target.closest('tr')
    let cellsArray = Array.from(parent.children)
    cellsArray.forEach((tableCell,index) =>{
        if(index!==0){
            tableCell.innerHTML=tableCell.firstElementChild.value
        }
    }) 
}
export default function InventoryTable (props) {
    const [sorting, setSorting] = useState([])
    const table=useReactTable({data:props.data, columns:columns, state: {sorting}, getCoreRowModel: getCoreRowModel(),getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting, meta:{editRow, saveRowChanges, discardRowChanges} })
    return (

        <TableContainer component={Paper} sx={
            {
                height:400,
                "&::-webkit-scrollbar": {
                    width: 5,
                    height: 5,
                    borderRadius:2
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: 'contrastText'
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: 'primary.main',
            borderRadius: 2
        }}} >
            <Table stickyHeader sx={{height:'max-content'}}>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup)=>{
                        return <TableRow key={headerGroup.id}>{headerGroup.headers.map((header)=>{
                            return <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()} style={header.column.getCanSort()?{cursor:'pointer', userSelect:'none'}:{}}>{
                                flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}{{
                                        asc: <ArrowUpward />,
                                        desc: <ArrowDownward />,
                                    }[header.column.getIsSorted()] ?? null}</TableCell>
                        })}</TableRow>
                    })}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row)=>{
                        return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)':{backgroundColor:'primary.lighter'}, ':hover':{backgroundColor:'primary.light'},'transition':'ease 0.2s' }} key={row.id}>{row.getVisibleCells().map((cell)=>{
                            return <TableCell key={cell.id}>{
                                flexRender(cell.column.columnDef.cell,
                                    cell.getContext()
                                    )}</TableCell>
                        })}</TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}