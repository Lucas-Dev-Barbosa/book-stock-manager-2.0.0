import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import apiAuth from "../../services/apiAuth";
import slice from "./reducer";

export function* signIn({ payload }) {
  const { userName, password } = payload;

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
  params.append("username", userName);
  params.append("password", password);

  try {
    const response = yield call(
      apiAuth.post,
      "realms/bookstock/protocol/openid-connect/token",
      params
    );

    const accessToken = response.data.access_token;
    const decodedToken = decodeToken(accessToken);

    yield put(
      slice.actions.signInSuccess({
        token: accessToken,
        roles: decodedToken.resource_access.bookstock.roles,
      })
    );

    toast.success("Usuário logado com sucesso", {
      position: toast.POSITION.TOP_RIGHT,
    });

    
  } catch (err) {
    console.log(err);

    let messageError = err.response.data && err.response.data.error_description;
    if (messageError === "Invalid user credentials") {
      messageError = "Usuário ou senha inválidos";
    }

    yield put(slice.actions.signInFailure({ messageError }));

    toast.error(messageError, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export default all([takeLatest(slice.actions.signInRequest, signIn)]);
