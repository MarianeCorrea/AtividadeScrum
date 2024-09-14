// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import LivroList from './components/LivroList';
import UsuarioList from './components/UsuarioList';
import Home from './components/Home';
import LoginUser from './components/LoginUser';
import { getAuthToken, setAuthToken } from './components/AuthToken'; // Ajuste o caminho conforme necessário
import './App.css';

// Componente de Rota Protegida
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!getAuthToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Atualiza o estado de autenticação ao iniciar a aplicação
    setIsAuthenticated(!!getAuthToken());
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/livros">Gerenciar Livros</Link>
            </li>
            <li>
              <Link to="/usuarios">Gerenciar Usuários</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <LoginUser onLogin={handleLogin} />}
          </Route>
          <Route path="/" exact>
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>
          <PrivateRoute path="/livros" component={LivroList} />
          <PrivateRoute path="/usuarios" component={UsuarioList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
