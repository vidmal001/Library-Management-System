import React from "react";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { calculateDateDifference, formatDate } from "../../utils/date";
import { Toaster, toast } from "react-hot-toast";

const Orders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["unApproved"],
    queryFn: () =>
      httpRequest.get(`/orders/unapproved-orders`).then((res) => {
        return res.data;
      }),
  });

  const handledelete = async (unApproved) => {
    const id = unApproved._id;
    try {
      await httpRequest.delete(`/orders/${id}`);
      window.location.reload();
      toast.success(`Order deleted successfully`);
    } catch (err) {
      toast.error(`An Error occur while deleting please try again later`);
      console.error(err);
    }
  };

  const handleApprove = async (unApproved) => {
    const id = unApproved._id;
    try {
      await httpRequest.put(`/orders/approve/${id}`);
      window.location.reload();
      toast.success("Order data approved successfully");
    } catch (err) {
      toast.error("Error occurred while approving order");
      console.log(err);
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
            <h1>All Unapproved Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Book Title</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Date difference</th>
                <th>Delete Order</th>
                <th>Approve Order</th>
              </tr>
            </thead>
            <tbody>
              {data.map((unApproved) => (
                <tr key={unApproved._id}>
                  <td>{unApproved.user_name}</td>
                  <td>{unApproved.book_title}</td>
                  <td>{formatDate(unApproved.start_date)}</td>
                  <td>{formatDate(unApproved.end_date)}</td>
                  <td>
                    {calculateDateDifference(
                      unApproved.start_date,
                      unApproved.end_date
                    )}
                  </td>
                  <td>
                    <img
                      src="/remove.png"
                      className="delete"
                      alt=""
                      onClick={() => handledelete(unApproved)}
                    />
                  </td>
                  <td>
                    <img
                      src="/approve.png"
                      className="delete"
                      alt=""
                      onClick={() => handleApprove(unApproved)}
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

export default Orders;
