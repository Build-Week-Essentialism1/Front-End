import React, { useState } from "react";
// box of suggestions 
// add an input text where you can add to the values list.

const dummyValues = [
  "Design space in your life to escape", "Realize you have a choice", 
  "Spend time exploring", "Define your purpose", "Focus on the vital few",
  "Move from Motion Sickness to Momentum", "Be the Chief Editing Officer (CEO)",
  "Say NO more", "Sleep more","Do it all over again(and again)"
]

function ValueList() {
  const [ value, setValue ] =useState({
    item: ""
  })

  const handleSubmit = event => {
    event.preventDefault();

  }


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

      { dummyValues.map(value => {
        return <ul>
          <li>{value}</li>
          <button>+</button>
          <button>Edit</button>
          <button> X </button>
        </ul>
      })}

    </div>
  )
}

export default ValueList;
