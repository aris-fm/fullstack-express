import { useEffect, useState } from "react"
import { fetchUsers } from "@/apis/users"
import type { User } from "@/types"
import { useAuth } from "@/context/AuthContext"

const DashboardPage = () => {
  const { logout } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        DashboardPage
        <button type="button" className="btn btn-error mt-3" onClick={logout}>
          Logout
        </button>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}.</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage
