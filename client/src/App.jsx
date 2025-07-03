import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Channel from "./pages/Channel";
import Setup from "./pages/Setup";
import UploadVideo from "./pages/UploadVideo";
import SingleVideoPage from "./pages/SingleVideoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "channel", element: <Channel /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/channel/setup",
    element: <Setup />,
  },
  {
    path: "/video/upload",
    element: <UploadVideo />,
  },
  {
    path: "/video/:id",
    element: <SingleVideoPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
