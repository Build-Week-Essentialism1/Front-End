import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
import { addValue } from "../actions/LoginAction";
import CardComponent from "./CardComponent"; 
import {Jumbotron, Button, ButtonGroup, Container, Row, Col } from 'reactstrap';

// import axios and use endpoint to populate values
// box of suggestions
// add an input text where you can add to the values list.
//adding comment

const initialValue = {
  item: "",
};

function ValueList(props) {
  // console.log(props);

  const [editing, setEditing] = useState(false);
  const [valueToEdit, setValueToEdit] = useState();
  const [realValue, setRealValue] = useState(initialValue);
  const [cardValue, setCardValue] = useState([]);

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

  const prioritize = (value_id) => (e) => {
    const addPriorityValue = { value_id };
    // setPrioritizedValues(prioritizedValues.concat(value_id));
    axiosWithAuth()
      .post(
        `https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`,
        addPriorityValue
      )
      .then((res) => {
        axiosWithAuth()
          .get(`https://essentialismapi.herokuapp.com/api/uv/${props.user.id}`)
          .then((res) => {
            console.log(res.data, "Get request data");
            setCardValue(res.data);
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  //add button
  const Add = (e) => {
    e.preventDefault();
    const newValue = {
      name: realValue.item,
    };
    console.log(newValue);
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
    <Jumbotron>
      <h2 className="text-left ml-5" style={{ "fontStyle": "italic" }}>Select Values to Focus on Today!</h2>
      <form className="text-left ml-5" onSubmit={Add}>
        <input
          id="custom-val"
          type="text"
          placeholder="Add a Custom Value"
          name="value"
          onChange={handleChange}
          value={realValue.item}
        />
        <Button outline color="dark" className="mb-1 ml-5 py-2">Add New Value</Button>
      </form>

      {/* Plus button to prioritize value */}
      <ul>
        {props.values.map((value) => {
          return (
            <Container>
              <Row className="text-left">
                <Col xs="6">
                
              <li style={{ "listStyle": "none", "fontSize": "1.5em" }} key={value.id}>
              <span>{value.name}</span>
                </li>
              </Col>

              <Col xs="6">
              <ButtonGroup className="ml-5 my-2" size="sm">
              <Button outline color="success" style={{"font-size": "22px" }} onClick={prioritize(value.id)}>+</Button>

              {/* Edit value Button */}
                <Button outline color="warning" style={{ "font-size": "16px" }}
                onClick={() => {
                  editValue(value);
                }}
              >
                EDIT
              </Button>
              {/* Delete value Button */}
                <Button outline color="danger" style={{ "font-size": "18px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  Delete(value);
                }}
              >
                X
              </Button>
              </ButtonGroup>
            
              </Col>
              </Row>
            </Container>
          );
        })}
      </ul>
      {editing && (
        <form onSubmit={saveValue}>
          
          <label>
           
            <input
              onChange={(e) =>
                setValueToEdit({
                  ...valueToEdit,
                  name: e.target.value,
                })
              }
              placeholder="Edit Value"
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
    </Jumbotron>
  );
}
// const mapStateToProps = (state) => {
//   console.log({ state });
//   return {
//     user: state.user,
//   };
// };
// export default connect(mapStateToProps)(ValueList);

export default ValueList;
