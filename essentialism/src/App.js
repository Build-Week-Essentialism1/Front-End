import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Essentialism from "./components/Essentialism";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import ValueList from "./components/ValueList";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <Router>
        <Switch>
        <Route exact path="/essentialism" component={Essentialism} />
        <Route exact path="/">
            <LogIn />
            <Register />
     </Route> 
    <Route exact path ="/dashboard" >
            <Dashboard />
           </Route>
        </Switch>

    </Router>
  );
}

export default App;
