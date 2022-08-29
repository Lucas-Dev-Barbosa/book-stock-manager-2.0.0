import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertWarn from "../../../layoult/components/AlertWarn";
import api from "../../../services/api";

function formataData(data) {
  var d = new Date(data);
  return (
    d.getUTCDate() + "/" + Number(d.getUTCMonth() + 1) + "/" + d.getFullYear()
  );
}

const DetalhamentoLivro = () => {
  const { idLivro } = useParams();
  const [detalheLivro, setDetalheLivro] = useState();

  const { roles } = useSelector((state) => state);

  const navigate = useNavigate();

  //Busca os detalhes do livro na API
  const getDetalhamentoLivro = useCallback(async () => {
    await api
      .get(`livros/${idLivro}`)
      .then((response) => {
        setDetalheLivro(response.data);
      })
      .catch((err) => {
        console.log("Ocorreu um erro ao buscar os dados: " + err);
      });
  }, [idLivro]);

  useEffect(() => {
    getDetalhamentoLivro();
  }, [getDetalhamentoLivro]);

  function deleteHandler() {
    api
      .delete(`livros/${detalheLivro.id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Título excluído do estoque com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate(`/livros-cadastrados`);
        }
      })
      .catch((err) => {
        toast.error("Erro ao tentar excluir o livro!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Ocorreu um erro no request: " + err);
      });
  }

  return (
    detalheLivro && (
      <div style={{ width: "70rem" }}>
        <AlertWarn
          titulo={"Excluir livro"}
          mensagem={
            "Após a exclusão deste título, as informações do estoque serão removidas do sistema!!"
          }
          buttonLabel={"Excluir"}
          onClickAlert={deleteHandler}
        />

        <div className="row g-3">
          <div className="col-auto">
            <h2>Detalhes do livro</h2>
          </div>
          <div className="col-auto dropend">
            <a
              className="btn btn-secondary dropdown-toggle"
              href="/#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="oi oi-cog"></i>
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  to={`/estoque/${detalheLivro.titulo}`}
                  className="dropdown-item"
                >
                  <i className="oi oi-folder"></i> Estoque
                </Link>
              </li>
              {roles.some((item) => item === "ROLE_ADMIN") && (
                <li>
                  <Link
                    to={`/cadastro-livro/${detalheLivro.id}`}
                    className="dropdown-item"
                  >
                    <i className="oi oi-pencil"></i> Editar
                  </Link>
                </li>
              )}
              {roles.some((item) => item === "ROLE_ADMIN") && (
                <li>
                  <hr className="dropdown-divider" />
                </li>
              )}
              {roles.some((item) => item === "ROLE_ADMIN") && (
                <li>
                  <a
                    href="/#"
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#alertModal"
                  >
                    <i className="oi oi-delete"></i> Excluir
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <br />

        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={"data:image/jpeg;base64," + detalheLivro.fotoCapa}
              className="img-fluid rounded-start"
              alt="Imagem Capa"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{detalheLivro.titulo}</h3>

              <br />

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">Editora: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">{detalheLivro.editora}</p>
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">Autor: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">{detalheLivro.autor}</p>
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">ISBN: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">{detalheLivro.isbn}</p>
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">Preço: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">
                    {detalheLivro.preco &&
                      "R$ " +
                        detalheLivro.preco +
                        (detalheLivro.preco.match(/,\d$/)
                          ? "0"
                          : !detalheLivro.preco.match(/,/)
                          ? ",00"
                          : "")}
                  </p>
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">Data da Publicação: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">
                    {formataData(detalheLivro.dataPublicacao)}
                  </p>
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">
                  {" "}
                  <span className="fw-semibold">Número de Páginas: </span>{" "}
                </dt>
                <dd className="col-sm-7">
                  <p className="card-text">{detalheLivro.numeroPaginas}</p>
                </dd>
              </dl>

              <p className="card-text">{detalheLivro.sinopse}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DetalhamentoLivro;
