import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../useAuth";

type Props = { children: React.ReactNode };

const AdminOnly = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn() && user.role === "Admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/" state={{ from: location, toastMessage: "Unauthorized" }} replace />;
  }
};

export default AdminOnly;
