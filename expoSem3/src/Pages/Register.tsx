import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type RegisterFormsInputs = {
  userName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string().required("Password is required"),
});

function Register() {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleRegister = (form: RegisterFormsInputs) => {
    registerUser(
      form.userName,
      form.email,
      form.password,
      form.phone,
      form.address
    );
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card text-center ms-auto mx-auto"
        style={{ width: "26rem" }}
      >
        <div className="card-body">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(handleRegister)}>
              <h1 className="h1 mb-2 fw-normal">Welcome</h1>
              <p className="h5 fw-normal">Create your account</p>

              <div className="form-floating mt-4">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                  autoFocus
                  {...register("userName")}
                />
                {errors.userName ? (
                  <p className="mt-1 text-danger">{errors.userName.message}</p>
                ) : (
                  ""
                )}
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="example@test.com"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="mt-1 text-danger">{errors.email.message}</p>
                ) : (
                  ""
                )}
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingAddress"
                  placeholder="Address"
                  {...register("address")}
                />
                {errors.address ? (
                  <p className="mt-1 text-danger">{errors.address.message}</p>
                ) : (
                  ""
                )}
                <label htmlFor="floatingInput">Address</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPhone"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-1 text-danger">{errors.phone.message}</p>
                ) : (
                  ""
                )}
                <label htmlFor="floatingInput">Phone Number</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="mt-1 text-danger">{errors.password.message}</p>
                ) : (
                  ""
                )}
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button className="btn btn-primary w-100 py-2 mt-4" type="submit">
                Register
              </button>
              <p className="mt-3">
                Already have an account? login <Link to="/login">here</Link>
              </p>
              <Link to="/">Return Home</Link>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Register;
