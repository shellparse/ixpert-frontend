import { Navigate } from "react-router-dom"
import Userfront from "@userfront/react"
export default function RequireAuth({ children }) {
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Navigate to="/login"  replace />;
    }
  
    return children;
  }