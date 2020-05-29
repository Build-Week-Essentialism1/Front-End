import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function CardComponent(props) {
  const [priorities, setPriorities] = useState([]);
  const history = useHistory()
  

  const getCard = (e) => {
    axiosWithAuth()
      .get(`https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`)
      .then((res) => {
        console.log(res.data);
        setPriorities(res.data);
      });
  };
  const Delete = () => {
    axiosWithAuth()
      .delete(`https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`)
      .then((res) => {
        console.log(res.data);
        history.go(0);
      });
  };
  // const toggleItem = (value) => {
  //   if (value.class)
  // };

  // const AddClass = (value) => {
  //   const v = document.getElementById(value.id);
  //   v.classList.add(".done");
  // };

  return (
    <div>
      <button onClick={() => getCard()}> Get Card </button>
      <button onClick={() => Delete()}> Delete all Values </button>

      {priorities.map((item) => (
        <div>
          <h3 id={item.id}>{item.name} </h3>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    user: state.user,
    values: state.values
  };
};
export default connect(mapStateToProps)(CardComponent);
