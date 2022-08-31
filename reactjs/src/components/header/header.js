import { Link } from 'react-router-dom';
import '../../main.css';
import './header.css';

import logo from '../../images/icons/Spotify_Icon_RGB_White.png';
import profile from '../../images/icons/user-solid.svg';

function Header() {
  return (
    <div className='header primary'>
      <div className='test'>
        <Link to='/dashboard' className='link'><img src={logo} alt='' className='logo' /></Link>
        <Link to='/profile' className='link'><img src={profile} alt='' className='profile-icon' /></Link>
      </div>
    </div>
  );
}

export default Header;
