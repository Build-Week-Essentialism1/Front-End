import React from "react";
import ValueList from "./ValueList";
import { useHistory } from "react-router-dom";
import { Jumbotron, Button} from "reactstrap";
import './App.css'
import ReactPlayer from 'react-player';

function Dashboard() {
  const { push } = useHistory();

  return (
    <div className="text-center">
      <Jumbotron >
       <img id="logoImg" src="https://www.verbaltovisual.com/wp-content/uploads/2018/11/Essentialism_Featured_2-1050x591.jpg" alt="Essentialism logo" id="logo" />
       <h2 className="display-8 py-5">
        If there's one thing you should take from this app,
      
        remember, whatever challenge you face in life,
       
        If you don't prioritize yourself, someone else will.
      </h2>
      <br />

      <ReactPlayer className="mx-auto"
        url="https://youtu.be/eDBYci4Vy2k" 
        />
     
      {/* onCLick go to ValueList plus Card */}

      <Button outline color="primary" className="btn btn-lg text-center mt-5" onClick={() => push("essentialism")}>
        Go To App
      </Button>
    </Jumbotron>
    </div>
  );
}

export default Dashboard;


// <iframe width="882" height="496" src="https://www.youtube.com/embed/eDBYci4Vy2k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>