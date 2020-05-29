import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { connect } from "react-redux";

function CardComponent(props) {
  const [priorities, setPriorities] = useState([]);

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
        // history.go(0);
      });
  };

  return (
    <div>
      <button onClick={() => getCard()}> Get Card </button>
      {priorities.map((item) => (
        <div>
          <h3>{item.name} </h3>{" "}
        </div>
      ))}
      <button onClick={() => Delete()}> Delete values From Card </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(CardComponent);
