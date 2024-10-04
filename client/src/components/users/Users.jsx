import React from 'react'
import "./Users.scss"
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const Users = () => {

   const { isLoading, error, data } = useQuery({
        queryKey: ["Allusers"],
        queryFn: () =>
          httpRequest.get(`users/`).then((res) => {
            return res.data;
          }),
      });

      const handledelete = async (Allusers) => {
        const userId = Allusers._id;
        try {
            await httpRequest.delete(`/users/${userId}`);
            window.location.reload();
            toast.success(`User deleted successfully`);
          } catch (err) {
            toast.error(`An Error occured while deleting user`);
            console.error(err);
          }
    
    };
    

  return (
    <div className="UnApprovedBooks">
    {isLoading ? (
      "loading"
    ) : error ? (
      "error"
    ) : (
      <div className="UnApprovedcontainer">
        <Toaster />
        <div className="UnAprrovedtitle">
          <h1>All Users </h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Description</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Allusers) => (
             <tr key={Allusers._id}>
                <td>{Allusers.username}</td>
                <td>{Allusers.email}</td>
                <td>{Allusers.phone}</td>
                <td>{Allusers.description}</td>
                <td>
                  <img
                    src="/remove.png"
                    className="delete"
                    alt=""
                    onClick={() => handledelete(Allusers)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  )
}

export default Users