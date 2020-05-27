import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import ValueList from "../components/ValueList";
import CardComponent from "../components/CardComponent";

const EssentialismContext = createContext();

function Essentialism() {
  const [value, setValue] = useState([]);

  const getValues = () => {
    // eventuall I have to get the endpoint and get the values from there
    axiosWithAuth()
      .get("https://essentialismapi.herokuapp.com/api/values")
      .then((res) => {
        // console.log(res.data);
        setValue(res.data);
      });
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <div>
      Actuall App
      <EssentialismContext.Provider value={value}>
        <ValueList />
        <CardComponent />
      </EssentialismContext.Provider>
    </div>
  );
}

export default Essentialism;
