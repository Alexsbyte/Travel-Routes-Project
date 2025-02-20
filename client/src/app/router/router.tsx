
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,

    children: [
      { path: CLIENT_ROUTES.HOME, element: <MainPage /> },

    ],
  },

]);
