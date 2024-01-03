import '../Styles/TopMenu.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function TopMenu() {
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="HeaderBar">
            <ul className="Items">
                <li className='Photo'><Link to="/Home"><p>PHOTO</p></Link></li>
                <li><Link to="/Upload"><p>UPLOAD</p></Link></li>
                <li><Link to="/Settings"><p>SETTINGS</p></Link></li>
                <li><Link to="/Log"><p>LOG HISTORY</p></Link></li>
                <li><button onClick={handleLogout}>Đăng Xuất</button></li> {/* Nút đăng xuất */}
            </ul>
        </div>
    );
}

export { TopMenu };
