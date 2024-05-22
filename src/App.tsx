import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./pages/home/HomePage";
import { SignupPage } from "./pages/auth/SignupPage";
import { SigninPage } from "./pages/auth/SigninPage";
import AiPage from "./pages/ai/AiPage";
import { NotesPage } from "./pages/notes/NotesPage";
import TasksPage from "./pages/tasks/TasksPage";
import { useState } from "react";
import PrivateRoute from "./routes/privateRoute";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const Layout = () => {
    return (
      <div data-theme={theme} className="page-wrapper">
        <Sidebar />
        <div className="content-wrapper">
          <Navbar changeTheme={changeTheme} currentTheme={theme} />
          <Outlet />
        </div>
      </div>
    );
  };

  const Main = () => {
    return (
      <>
        <HomePage />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/ai",
          element: <AiPage />,
        },
        {
          path: "/notes",
          element: <PrivateRoute><NotesPage /></PrivateRoute>,
        },
        {
          path: "/tasks",
          element: <TasksPage />,
        },
      ],
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/signin",
      element: <SigninPage />
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App