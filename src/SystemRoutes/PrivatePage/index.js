import { useCallback, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import slice from "../../store/modules/reducer";

const PrivatePage = ({ children }) => {
  const [redirecionar, setRedirecionar] = useState(false);
  const dispath = useDispatch();

  const { signed, token } = useSelector((state) => state);

  const navigate = useNavigate();

  const { isExpired } = useJwt(token);

  const validaRedirecionamento = useCallback(() => {
    if(token && isExpired) {
      dispath(slice.actions.signInOut());
      setRedirecionar(true);
    }
    if (!signed) {
      navigate("/login");
      setRedirecionar(true);
    }
  }, [token, isExpired, dispath, signed, navigate]);

  useEffect(() => {
    validaRedirecionamento();
  }, [validaRedirecionamento]);

  return !redirecionar ? children : "";
};

export default PrivatePage;
