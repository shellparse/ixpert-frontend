import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoard from './routes/dashboard'
import LogIn from './routes/login'
import RequireAuth from './components/RequireAuth'
import Greeting from './components/greeting'
import Customers from './components/Customers'
import RepairSlip from './components/RepairSlip'
import Inventory from './components/Inventory'
import { ThemeProvider,createTheme } from '@mui/material/styles'
const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
      light:'#BBC2E5AA',
      dark:'#1F285A',
      lighter:'#BBC2E544'
    },
    secondary: {
      main: '#EC1C24',
    },
}})

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth><App /></RequireAuth>}>
          <Route index element={<Greeting />} />
        </Route>
        <Route path="/dashboard" element={ <RequireAuth><DashBoard /></RequireAuth>}>
          <Route path='customers' element={<Customers />}/>
          <Route path='repairslip' element={<RepairSlip />} />
          <Route path='inventory' element={<Inventory />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
   </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
