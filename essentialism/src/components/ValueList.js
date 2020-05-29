import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
import { addValue } from "../actions/LoginAction";


// import { EssentialismContext } from "./Essentialism";
// import axios and use endpoint to populate values
// box of suggestions
// add an input text where you can add to the values list.
//adding comment

const initialValue = {
  item: ""
}

function ValueList(props) {
  

  console.log(props)

  const [editing, setEditing] = useState(false);
  const [valueToEdit, setValueToEdit] = useState();
  const [realValue, setRealValue] = useState(initialValue);

  const [prioritizedValues, setPrioritizedValues] = useState([]);


  

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

  const prioritize = value_id => e => {
   const addPriorityValue = { value_id };
    setPrioritizedValues(prioritizedValues.concat(value_id));
     axiosWithAuth()
      .post(
        `https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`, addPriorityValue
      )
      .then(res => {
       
        console.log(res, "Post request data");
      axiosWithAuth()
        .get(`https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`)
        .then( res => {
          console.log(res.data, "Get request data")
        })
      })

      .catch((err) => {
        console.log(err);
      })
};



  //add button
  const Add = (e) => {
    e.preventDefault();
    const newValue = {
      name: realValue.item,
    };
    console.log(newValue)
    setRealValue({ ...realValue, newValue });
    props.dispatch(addValue(newValue));
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
    <>
      <form onSubmit={Add}>
        <input
          id="custom-val"
          type="text"
          placeholder="Add a Custom Value"
          name="value"
          onChange={handleChange}
          value={realValue.item}
        />
        <button>Add New Value</button>
      </form>

      {/* Plus button to prioritize value */}
      <ul>
        {props.values.map((value) => {
          return (
            <li key={value.id}>
              <span>{value.name}</span>
              <button onClick={prioritize(value.id)}>+</button>
              
              {/* Edit value button */}
              <button
                onClick={() => {
                  editValue(value);
                }}
              >
                Edit
              </button>
              {/* Delete value button */}
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

      {prioritizedValues.map((id) => {
        const theValue = props.values.find((v) => v.id === id);
        return <div>{theValue.name}</div>;
      })}
      
    </>
  );
}
// const mapStateToProps = (state) => {
//   console.log({ state });
//   return {
//     user: state.user,
//   };
// };
// export default connect(mapStateToProps)(ValueList);

export default ValueList
