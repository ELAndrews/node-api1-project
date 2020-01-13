import React, { useState } from "react";
import axios from "axios";
import { getThemeProps } from "@material-ui/styles";

export default function AddUser(props) {
  const [newUser, setNewUser] = useState({ name: "", bio: "" });

  const handleChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    axios
      .post("http://localhost:8000/api/users", newUser)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        props.setError(error);
      });
  };

  return (
    <div>
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text-area"
          placeholder="Bio"
          name="bio"
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
