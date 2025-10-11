import AuthLayout from "@/layouts/AuthLayout";
import RegisterPage from "@/pages/Register";
import LogInPage from "@/pages/Login";
import LogoutPage from "@/pages/Logout";

const authRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LogInPage /> },
      { path: "logout", element: <LogoutPage /> },
    ],
  },
];
export default authRoutes;
