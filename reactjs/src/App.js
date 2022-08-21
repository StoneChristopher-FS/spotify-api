import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  return (
    <div className="App">
      <header className="App-header">
        {
          code ? <Dashboard code={code} /> 
          : <Login />
        }
      </header>
    </div>
  );
}

export default App;
