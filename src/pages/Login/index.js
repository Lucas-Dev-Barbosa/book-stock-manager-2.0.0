import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../../layoult/components/ButtonForm";
import slice from "../../store/modules/reducer";

const Login = () => {
  const dispath = useDispatch();
  const { signed } = useSelector((state) => state);

  const userNameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    signed && navigate("/");
  }, [signed, navigate]);

  function submitHandler(e) {
    e.preventDefault();

    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;

    dispath(slice.actions.signInRequest({ userName, password }));
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className={"row g-3 mx-auto"}
        style={{ width: "30rem" }}
        noValidate
      >
        <i
          style={{ fontSize: "60px" }}
          className="oi oi-person text-center"
        ></i>
        <span style={{ fontSize: "60px" }} className="text-center">
          Login
        </span>

        <br />

        <div className="col-md-12">
          <label htmlFor="nome" className="form-label">
            Login
          </label>
          <input
            ref={userNameRef}
            type="text"
            className="form-control"
            id="username"
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="sobrenome" className="form-label">
            Senha
          </label>

          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <ButtonForm value="Sign In" valueLoading=" Carregando..." />
      </form>
    </div>
  );
};

export default Login;
