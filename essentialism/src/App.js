import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Essentialism from "./components/Essentialism";
import Register from "./components/Register";
import Login from "./components/LogIn";


function App() {
  return (
     
    <Router>
          <LogIn />
          <Register />
      <Switch>
        {/* <div>Essentialism</div> */}
        <Route exact path="/essentialism" component={Essentialism} />
        <Route exact path="/" component={(Login, Register)} />
      </Switch>
    </Router>
  );
}

export default App;
