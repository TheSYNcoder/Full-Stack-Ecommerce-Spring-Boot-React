import React from 'react';
import {BrowserRouter, Switch, Route }  from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import PrivateRoute from "./Components/PrivateRoute";
import CartScreen from "./Pages/CartScreen";
import './App.css';
import AuthContext from "./context";
// var AuthService = require("./Service/AuthenticationService");
import AuthService from "./Service/AuthenticationService";



function App() {


  const [ auth , setAuth ] = React.useState( false);
  const [user, setUser ] = React.useState(null);

  React.useEffect(() => {
    AuthService(setUser, setAuth);        
  },[]);
  React.useEffect(() => {
    AuthService(setUser, setAuth);    
  },[auth]);



  return (
      <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={props => <Home /> } />
            <Route exact path="/login" render={props => <Login /> } />
            <Route exact path="/register" render={props => <Register /> } />
            <PrivateRoute authed={auth} exact path="/products" component={Products}  />
            <PrivateRoute authed={auth} exact path="/cart" component={CartScreen}  />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
