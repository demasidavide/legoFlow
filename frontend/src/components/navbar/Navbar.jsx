import './Navbar.css';
import lego from '../../assets/lego.svg'

function Navbar(){
    return(
        <>
        <div className="container">
            <span><img src={lego} alt="Logo pezzo Lego"></img></span>
            <span className="logo">LegoFlow</span>
        </div>
        </>
    )
}

export default Navbar;