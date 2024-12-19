import Sidebar from "../../Components/Sidebar"
import { useAuth } from "../../useAuth";

function Dashboard(){

  const{ user } = useAuth();
    return (
      <>
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-4">
            <h1>Welcome to Admin Dashboard, {user?.userName}</h1>
          </div>
        </div>
      </>
    );
}

export default Dashboard