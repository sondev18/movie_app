import React,{useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import   {useNavigate} from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(value ===  0) navigate("/");
    else if(value === 1) navigate("/movies");
    else if(value === 2) navigate("/series");
    else if(value === 3) navigate("/search");
  }, [value, navigate])
  
  return (
    <Box sx={{  }}>
      <BottomNavigation
      sx={{ width: "100%",
      // position:"fixed",
      // bottom: 0,
      background: "rgba(0, 0, 0, 0)",
      marginRight: 10,
      // zIndex:100,
      }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
        sx={{color: "#fff"}} 
        label="Trending" 
        icon={<WhatshotIcon />} />

        <BottomNavigationAction 
        sx={{color: "#fff"}} 
        label="Movies" 
        icon={<MovieIcon />} />

        <BottomNavigationAction 
        sx={{color: "#fff"}} 
        label="TV Series" 
        icon={<TvIcon />} />

        <BottomNavigationAction 
        sx={{color: "#fff"}} 
        label="Search" 
        icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}