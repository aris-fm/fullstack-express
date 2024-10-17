import React, { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/apis/users.ts";
import type { User, WithPagination } from "@/types.ts";
import { useAuth } from "@/context/AuthContext.tsx";
import { useSearchParams } from "react-router-dom";

const DEFAULT_LIMIT = 5;
const DEFAULT_OFFSET = 0;

const DashboardPage = () => {
  const { logout } = useAuth();
  const [params, setParams] = useSearchParams();

  const [users, setUsers] = useState<WithPagination<User>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(
    params.get("offset") || String(DEFAULT_OFFSET),
  );
  const limit = useMemo(() => params.get("limit") || String(DEFAULT_LIMIT), [
    params,
  ]);

  useEffect(() => {
    fetchUsers({ offset, limit }).then(setUsers);
    setParams({ offset, limit });
    setCurrentPage(Math.ceil(+offset / +limit));
  }, [offset, limit, setParams]);

  const totalPages = Math.ceil((users?.count || 0) / +limit);

  const onChangePage = (next = true) => {
    setOffset((prev) => {
      const newOffset = next ? +prev + +limit : Math.max(0, +prev - +limit);
      return String(newOffset);
    });
    if (next === false) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        DashboardPage
        <button type="button" className="btn btn-error mt-3" onClick={logout}>
          Logout
        </button>
      </div>
      {(!users || users?.count === 0) && "No Users"}
      {users && users.count > 0 && (
        <>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.rows.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1 * (+offset + 1)}.</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <button
              type="button"
              disabled={currentPage <= 0}
              onClick={() => onChangePage(false)}
            >
              Prev
            </button>
            Page {currentPage + 1} of {totalPages}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => onChangePage()}
            >
              Next
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
