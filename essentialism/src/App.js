import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Essentialism from "./essentialism";
function App() {
  return (
    <Router>
      <Switch>
        {/* <div>Essentialism</div> */}
        <Route exact path="/essentialism" component={Essentialism} />
      </Switch>
    </Router>
  );
}

export default App;
