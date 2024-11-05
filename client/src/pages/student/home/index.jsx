import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const StudentHomePage = () => {
  const { resetCredentials } = useContext(AuthContext);
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }
  return (
    <div>
      StudentHomePage
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentHomePage;
