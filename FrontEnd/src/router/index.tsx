import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/Landing";
import authRoutes from "@/router/authRoutes";
import homeRoutes from "@/router/homeRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  ...authRoutes,
  ...homeRoutes,
  {
    path: "*",
    element: <div>404 Not found.</div>,
  },
]);

export default router;
