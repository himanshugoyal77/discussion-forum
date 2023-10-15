import Content from "./components/Content";
import CreateButton from "./components/CreateButton";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Askquestion from "./components/Askquestion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const images = [
  "https://st2.depositphotos.com/1104517/11965/v/450/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
  "https://img.freepik.com/free-icon/man_318-233556.jpg",
  "https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg",
  "https://i.pinimg.com/1200x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
];

const Layout = () => {
  const [users, setUsers] = useState([]);
  const random = Math.floor(Math.random() * 5);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
    }
    const getUsers = async () => {
      const res = await axios.get("http://localhost:8080/allusers");
      setUsers(res.data);
    };
    getUsers();
    console.log(users);
  }, []);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className="relative h-screen w-screenflex flex-col justify-center items-center ">
        <Navbar />
        <div className="w-full h-full flex justify-center items-start px-12 pt-12 ">
          <Sidebar />

          <Outlet />
          <div className="right-section h-80 fixed z-10 top-24 right-28">
            <CreateButton />
            <div
              className="mt-8 bg-white py-4 px-3 rounded-md shadow-md flex
         flex-col items-start gap-5"
            >
              <h2 className="text-gray-600 font-bold text-start">Top Users</h2>
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <div className="flex items-center cursor-pointer">
                      <img
                        src={images[index % 5]}
                        alt="profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <h3 className="text-xs">{user.name}</h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/ask",
        element: <Askquestion />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
