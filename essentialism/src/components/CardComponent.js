import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { connect } from 'react-redux';

function CardComponent(props) {
  const [priorities, setPriorities] = useState([])
  console.log(priorities)
  axiosWithAuth()
    .get(`https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`)
    .then(res => {
      console.log(res.data)
      // setPriorities(res.data)
    })


  return (
    <div>
      <p>Card component testing</p>
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

