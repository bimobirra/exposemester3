import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/cool-gadgets-for-man-20230320081438125.jpg"
              className="d-block mx-lg-auto img-fluid rounded"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Explore the Latest Electronic Devices
            </h1>
            <p className="lead">
              Discover the newest electronic gadgets for all your needs.
              Featuring cutting-edge technology and modern designs, enjoy a
              seamless and reliable shopping experience. From gadgets and
              accessories to smart devices, everything you need is right here.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row featurette">
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <h2 className="featurette-heading fw-normal lh-1">
              Cutting-Edge Technology at Your Fingertips
            </h2>
            <p className="lead">
              Stay ahead with innovative devices designed for convenience and
              efficiency. Explore a wide range of products tailored to elevate
              your digital lifestyle.
            </p>
          </div>
          <div className="col-md-5">
            <img
              src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero-image"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto my-5 rounded"
              width="500"
              height="500"
            />
          </div>
        </div>
        <div className="row featurette">
          <div className="col-md-7 order-md-2 d-flex flex-column justify-content-center">
            <h2 className="featurette-heading fw-normal lh-1">
              Experience the Power of Innovation
            </h2>
            <p className="lead">
              Unlock the true potential of technology with our premium
              electronic devices. Upgrade your setup today with tools that blend
              performance and style seamlessly.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero-image"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto my-5 rounded"
              width="500"
              height="500"
            />
          </div>
        </div>
        <div className="row featurette">
          <div className="col-md-7 d-flex flex-column justify-content-center">
            <h2 className="featurette-heading fw-normal lh-1">
              Smart Solutions for Every Moment
            </h2>
            <p className="lead">
              Discover smart devices that simplify your daily life. From home
              automation to on-the-go gadgets, experience seamless functionality
              and modern design like never before..
            </p>
          </div>
          <div className="col-md-5">
            <img
              src="https://plus.unsplash.com/premium_photo-1728831287366-beaeee6ed4ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero-image"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto my-5 rounded"
              width="500"
              height="500"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
