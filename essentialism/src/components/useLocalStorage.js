// import { useState } from "react";
// // set up state property
// // capture the values
// // if local data use that, else use initial data
// // update localStorage when needed
// // Don't forget to parse data from localStorage, and stringify new data getting stored

// const useLocalStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState(() => {
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   });
//   const setValue = (value) => {
//     // Save state
//     setStoredValue(value);
//     // Save to local storage
//     window.localStorage.setItem(key, JSON.stringify(value));
//   };

//   return [storedValue, setValue];
// };
// // should work almost exactly like useState - except any value that is controlled by this hook will be saved and persisted to localStorage
// export default useLocalStorage;
