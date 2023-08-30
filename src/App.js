import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './componets/Header/Header'
import SimpleBottomNavigation from './componets/MainNav';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';
import Router from './routes';


function App() {
    
  return (
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
  );
}

export default App