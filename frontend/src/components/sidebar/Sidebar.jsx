import './Sidebar.css'
import { Link } from 'react-router-dom';

function Sidebar(){
    return(
        <>
        <div className="container-sidebar">
            <ul>
                <li className=''><Link to="/">INVENTARIO</Link></li>
                <li className=''><Link to="/Structure">STRUTTURA</Link></li>
                <li className=''><Link to="/Insert">INSERIMENTO</Link></li>
            </ul>
        </div>
        
        
        </>
    )
}
export default Sidebar;