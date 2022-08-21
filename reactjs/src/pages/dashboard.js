import axios from 'axios';
import {useEffect} from 'react';
import '../App.css';

function Dashboard({code}) {
    let ignore = false;
    useEffect(() => {
        if(!ignore) {
            axios.post('http://localhost:3001/spotify/v1/auth', { code })
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        return () => {
            ignore = true;
        }
    }, [code]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Successful</h1>
      </header>
    </div>
  );
}

export default Dashboard;
