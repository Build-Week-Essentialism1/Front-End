const deleteValue = (value) => {
  // make a delete request to delete this
  axiosWithAuth()
    .delete(`api endpoint`)
    .then((res) => {
      console.log(res.data);
      // history.go(0);
    });
};

//If editing is true
//set up editing as a useState variable

//   {editing && (
//     <form onSubmit={saveEdit}>
//       <legend>Edit Value</legend>
//       <label>
//         color name:
//         <input
//           onChange={(e) =>
//             setColorToEdit({ ...colorToEdit, color: e.target.value })
//           }
//           value={colorToEdit.color}
//         />
//       </label>
//       <label>
//         hex code:
//         <input
//           onChange={(e) =>
//             setColorToEdit({
//               ...colorToEdit,
//               code: { hex: e.target.value },
//             })
//           }

//         />
//       </label>
//       <div >
//         <button type="submit">save</button>
//         <button onClick={() => setEditing(false)}>cancel</button>
//       </div>
//     </form>
//   )}