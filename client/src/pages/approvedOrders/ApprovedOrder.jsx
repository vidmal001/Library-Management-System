import React from "react";
import "./ApprovedOrder.scss";
import { useNavigate } from "react-router-dom";
import { useQuery  } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { calculateDateDifference, formatDate } from "../../utils/date";


const ApprovedOrder = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const uname = currentUser.username;
 
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["Approved"],
    queryFn: () =>
      httpRequest.get(`/orders/approved-orders/${uname}`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (Approved) => {
    const adminId = Approved.adminId;
    const userId = Approved.userId;
    try {
      
      const existingConversationResponse = await httpRequest.get(`/conversations/${userId}`);
      const existingConversation = existingConversationResponse.data;
  
      if (existingConversation.length > 0) {
        
        console.log("Conversation already exists:", existingConversation[0]);
        navigate(`/messages`);
      } else {
        
        const newConversationResponse = await httpRequest.post("/conversations", {
          senderId:  userId,
          receiverId: adminId, 
        });
  
        console.log("New conversation created:", newConversationResponse.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ApprovedBooks">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="Approvedcontainer">
          <div className="Aprrovedtitle">
            <h1>Approved Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser?.isAdmin ? "User" : "Approved Libriran"}</th>
                <th>Book Title</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Date difference</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Approved) => (
                
                <tr key={Approved._id}>
                  <td>{currentUser?.isAdmin ? Approved.user_name : Approved.admin_name}</td>
                  <td>{Approved.book_title}</td>
                  <td>{formatDate(Approved.start_date)}</td>
                  <td>{formatDate(Approved.end_date)}</td>
                  <td>{calculateDateDifference(
                      Approved.start_date,
                      Approved.end_date
                    )}</td>
                
                    <td>
                      <img
                       src="/messages.png" 
                       className="delete" 
                       alt=""
                       onClick={() => handleContact(Approved)} />
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

export default ApprovedOrder;
