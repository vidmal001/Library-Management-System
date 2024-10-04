import React from "react";
import "./Overdue.scss";
import { formatDate } from "../../utils/date";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const Overdue = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["over"],
    queryFn: () =>
      httpRequest.get(`orders/all/notCompleted`).then((res) => {
        return res.data;
      }),
  });
 

  const handleComplete = async (over) => {
    const orderId = over._id;
    try {
      await httpRequest.put(`/orders/Complete/${orderId}`);
      toast.success("Order Completed successfully");
      window.location.reload();
    } catch (err) {
      toast.error("Error occurred while completing Order");
      console.log(err);
    }
  };

  return (
    <div className="UnApprovedBooks">
          <Toaster />
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="UnApprovedcontainer">
          <div className="UnAprrovedtitle">
            <h1>All UnCompleted Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Book title</th>
                <th>end date</th>
                <th>Complete the process</th>
              </tr>
            </thead>
            <tbody>
              {data.map((over) => (
                <tr key={over._id}>
                  <td>{over.user_name}</td>
                  <td>{over.book_title}</td>
                  <td>{formatDate(over.end_date)}</td>
                  <td>
                  <img
                    src="/checked.png"
                    className="delete"
                    alt=""
                    onClick={() => handleComplete(over)}
                  />
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Overdue;
