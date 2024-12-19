import { Link } from "react-router-dom";
import { useAuth } from "../useAuth";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="h2">Shoerp</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item nav-item mx-3">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/catalog">
                Catalog
              </Link>
            </li>
            <li className="nav-item nav-item mx-3">
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </li>
            <div className="vr d-sm-none d-md-none d-lg-block nav-item mx-3"></div>
            {isLoggedIn() && user?.role === "Admin" ? (
              // **Navbar untuk Admin**
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user?.userName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a onClick={logout} className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : isLoggedIn() ? (
              // **Navbar untuk User Biasa**
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user?.userName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/history">
                        History
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a onClick={logout} className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  className="nav-item nav-item mx-3 mt-n1"
                  style={{ marginTop: "-5px" }}
                >
                  <Link className="nav-link" to="/cart">
                    <i
                      style={{ fontSize: "1.3rem" }}
                      className="bi bi-cart"
                    ></i>
                  </Link>
                </li>
              </>
            ) : (
              // **Navbar untuk User Belum Login**
              <>
                <li className="nav-item nav-item mx-3 md-my-2">
                  <Link className="btn btn-outline-secondary" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item nav-item mx-3 md-my-2">
                  <Link className="btn btn-secondary" to="/register">
                    Register
                  </Link>
                </li>
                <li
                  className="nav-item nav-item mx-3 mt-n1"
                  style={{ marginTop: "-5px" }}
                >
                  <Link className="nav-link" to="/cart">
                    <i
                      style={{ fontSize: "1.3rem" }}
                      className="bi bi-cart"
                    ></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
