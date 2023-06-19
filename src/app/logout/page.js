import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  const logoutHandler = async (event) => {
    event.preventDefault();
    logout();
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
