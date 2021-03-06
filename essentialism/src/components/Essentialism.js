import React, { useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import ValueList from "../components/ValueList";
import CardComponent from "../components/CardComponent";
import { useSelector, useDispatch } from "react-redux";
import { fetchValues } from "../actions/LoginAction";





function Essentialism() {
  
  const user = useSelector(state => state.user)
  const values = useSelector(state => state.values)
  const dispatch = useDispatch()
  console.log(user)


  const getValues = () => {
    // eventuall I have to get the endpoint and get the values from there
   dispatch(fetchValues());
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <div>
      <ValueList values={values} user={user} dispatch={dispatch} />
      <CardComponent />
     
    </div>
  );
}

export default Essentialism;
