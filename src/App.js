import "./App.css";
import { ToastContainer } from "react-toastify";
import Layoult from "./layoult/LayoultBase";
import { BrowserRouter } from "react-router-dom";
import SystemRoutes from "./SystemRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import ApiService from "./services/ApiService";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ApiService>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Layoult>
                <ToastContainer autoClose={3500} />
                <SystemRoutes />
              </Layoult>
            </BrowserRouter>
          </PersistGate>
        </ApiService>
      </Provider>
    </div>
  );
}

export default App;
