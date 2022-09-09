import { Route, Routes } from "react-router-dom";
import Estoque from "../pages/comercial/Estoque";
import DetalhamentoLivro from "../pages/editorial/DetalhamentoLivro";
import ListaLivrosCadastrados from "../pages/editorial/ListaLivrosCadastrados";
import Home from "../pages/Home";
import CadastroLivro from "../pages/editorial/CadastroLivro";
import CadastroUsuario from "../pages/usuario/CadastroUsuario";
import ListaUsuarios from "../pages/usuario/ListaUsuarios";
import Login from "../pages/Login";
import PrivatePage from "./PrivatePage";
import PerfilUsuario from "../pages/usuario/PerfilUsuario";

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivatePage>
            <Home />
          </PrivatePage>
        }
      />

      <Route path="/cadastro-livro">
        <Route
          path=""
          element={
            <PrivatePage>
              <CadastroLivro />
            </PrivatePage>
          }
        />
        <Route
          path=":idLivro"
          element={
            <PrivatePage>
              <CadastroLivro />
            </PrivatePage>
          }
        />
      </Route>

      <Route
        path="/livros-cadastrados"
        element={
          <PrivatePage>
            <ListaLivrosCadastrados />
          </PrivatePage>
        }
      />

      <Route
        path="/detalhamento-livro/:idLivro"
        element={
          <PrivatePage>
            <DetalhamentoLivro />
          </PrivatePage>
        }
      />

      <Route path="/estoque">
        <Route
          path=""
          element={
            <PrivatePage>
              <Estoque />
            </PrivatePage>
          }
        />
        <Route
          path=":tituloLivro"
          element={
            <PrivatePage>
              <Estoque />
            </PrivatePage>
          }
        />
      </Route>

      <Route
        path="/perfil-usuario"
        element={
          <PrivatePage>
            <PerfilUsuario />
          </PrivatePage>
        }
      />

      {false && (
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      )}

      <Route path="/lista-usuario">
        <Route
          path=""
          element={
            <PrivatePage>
              <ListaUsuarios />
            </PrivatePage>
          }
        />
        <Route
          path=":buscaUsuario"
          element={
            <PrivatePage>
              <ListaUsuarios />
            </PrivatePage>
          }
        />
      </Route>
    </Routes>
  );
};

export default SystemRoutes;
