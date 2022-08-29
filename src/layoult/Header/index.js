import Brand from './Brand';
import Menu from './Menu';
import MenuUsuario from './MenuUsuario';
import Navbar from './Navbar';

const Header = () => {
    return ( 
        <>
            <Navbar>
                <Brand />
                <Menu />
                <MenuUsuario />
            </Navbar>
        </>
     );
}
 
export default Header;