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
    const table=useReactTable({data:props.data, columns:columns, state: {sorting}, getCoreRowModel: getCoreRowModel(),getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting })
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}} aria-label='simple table'>
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
                        return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} style={row.id%2===0?{backgroundColor:'#d7edff'}:{backgroundColor:''}} key={row.id}>{row.getVisibleCells().map((cell)=>{
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