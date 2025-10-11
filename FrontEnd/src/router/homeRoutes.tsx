import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";

const homeRoutes = [
  {
    path: "/home",
    element: <MainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
];
export default homeRoutes;
