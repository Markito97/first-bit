import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import { Layout } from "../components/Layouts/Layout";

const Panel = lazy(() => import("../pages/Panel"));

enum APP_ROUTES {
  BASE = "/",
}

export const router = createHashRouter([
  {
    path: APP_ROUTES.BASE,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Panel />,
      },
    ],
  },
]);
