import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
// import { EssentialismContext } from "./Essentialism";
// import axios and use endpoint to populate values
// box of suggestions
// add an input text where you can add to the values list.
//adding comment
// const value = useContext(EssentialismContext);
function ValueList(props) {
  const [value, setValue] = useState({
    item: "",
  });

  const [essentials, setEssentials] = useState([]);

  const [prioritizedValues, setPrioritizedValues] = useState([])


  // prioritized function

  const prioritize = id => event => {
    setPrioritizedValues(prioritizedValues.concat(id))


    // needs user id interperlated at the end for post request to occur

    axiosWithAuth()
      .post(`https://essentialismapi.herokuapp.com/api/uv/:id`, prioritizedValues)
      .then((res) => {
        console.log(res);
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // handleChange
  const handleChange = (event) => {
    setValue({ ...value, item: event.target.value });
  };
  const history = useHistory();


  //add button
  const Add = (e) => {
    // e.preventDefault();
    const newValue = {
      name: value.item,
    };
    setValue({ ...value, newValue });
    axiosWithAuth()
      .post(`https://essentialismapi.herokuapp.com/api/values`, newValue)
      .then((res) => {
        console.log(res);
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <h2>Values to Focus On</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a Value"
          name="value"
          onChange={handleChange}
          value={value.item}
        />
        <button onClick={() => Add()}>Add New Value</button>
      </form>
      <ul>


        {props.value.map((value) => {
          return (
            <li key={value.id}>
              <span>{value.name}</span>
              <button onClick={prioritize(value.id)}>+</button>
              <button>Edit</button>
              <button> X </button>
            </li>
          );
        })}
      </ul>

      {prioritizedValues.map(id => {
        
        const theValue = props.value.find(v => v.id === id)
        return (
          <div>{theValue.name}</div>
        )
      })}

    </div>
  );
}
export default ValueList;






