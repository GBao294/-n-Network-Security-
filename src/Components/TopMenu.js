import '../Styles/TopMenu.css';
import { Link } from 'react-router-dom';
function TopMenu (){
    return (
    <div className="HeaderBar">
        <ul className="Items">
          <li className='Photo'><Link to="/Home"><p>PHOTO</p></Link></li>
          <li><Link to="/Upload"><p>UPLOAD</p></Link></li>
          <li><Link to="/Settings"><p>SETTINGS</p></Link></li>
          <li><Link to="/Log"><p>LOG HISTORY</p></Link></li>
        </ul>
    </div>
    )
}

export {TopMenu}
