import '../../main.css';
import './login.css'

import Header from '../../components/header/header';

import logo from '../../images/icons/Spotify_Icon_RGB_Green.png';

function Login() {
  return (
    <div className='app-header secondary'>
      <Header />
      <div className='login-container'>
        <img src={logo} alt='' className='small-logo' />
        <h1>Login</h1>
        <p>In order to use this app, please login using your Spotify account</p>
        <button className='primary button'>
          <a href='http://localhost:3001/spotify/v1/login' className='link'>Login to Spotify</a>
        </button>
      </div>
    </div>
  );
}

export default Login;
