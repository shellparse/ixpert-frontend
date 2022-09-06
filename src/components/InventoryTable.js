// import { forwardRef, useMemo } from 'react';
// import MaterialTable from 'material-table'
// import { ThemeProvider, createTheme } from '@mui/material';
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';

// const theme = createTheme()
// const tableIcons = {
//     Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//     Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//     Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//     DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//     Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//     FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//     LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//     NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//     ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//     SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//     ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//     ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
//   };
// const cols = [
//     {
//         title:'SKU',
//         field: 'sku'
//     },
//     {
//         title:'Name',
//         field:'name'
//     },
//     {
//         title:'Color',
//         field:'color'
//     },
//     {
//         title:'Description',
//         field:'description'
//     },
//     {
//         title:'Price',
//         field:'price'
//     },
//     {
//         title:'Quantity',
//         field:'quantity'
//     },
//     {
//         title:'Updated on',
//         field:'lastUpdated'
//     },
//     {
//         title:'Image',
//         field:'image'
//     },
//     {
//         title:'Brand',
//         field:'brand'
//     },
//     {
//         title:'Model',
//         field:'model'
//     },
//     {
//         title:'IMEI',
//         field:'imei'
//     },
//     {
//         title:'RAM',
//         field:'ram'
//     },
//     {
//         title:'Storage',
//         field:'storage'
//     }
// ]

// export default function InventoryTable (props) {
//     const colMemo = useMemo(() => [...cols], [])
//     return (
//         <ThemeProvider theme={theme}>
//             <MaterialTable title='Stock' icons={tableIcons} data={props.inventoryNav} columns={colMemo}
//                             editable={{onRowUpdate:async (newData,oldData)=>{
//                                      return fetch(`${process.env.REACT_APP_API_URI}/inventory/${oldData._id}`, {
//                                         method: 'PUT',
//                                         headers:{
//                                             'Content-Type': 'application/json'
//                                         },
//                                         body: JSON.stringify(newData)
//                                     }).then((response) => response.json())
//                                     .then((data)=>{
//                                         console.log(data)
//                                         const dataUpdate = [...props.inventoryNav];
//                                         const index = oldData.tableData.id;
//                                         dataUpdate[index] = newData;
//                                         props.setInventoryNav([...dataUpdate]);
//                                     })
//                             }}}
//                             options={{
//                                 actionsColumnIndex: -1
//                               }}
//                             style={{background:'yellow',overflow:'auto'}} />
//         </ThemeProvider>
//     )
// }