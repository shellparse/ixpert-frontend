import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
const columnHelper = createColumnHelper()
const columns = [
    columnHelper.accessor('sku'),
    columnHelper.accessor('name'),
    columnHelper.accessor('price')
]
export default function InventoryTable (props) {
    const table=useReactTable({data:props.data, columns:columns, getCoreRowModel: getCoreRowModel() })
    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup)=>{
                    return <tr key={headerGroup.id}>{headerGroup.headers.map((header)=>{
                        return <th key={header.id}>{header.id}</th>
                    })}</tr>
                })}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row)=>{
                    return <tr key={row.id}>{row.getAllCells().map((cell)=>{
                        return <td key={cell.id}>{cell.getValue()}</td>
                    })}</tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
    
}