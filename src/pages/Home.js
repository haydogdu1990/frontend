import { useEffect } from "react";
import axios from "axios";

import { useUsersContext } from "../hooks/useUsersContext";

//components
import UserDetails from "../components/UserDetails";
import UserForm from "../components/UserForm";

const Home = () => {
  const { users, dispatch } = useUsersContext();

  useEffect(() => {
    const fetchUsers = async () => {
      let json = {};
      const response = await axios
        .get("/users")
        .then((responce) => (json = responce.data));

      console.log(json);

      if (true) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };
    fetchUsers();
  }, [dispatch]);

  console.log("users: " + JSON.stringify(users));
  console.log("users1: " + JSON.stringify(users[0]));

  return (
    <div className="home">
      <div className="users">
        {users &&
          users.map((user) => <UserDetails key={user._id} user={user} />)}
      </div>

      <UserForm />
    </div>
  );
};

export default Home;
