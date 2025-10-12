import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <h1>Welcome to AuthLayout.</h1>
      <Outlet />
    </>
  );
}
