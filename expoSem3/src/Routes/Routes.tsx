import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../Pages/Cart";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Category from "../Pages/Category";
import Dashboard from "../Pages/Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import AdminOnly from "./AdminOnly";
import Product from "../Pages/Product";
import ManageAdmin from "../Pages/Admin/ManageAdmin";
import ManageProducts from "../Pages/Admin/Product/ManageProducts";
import ManageCategories from "../Pages/Admin/Category/ManageCategories";
import ManageOrders from "../Pages/Admin/Order/ManageOrders";
import MoreItem from "../Pages/MoreItem";
import Catalog from "../Pages/Catalog";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import History from "../Pages/History";
import Detail from "../Pages/Detail";
import OrderDetail from "../Pages/OrderDetail";
import CreateCategories from "../Pages/Admin/Category/CreateCategories";
import UpdateCategories from "../Pages/Admin/Category/UpdateCategories";
import CreateProduct from "../Pages/Admin/Product/CreateProduct";
import UpdateProduct from "../Pages/Admin/Product/UpdateProduct";
import CompletedOrders from "../Pages/Admin/Order/CompletedOrders";
import ValidateShipping from "../Pages/Admin/Order/ValidateShipping";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/products", element: <MoreItem /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail",
        element: (
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail/:Id/:cartId/:orderdetailId",
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
      { path: "/contactus", element: <ContactUs /> },
      { path: "/category/:categoryId", element: <Category /> },
      { path: "/product/:Id", element: <Product /> },
      {
        path: "/dashboard",
        element: (
          <AdminOnly>
            <Dashboard />
          </AdminOnly>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminOnly>
            <ManageAdmin />
          </AdminOnly>
        ),
      },
      {
        path: "/manageproducts",
        element: (
          <AdminOnly>
            <ManageProducts />
          </AdminOnly>
        ),
      },
      {
        path: "/managecategories",
        element: (
          <AdminOnly>
            <ManageCategories />
          </AdminOnly>
        ),
      },
      {
        path: "/manageorders",
        element: (
          <AdminOnly>
            <ManageOrders />
          </AdminOnly>
        ),
      },
      {
        path: "/completedorders",
        element: (
          <AdminOnly>
            <CompletedOrders />
          </AdminOnly>
        ),
      },
      {
        path: "/validateshipping",
        element: (
          <AdminOnly>
            <ValidateShipping />
          </AdminOnly>
        ),
      },
      {
        path: "/createcategories",
        element: (
          <AdminOnly>
            <CreateCategories />
          </AdminOnly>
        ),
      },
      {
        path: "/updatecategories/:id",
        element: (
          <AdminOnly>
            <UpdateCategories />
          </AdminOnly>
        ),
      },
      {
        path: "/updateproduct/:id",
        element: (
          <AdminOnly>
            <UpdateProduct />
          </AdminOnly>
        ),
      },
      {
        path: "/createproduct",
        element: (
          <AdminOnly>
            <CreateProduct />
          </AdminOnly>
        ),
      },
    ],
  },
]);
