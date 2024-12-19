import { Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import { useLocation } from "react-router";

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  return (
    <>
      <aside
        className="sidebar d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: "280px", height: "100vh", position: "sticky" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="h2">Shoerp</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/dashboard" ? "active" : "text-white"
              }`}
              to="/dashboard"
            >
              {" "}
              <i className="bi bi-house-door-fill"></i> Home
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/manageorders" ? "active" : "text-white"
              }`}
              to="/manageorders"
            >
              <i className="bi bi-clipboard-check-fill"></i> Validate Payment
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/validateshipping"
                  ? "active"
                  : "text-white"
              }`}
              to="/validateshipping"
            >
              <i className="bi bi-clipboard-check-fill"></i> Validate Shipping
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/completedorders"
                  ? "active"
                  : "text-white"
              }`}
              to="/completedorders"
            >
              <i className="bi bi-clipboard-check-fill"></i> Completed Orders
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/manageproducts"
                  ? "active"
                  : "text-white"
              }`}
              to="/manageproducts"
            >
              {" "}
              <i className="bi bi-archive-fill"></i> Products
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/managecategories"
                  ? "active"
                  : "text-white"
              }`}
              to="/managecategories"
            >
              {" "}
              <i className="bi bi-ui-checks-grid"></i> Brands
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/admin" ? "active" : "text-white"
              }`}
              to="/admin"
            >
              {" "}
              <i className="bi bi-person-fill"></i> Admin
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <strong>{user?.userName}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <Link className="dropdown-item" to="/">
              Back to home
            </Link>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a onClick={logout} className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
