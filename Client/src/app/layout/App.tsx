
import NavBar from "./NavBar";
import { Container, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";


   function App(){
      const location = useLocation();
   return (
   <div>
      <CssBaseline/>
      {location.pathname === '/' ?<HomePage/> :(
         <>
          <NavBar/>
      <Container maxWidth='xl' sx={{mt:3}} >
       <Outlet/>
      </Container>
         </>
      )}
  </div>
   )
   }

      
   
   export default App
