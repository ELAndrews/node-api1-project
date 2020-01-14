import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AddUser from "./components/addUser";
import AllUsers from "./components/allUsers";
import UserDetails from "./components/userDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div className="App">
      <AddUser setError={setError} />
      {/* <UserDetails setError={setError} /> */}
      <AllUsers users={users} />
    </div>
  );
}

export default App;
