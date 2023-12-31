import '../Styles/TopMenu.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Settings } from './Settings';
import { Content } from './Content';
function TopMenu (){
    return (
    <div className="HeaderBar">
        <ul className="Items">
          <li className='Photo'><Link to="/Home"><p>PHOTO</p></Link></li>
          <li><Link to=""><p>UPLOAD</p></Link></li>
          <li><Link to="/Settings"><p>SETTINGS</p></Link></li>
        </ul>

        <Routes>
          <Route path='/Home' element ={<Content/>}/>
          <Route path='/Settings' element ={<Settings/>}/>
        </Routes>
    </div>
    )
}

export {TopMenu}
