import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Userfront from "@userfront/react";
export default function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Navigate to="/login"  replace />;
    }
  
    return children;
  }