import './App.css'
import { Outlet,Link } from "react-router-dom"
import Userfront  from "@userfront/react"
import LogOut from './routes/logout'


function App() {

    return (
          <>
          <h1 style={{backgroundColor:'theme.palette.primary.main'}}>iXpert</h1>
          {!Userfront.tokens.accessToken?<Link to="/login">Login</Link>:<LogOut/>}
          <Outlet/>
          </>
    )
  }


export default App
