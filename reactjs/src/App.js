
import { useEffect, useState } from 'react';
import { accessToken } from './token';

import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import './main.css';

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="secondary app-header">
      <section className=''>
        {!token ? (<Login />) : (<Dashboard />)}
      </section>
    </div>
  );
}

export default App;
