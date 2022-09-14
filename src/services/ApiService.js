import { useEffect } from "react";
import { useSelector } from "react-redux";
import apiLivros from "./apiLivros";
import apiAuth from "./apiAuth";
import apiUsers from "./apiUsers";
import apiEstoque from "./apiEstoque";

const ApiService = ({ children }) => {
  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (token) {
      apiAuth.defaults.headers.Authorization = `Bearer ${token}`;
      apiUsers.defaults.headers.Authorization = `Bearer ${token}`;
      apiLivros.defaults.headers.Authorization = `Bearer ${token}`;
      apiEstoque.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return children;
};

export default ApiService;
