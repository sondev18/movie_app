import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import {createTheme, ThemeProvider } from '@mui/material';



const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

const CustomPagination = ({setPage, numOfPages = 20}) => {

    const handlePageChange = (page)=>{
        setPage(page);
        window.scroll(0, 0);
    };

  return (
    <div
    style={{
        width:"60%",
        display:"flex",
        justifyContent:"center",
        marginTop:20,
        margin: "auto",  
        color:"white", 
        background:"#ccc", 
        borderRadius: 10 ,
           
    }} 
    >
       <ThemeProvider theme={darkTheme}>
        <Pagination 
        color="primary" 
        hideNextButton
        hidePrevButton
        count={numOfPages}
         onChange={(e)=> handlePageChange(e.target.textContent)}/>
        </ThemeProvider>
        
    </div>
  )
}

export default CustomPagination