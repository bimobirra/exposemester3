import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI, registerAPIAdmin } from "./Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserProfile = {
  userId: string;
  userName: string;
  email: string;
  cartId: number;
  phone: string;
  address: string;
  role: string;
};

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => void;
  registerUserAdmin: (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => {
    await registerAPI(username, email, password, phone, address)
      .then((res) => {
        if (res) {
          toast.success("Register Success!");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server Error Occured"));
  };

  const registerUserAdmin = async (
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  ) => {
    await registerAPIAdmin(username, email, password, phone, address)
      .then((res) => {
        if (res) {
          toast.success("Register Success!");
          navigate("/dashboard")
        }
      })
      .catch((e) => toast.warning("Server Error Occured"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userId: res?.data.userId,
            userName: res?.data.userName,
            email: res?.data.email,
            phone: res?.data.phone,
            address: res?.data.address,
            cartId: res?.data.cartId,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server Error Occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    toast.success("Logout Success!")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
        registerUserAdmin,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () =>React.useContext(UserContext);