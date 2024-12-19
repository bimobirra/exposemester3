import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top  ">
        <div className="col mb-3">
          <Link
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            to="/"
          >
            <span className="h2">Shoerp</span>
          </Link>
          <p className="text-body-secondary">&copy; 2024 Copyright Shoerp</p>
        </div>

        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5>Explore</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link p-0 text-body-secondary" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link p-0 text-body-secondary" to="/catalog">
                Catalog
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                className="nav-link p-0 text-body-secondary"
                to="/contactus"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Payment</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                QRIS
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                Transfer
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                MasterCard
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                Visa
              </a>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Find Us</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                Whatsapp
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                Instagram
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                X
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                TikTok
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="nav-link p-0 text-body-secondary">
                Youtube
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
