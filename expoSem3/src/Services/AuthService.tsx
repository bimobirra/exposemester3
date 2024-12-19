import axios from "axios";
import { handleError } from "../handleError";

const api = "http://localhost:5205/api/";

type UserProfileToken = {
  userId: string;
  userName: string;
  email: string;
  cartId: number;
  phone: string;
  address: string;
  token: string;
  role: string;
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  username: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      username: username,
      email: email,
      password: password,
      phone: phone,
      address: address,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPIAdmin = async (
  username: string,
  email: string,
  password: string,
  phone: string,
  address: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      api + "account/register/admin",
      {
        username: username,
        email: email,
        password: password,
        phone: phone,
        address: address,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
