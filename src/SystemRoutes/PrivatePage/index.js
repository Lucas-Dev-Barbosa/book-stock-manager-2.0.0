import { useCallback, useEffect } from "react";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import slice from "../../store/modules/reducer";

const PrivatePage = ({ children }) => {
  const dispath = useDispatch();

  const { signed, token } = useSelector((state) => state);

  const navigate = useNavigate();

  const { isExpired } = useJwt(token);

  const validaRedirecionamento = useCallback(() => {
    if(token && isExpired) {
      dispath(slice.actions.signInOut());
      return;
    }
    if (!signed) {
      navigate("/login");
      return;
    }
  }, [token, isExpired, dispath, signed, navigate]);

  useEffect(() => {
    validaRedirecionamento();
  }, [validaRedirecionamento]);

  return children;
};

export default PrivatePage;
