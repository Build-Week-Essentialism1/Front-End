import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Essentialism from "./components/Essentialism";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
function App() {
  return (
     
    <Router>
          <LogIn />
          <Register />
      <Switch>
        {/* <div>Essentialism</div> */}
        <Route exact path="/essentialism" component={Essentialism} />
      </Switch>
    </Router>
  );
}

export default App;
