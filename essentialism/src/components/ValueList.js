import React, { useState, useEffect } from "react";
import axios from 'axios';
// box of suggestions 
// add an input text where you can add to the values list.

// const dummyValues = [
//   { 
//     "id": 0,
//     "name": "Design space in your life to escape"
//   },
//   {
//     "id": 1, 
//     "name": "Realize you have a choice"
//   },
//   { 
//     "id": 2,
//     "name": "Spend time exploring"
//   }, 
//   { 
//     "id": 3, 
//     "name": "Define your purpose"
//   },
//   {
//     "id": 4, 
//     "name": "Focus on the vital few"
//   },
// ]

function ValueList(props) {
  const [ value, setValue ] =useState({
    item: ""
  })

  const [essentials, setEssentials] = useState([])

 const handleSubmit = event => {
    event.preventDefault();
 }

  // useEffect(() => {
  //   axios
  //     .get('https://essentialismapi.herokuapp.com/api/values')
  //     // .get("https://essentialismapi.herokuapp.com/api/values")
  //     .then(res => {
  //       console.log(res);
  //       setEssentials(res.data)
  //     });
  //   }, [])
  

  // handleChange
  const handleChange = event => {
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
        {props.value.map(value => {
          return (
          <li key={value.id}>
            <span>{value.name}</span>
            <button>+</button>
            <button>Edit</button>
            <button> X </button>
          </li>
        )})}
      </ul>
    </div>
  )
}

export default ValueList;
