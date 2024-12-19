import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../useAuth";
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

function ManageAdmin() {
  const { registerUserAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleRegister = (form: RegisterFormsInputs) => {
    registerUserAdmin(
      form.userName,
      form.email,
      form.password,
      form.phone,
      form.address
    );
  };
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid px-4">
          <h1 className="h3 my-3">Add Admin</h1>

          <div className="card shadow mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form-group">
                  <label htmlFor="Username">Username:</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="Username"
                    placeholder="Enter Username"
                    required
                    autoFocus
                    {...register("userName")}
                  />
                  {errors.userName ? (
                    <p className="mt-1 text-danger">
                      {errors.userName.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="email"
                    placeholder="Enter Email"
                    required
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-danger">{errors.email.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="address"
                    placeholder="Enter Address"
                    required
                    {...register("address")}
                  />
                  {errors.address ? (
                    <p className="mt-1 text-danger">{errors.address.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="phone"
                    placeholder="Enter Phone Number"
                    required
                    {...register("phone")}
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-danger">{errors.phone.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control my-3"
                    id="password"
                    placeholder="Enter Password"
                    required
                    {...register("password")}
                  />
                  {errors.password ? (
                    <p className="mt-1 text-danger">
                      {errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary mt-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAdmin;
