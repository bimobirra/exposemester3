import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./useAuth";

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <ToastContainer autoClose={1500}/>
      </UserProvider>
    </>
  );
}

export default App;
