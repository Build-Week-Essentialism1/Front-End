import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import ValueList from "../components/ValueList";
import CardComponent from "../components/CardComponent";
import { connect } from "react-redux";

function Essentialism() {
  const [value, setValue] = useState([]);

  const getValues = () => {
    // eventuall I have to get the endpoint and get the values from there
    axiosWithAuth()
      .get("https://essentialismapi.herokuapp.com/api/values")
      .then((res) => {
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
      <ValueList value={value} />
      <CardComponent />
    </div>
  );
}

export default Essentialism;
