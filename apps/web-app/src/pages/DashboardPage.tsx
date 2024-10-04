import { useEffect, useState } from "react";
import { fetchData } from "../apis/users";
import { User } from "../types";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchData().then(setUsers);
  }, []);
  return (
    <div>
      DashboardPage
      {users.length > 0 &&
        users.map((user, i) => (
          <p key={i}>
            {i + 1}. {user.name} {user.email}
          </p>
        ))}
      <button className="btn btn-error mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
