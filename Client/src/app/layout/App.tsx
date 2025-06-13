
import NavBar from "./NavBar";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";


   function App(){
   return (
   <div>
      <CssBaseline/>
      <NavBar/>
      <Container maxWidth='xl' sx={{mt:3}} >
       <Outlet/>
      </Container>
  </div>
   )
   }

      
   
   export default App
