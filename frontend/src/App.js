import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';
import Home from './components/Home/Home';
import Contactos from './components/Contactos/Contactos';
import Empresas from './components/Empresas/Empresas';
import Regiones from './components/Regiones/Regiones';
import Usuarios from './components/Usuarios/Usuarios';
import { UserProvider } from './components/Usuarios/UserContext';

function App(props) {
  const [token, setToken] = useState(null);
  const history = useHistory();
  
  //buscar inicialmente si hay un token en localStorage, si no redirigir a login
  const handleLogin = async (payload) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload)
    };
    const response = await fetch('http://localhost:3000/login', options);
    const result = await response.json();

    const responseToken = result.token;
    console.log(responseToken);
    if (responseToken === null || responseToken === '') {
      alert('Invalid email or password.');
    } else {
      setToken(responseToken);
      localStorage.setItem('token', responseToken);
      history.push("/");
      setTimeout( () => {window.location.reload()},1);
    }
  }

  return (
    <UserProvider>
      <div className="App">
          <Navbar token={token} />
          <Switch>
            <Route path='/' exact component={() =><Home />} />
            <Route path='/login' component={() => <Login handleLogin={handleLogin} />} />
            <Route path='/contactos' component={() => <Contactos />} />
            <Route path='/empresas' component={() => <Empresas />} />
            <Route path='/regiones' component={() => <Regiones />} />
            <Route path='/usuarios' component={() => <Usuarios />} />
          </Switch>
      </div>
    </UserProvider>
  );
}

export default App;
