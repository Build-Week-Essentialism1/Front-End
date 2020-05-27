const deleteValue = (value) => {
  // make a delete request to delete this
  axiosWithAuth()
    .delete(`https://essentialismapi.herokuapp.com/api/values/:id`)
    .then((res) => {
      console.log(res.data);
      history.go(0);
    });
};

//If editing is true
//set up editing as a useState variable
const [editing, setEditing] = useState(false);

const editValue = (value) => {
  setEditing(true);
  setColorToEdit(value);
};

const onSubmit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .put(`https://essentialismapi.herokuapp.com/api/values/${value.id}`, value)
    .then((res) => {
      console.log("we did it", res);
      // setEditing(false);

      history.go(0);
    });
};

{
  editing && (
    <form>
      <legend>Edit Value</legend>
      <label>
        Value:
        <input />
      </label>
      <div>
        <button type="submit">save</button>
        <button onClick={() => setEditing(false)}>cancel</button>
      </div>
    </form>
  );
}
