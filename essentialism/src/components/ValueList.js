import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// box of suggestions
// add an input text where you can add to the values list.

const StateValue = useContext();

function ValueList(props) {
  const [value, setValue] = useState({
    item: "",
  });

  const [essentials, setEssentials] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // handleChange
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
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
        <button>Add New Value</button>
      </form>
      <ul>
        {props.value.map((value) => {
          return (
            <li key={value.id}>
              <span>{value.name}</span>
              <button>+</button>
              <button>Edit</button>
              <button> X </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ValueList;
