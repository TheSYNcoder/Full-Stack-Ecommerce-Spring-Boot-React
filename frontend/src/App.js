import React from 'react';
import {BrowserRouter, Switch, Route }  from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import PrivateRoute from "./Components/PrivateRoute";
import './App.css';


function App() {


  const [ auth , setAuth ] = React.useState( true);
  const AuthContext = React.createContext();
  return (
      <AuthContext.Provider value={{auth, setAuth}}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={props => <Home /> } />
            <Route exact path="/login" render={props => <Login /> } />
            <Route exact path="/register" render={props => <Register /> } />
            <PrivateRoute authed={auth} exact path="/products" component={Products}  />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
