import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import classes from "./Form.module.css";
import AlertError from "../../../layoult/components/AlertError";
import apiLivros from "../../../services/apiLivros";
import ButtonForm from "../../../layoult/components/ButtonForm";

const detalheLivroDefault = {
  titulo: "",
  autor: "",
  editora: "",
  isbn: "",
  numeroPaginas: "",
  dataPublicacao: "",
  preco: "",
  fotoCapa: "",
  sinopse: "",
};

const CadastroLivro = () => {
  const { idLivro } = useParams();

  const [detalheLivro, setDetalheLivro] = useState(detalheLivroDefault);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function detalheLivroHandler(e) {
    setDetalheLivro((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  }

  //Converte a imagem enviada pelo INPUT para base64
  const inputFileImageHandle = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setDetalheLivro((prevState) => {
          return {
            ...prevState,
            fotoCapa: reader.result.substring(reader.result.indexOf(",") + 1),
          };
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //Busca as informacoes detalhadas do livro na API
  const getDetalheLivro = useCallback(async () => {
    await apiLivros
      .get(`livros/${idLivro}`)
      .then((response) => {
        setDetalheLivro(response.data);
      })
      .catch((err) => {
        console.log("Ocorreu um erro ao buscar os dados: " + err);
      });
  }, [idLivro]);

  useEffect(() => {
    if (idLivro) {
      getDetalheLivro();
    } else {
      setDetalheLivro(detalheLivroDefault);
    }
  }, [getDetalheLivro, idLivro]);

  //Processando os dados antes de enviar para a API
  function processaDadosLivro() {
    let detLivro = detalheLivro;
    return JSON.stringify(detLivro);
  }

  function submitHandler(e) {
    e.preventDefault();

    setLoading(true);

    setErrors([]);

    let livroJson = processaDadosLivro();

    let path = "livros/";

    (idLivro ? apiLivros.put(path, livroJson) : apiLivros.post(path, livroJson))
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success("Informações do Livro salvas com sucesso", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate(
            `/detalhamento-livro/${idLivro ? idLivro : response.data.id}`
          );

          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Erro ao enviar os dados do livro", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Erro na requisição: " + err);

        if (err.request.responseText) {
          let error = JSON.parse(err.request.responseText);
          if (error) {
            setErrors(error.message);
          }
        }
      });
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className={classes.formCadastro + " row g-3 mx-auto"}
        noValidate
      >
        {errors &&
          errors.map((value, index) => (
            <AlertError mensagem={value} key={index} />
          ))}

        <h2>{idLivro ? "Edição de dados do Livro" : "Cadastro de Livro"}</h2>

        {idLivro && (
          <p>Edite os dados cadastrados do livro nos campos abaixo!</p>
        )}

        {!idLivro && (
          <div>
            <p>Insira abaixo os dados do livro a ser cadastrado no estoque!</p>
            <p
              className="font-weight-light p-3 mb-2 bg-dark text-white"
              style={{ fontSize: "14px" }}
            >
              Após o livro ser cadastrado no sistema, as informações de
              gerenciamento de estoque estarão zeradas. Navegue até a página de
              estoque para alterá-las.
            </p>
          </div>
        )}

        <br />

        <div className="col-md-12">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            placeholder="Titulo do livro"
            value={detalheLivro.titulo}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="autor" className="form-label">
            Autor
          </label>

          <input
            type="text"
            className="form-control"
            id="autor"
            placeholder="Autor"
            value={detalheLivro.autor}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="editora" className="form-label">
            Editora
          </label>
          <input
            type="text"
            className="form-control"
            id="editora"
            placeholder="Editora"
            value={detalheLivro.editora}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="preco" className="form-label">
            Preço
          </label>
          <div className="input-group">
            <div className="input-group-text">R$</div>
            <NumberFormat
              id="preco"
              type="text"
              className="form-control"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale="2"
              fixedDecimalScale
              allowNegative={false}
              placeholder="0,00"
              value={detalheLivro.preco}
              onChange={(e) => detalheLivroHandler(e)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="numeroPaginas" className="form-label">
            Qtd/Páginas
          </label>
          <NumberFormat
            type="text"
            className="form-control"
            id="numeroPaginas"
            allowNegative={false}
            placeholder="0"
            value={detalheLivro.numeroPaginas}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="dataPublicacao" className="form-label">
            Data da Publicação
          </label>
          <input
            type="date"
            className="form-control"
            id="dataPublicacao"
            value={detalheLivro.dataPublicacao}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            placeholder="ISBN"
            value={detalheLivro.isbn}
            onChange={(e) => detalheLivroHandler(e)}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="foto" className="form-label">
            Foto da capa
          </label>
          <input
            className="form-control"
            type="file"
            id="foto"
            onChange={(e) => inputFileImageHandle(e)}
          />
        </div>

        {idLivro && (
          <div className="col-md-12">
            <img
              src={
                detalheLivro.fotoCapa &&
                "data:image/jpeg;base64," + detalheLivro.fotoCapa
              }
              className="img-fluid rounded-start"
              alt="Imagem Capa"
            />
          </div>
        )}

        <div className="col-md-12">
          <label htmlFor="sinopse" className="form-label">
            Sinopse
          </label>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="sinopse"
            placeholder="Sinopse"
            defaultValue={detalheLivro.sinopse}
            onChange={(e) => detalheLivroHandler(e)}
          ></textarea>
        </div>

        <ButtonForm
          value={idLivro ? "Editar" : "Cadastrar"}
          valueLoading=" Enviando..."
          statusLoading={loading}
        />
      </form>
    </div>
  );
};

export default CadastroLivro;
