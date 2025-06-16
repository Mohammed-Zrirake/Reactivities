import { Navigate, Outlet, useLocation } from "react-router";
import { useAccounts } from "../../lib/hooks/useAccounts"
import { Typography } from "@mui/material";


export default function RequireAuth() {
    const {currentUser,loadingUserInfo} = useAccounts(); 
    const location = useLocation();
    if(loadingUserInfo) return <Typography>loading...</Typography>  
    if(!currentUser) return <Navigate to='/login' state={{from:location}}/>
    return (
    <Outlet/>
  )
}
