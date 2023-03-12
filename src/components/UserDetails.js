import { useUsersContext } from "../hooks/useUsersContext";

const UserDetails = ({ user }) => {
  const { dispatch } = useUsersContext();

  const handleClick = async () => {
    const response = await fetch("/users/del/" + user._id, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log("json: " + json);

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
    <div className="user-details">
      <h3>{user.username}</h3>
      <p>
        <strong>createdAt</strong>
        {user.createdAt}
        <strong>User ID</strong>
        {user._id}
      </p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default UserDetails;
