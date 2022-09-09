import { useEffect } from "react";
import { useSelector } from "react-redux";
import api from "./api";
import apiAuth from "./apiAuth";
import apiUsers from "./apiUsers";

const ApiService = ({ children }) => {
  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (token) {
      apiAuth.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      apiUsers.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return children;
};

export default ApiService;
