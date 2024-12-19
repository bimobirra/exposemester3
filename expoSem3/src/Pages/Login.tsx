import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card text-center ms-auto mx-auto"
        style={{ width: "26rem" }}
      >
        <div className="card-body">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(handleLogin)}>
              <h1 className="h1 mb-2 fw-normal">Welcome</h1>
              <p className="h5 fw-normal">Sign in to your account</p>

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
                Login
              </button>
              <p className="mt-3">
                Don't have an account? create your account{" "}
                <Link to="/register">here</Link>
              </p>
              <Link to="/">Return Home</Link>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
