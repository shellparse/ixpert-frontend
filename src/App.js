import './App.css'
import { Outlet,Link } from "react-router-dom"
import Userfront  from "@userfront/react"
import LogOut from './routes/logout'

function App() {
    return (
      <div>
        <h1>iXpert</h1>
        {!Userfront.tokens.accessToken?<Link to="/login">Login</Link>:<LogOut/>}
        <Outlet/>
      </div>
    )
  }


export default App
