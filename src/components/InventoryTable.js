import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import { useState, useEffect } from 'react'
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
import EditableCell from './EditableCell'
import CircleIcon from '@mui/icons-material/Circle';
const columnHelper = createColumnHelper()

const defaultColumn = {
    cell:(props) => {
        return (
            <EditableCell isEdit={props.table.options.meta.isEdit} value={props.cell.getValue()} rowId={props.row.id} rowToUpdate={props.table.options.meta.rowToUpdate} setRowToUpdate={props.table.options.meta.setRowToUpdate} discardedRow={props.table.options.meta.discardedRow} setDiscardedRow={props.table.options.meta.setDiscardedRow} colId={props.column.id} />
        )
    }
}
const columns = [
    columnHelper.display({
        header:()=>'Actions',
        id: 'actions',
        cell: ({row:{id,original}, table }) => {
            return (<RowActions isEdit={table.options.meta.isEdit} setIsEdit={table.options.meta.setIsEdit} rowId={id} rowToUpdate={table.options.meta.rowToUpdate} setRowToUpdate={table.options.meta.setRowToUpdate} discardedRow={table.options.meta.discardedRow} setDiscardedRow={table.options.meta.setDiscardedRow} original={original} table={table} snackBarMsg={table.options.meta.snackBarMsg} setSnackBarMsg={table.options.meta.setSnackBarMsg} />)
    },
      }),
    columnHelper.accessor('sku',{
        header:()=>'SKU',
    }),
    columnHelper.accessor('name',{
        header:()=>'Name'
    }),
    columnHelper.accessor('color',{
        header:()=>'Color',
        cell:(props)=>{
            if(props.row.id===props.table.options.meta.isEdit)
            {
             return <EditableCell isEdit={props.table.options.meta.isEdit} value={props.cell.getValue()} rowId={props.row.id} rowToUpdate={props.table.options.meta.rowToUpdate} setRowToUpdate={props.table.options.meta.setRowToUpdate} discardedRow={props.table.options.meta.discardedRow} setDiscardedRow={props.table.options.meta.setDiscardedRow} colId={props.column.id} /> 
            }
            return <CircleIcon sx={{color:props.getValue()}} />
        }
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
    const [isEdit, setIsEdit] = useState('')
    const [rowToUpdate, setRowToUpdate] = useState({})
    const [discardedRow, setDiscardedRow] = useState('')
    const table=useReactTable({ data:props.data, defaultColumn:defaultColumn, columns:columns, state: {sorting}, getCoreRowModel: getCoreRowModel(),getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting, meta:{ snackBarMsg: props.snackBarMsg, setSnackBarMsg: props.setSnackBarMsg, isEdit, setIsEdit, rowToUpdate, setRowToUpdate,discardedRow , setDiscardedRow, setInventoryNav: props.setData } })
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URI}/inventory`).then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setInventoryNav(() => ([...data]))
                }
            })
    }, [])
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
                            return <TableCell sx={{padding:isEdit===row.id?1:'auto'}} key={cell.id}>{
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
