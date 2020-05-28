import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";

// import { EssentialismContext } from "./Essentialism";
// import axios and use endpoint to populate values
// box of suggestions
// add an input text where you can add to the values list.
//adding comment


function ValueList(props) {
 
  
  const value = {
     item: "",
  };


// function ValueList(props) {
//   const [value, setValue] = useState({
//     item: "",
//   };

  const [editing, setEditing] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(value);
  const [realValue, setRealValue] = useState(value);

//   const [essentials, setEssentials] = useState([]);

  const [prioritizedValues, setPrioritizedValues] = useState([])

  // handleChange
  const handleChange = (event) => {
    setRealValue({ ...realValue, item: event.target.value });
  };

  //edit Value
  const editValue = (value) => {
    setEditing(true);
    setValueToEdit(value);
  };

  const history = useHistory();


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
  


  //add button
  const Add = (e) => {
    // e.preventDefault();
    const newValue = {
      name: realValue.item,
    };
    setRealValue({ ...realValue, newValue });
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

  //deleteValue
  const Delete = (value) => {
    axiosWithAuth()
      .delete(`https://essentialismapi.herokuapp.com/api/values/${value.id}`)
      .then((res) => {
        console.log(res.data);
        history.go(0);
      });
  };

  const saveValue = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://essentialismapi.herokuapp.com/api/values/${valueToEdit.id}`,
        valueToEdit
      )
      .then((res) => {
        console.log(res, "success");
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
          value={realValue.item}

        />
        <button onClick={() => Add()}>Add New Value</button>
      </form>
      <ul>

        {props.value.map((value) => {
          return (
            <li key={value.id}>
              <span>{value.name}</span>
              <button onClick={prioritize(value.id)}>+</button>
              <button
                onClick={() => {
                  editValue(value);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  Delete(value);
                }}
              >
                
                X
              </button>

            </li>
          );
        })}
      </ul>
      {editing && (
        <form onSubmit={saveValue}>
          <legend>Edit Value</legend>
          <label>
            Value:
            <input
              onChange={(e) =>
                setValueToEdit({
                  ...valueToEdit,
                  name: e.target.value,
                })
              }
              placeholder={valueToEdit.item}
            />
          </label>
          <div>
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

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






