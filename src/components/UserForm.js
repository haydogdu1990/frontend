import React, { useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext";

const UserForm = () => {
  const { dispatch } = useUsersContext();
  const [username, setUsername] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username };

    const response = await fetch("/users/add", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setUsername("");
      setError(null);
      console.log("New user added", json);
      dispatch({ type: "CREATE_USERS", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New User</h3>

      <label>User Name</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <button>Add User</button>
      <div className="error">{error}</div>
    </form>
  );
};

export default UserForm;
