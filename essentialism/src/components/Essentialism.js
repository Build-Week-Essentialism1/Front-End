import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import ValueList from "../components/ValueList";
import CardComponent from "../components/CardComponent";

//I will return the two parts of the application here
function Essentialism() {
  const [value, setValue] = useState([]);

  const getValues = () => {
    // eventuall I have to get the endpoint and get the values from there
    axiosWithAuth()
      .get("https://essentialismapi.herokuapp.com/api/values")
      .then((res) => {
        // most likely going to be res.data
        console.log(res.data);
        setValue(res.data);
      });
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <div>
      Actuall App
       <ValueList value={value}/>
      <CardComponent /> 

    </div>
  );
}

export default Essentialism;
