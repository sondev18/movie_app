import SimpleBottomNavigation from '../MainNav';
import './Header.css';

const Header=()=>{
    return(
        <span onClick={() =>window.scroll(0, 0)}
         className="header">
             Movie  
             <SimpleBottomNavigation/>
        </span>
    )
} 

export default Header;