


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Auth from "./auth";
import ErrorPage from "./error";
import Login from "./login";
import Root from "./root";
import Home from "./home";
import OrderFood from "./orderFood";
import AddItem from "./addItem";
import FeedBack from "./feedBackForm";
import Menu from "./menu";
import Upvotes from "./upvotes";
import Orders from './orders';
import MyOrders from './myOrders'

import EditItem from "./editItem";
import Cookies from "universal-cookie/es6";

const cookie = new Cookies();

// const isAdmin = cookie.get("role") === "true";




  
  
  export default function App() {
    const [isAdmin, setIsAdmin] = useState(cookie.get("admin") === "true");
    
    useEffect(() => {
      setIsAdmin(cookie.get("admin") === "true");
    }, []);



    const routes = !isAdmin
      ? [
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "myOrders",
              element: <MyOrders />,
            },
            {
              path: "",
              element: <Home />,
            },
            {
              path: "feedBack",
              element: <FeedBack />,
            },
            {
              path: "orderFood",
              element: <OrderFood />,
            },
            {
              path: "snacks/authenticate",
              element: <Auth />,
            },
            {
              path: "*",
              element: <ErrorPage />,
            },
          ],
        },
      ]
      :
      [
        {
          path: "/",
          element: <Root />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "myOrders",
              element: <MyOrders />,
            },
            {
              path: "",
              element: <Home />,
            },
            {
              path: "addItem",
              element: <AddItem />,
            },
            {
              path: "editItem",
              element: <EditItem />,
            },
            {
              path: "upvotes",
              element: <Upvotes />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            {
              path: "menu",
              element: <Menu />,
            },
            {
              path: "feedBack",
              element: <FeedBack />,
            },
            {
              path: "orderFood",
              element: <OrderFood />,
            },
            {
              path: "snacks/authenticate",
              element: <Auth />,
            }, {
              path: "*",
              element: <ErrorPage />,
            }
          ],
        },
      ];

    const router = createBrowserRouter(routes);
  return (
  <>
    
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
        
      </>
  );
}








