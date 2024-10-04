import React from "react";
//import Footer from "./components/footer/Footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.scss"
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Books from "./pages/Books/Books.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ApprovedOrder from "./pages/approvedOrders/ApprovedOrder.jsx";

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import Book from "./pages/book/Book.jsx";
import Orders from './pages/orders/Orders.jsx';
import MyProfile from "./pages/myProfile/MyProfile.jsx";
import Messages from "./pages/messages/Messages.jsx";

const queryClient = new QueryClient()

function App() {
  const Layout = () => {
    return (
      <div className="app">
         <QueryClientProvider client={queryClient}>
         <Navbar />
        <Outlet />
       {/* <Footer />*/}
         </QueryClientProvider>
      
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/approvedOrders",
          element: <ApprovedOrder/>,
        },
        {
          path: "/book/:id",
          element: <Book/>
        },
        {
          path: "/orders",
          element: <Orders/>
        },
        {
          path: "/myprofile",
          element: <MyProfile/>
        },
        {
          path : "/messages",
          element : <Messages/>
        }
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
