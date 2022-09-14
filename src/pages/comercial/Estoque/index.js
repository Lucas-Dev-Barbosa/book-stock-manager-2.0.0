import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "./Table";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import { useParams } from "react-router-dom";
import AlertWarn from "../../../layoult/components/AlertWarn";
import apiEstoque from "../../../services/apiEstoque";
import Spinner from "../../../layoult/components/Spinner";

const Estoque = () => {
  const [listaItens, setlistaItens] = useState({
    content: [],
    number: 0,
    totalPages: 1,
  });
  const [paramsUri, setParamsUri] = useState({ pagina: "" });
  const [registroEditado, setRegistroEditado] = useState();
  const [loading, setLoading] = useState(true);

  const { idLivro } = useParams();

  //Busca a lista dos registros no estoque na API
  const getListaEstoque = useCallback(async () => {
    setLoading(true);

    let url = !idLivro
      ? "estoque/paginacao?pagina=" + (paramsUri.pagina ? paramsUri.pagina : "")
      : "estoque/livro/" + idLivro;

    await apiEstoque
      .get(url)
      .then((response) => {
        if (!response.data.content) {
          setlistaItens((prevState) => {
            return { ...prevState, content: [response.data] };
          });
        } else {
          setlistaItens(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao buscar a lista no estoque", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Ocorreu um erro ao buscar os dados: " + err);
        setLoading(false);
      });
  }, [paramsUri, idLivro]);

  useEffect(() => {
    getListaEstoque();
  }, [getListaEstoque]);

  //Atualiza os dados do livro no estoque
  function updateHandler() {
    if (registroEditado) {
      apiEstoque
        .put("estoque/", registroEditado)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Informações do Estoque salvas com sucesso", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          getListaEstoque();
        })
        .catch((err) => {
          toast.error("Erro ao enviar os dados do estoque", {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.log("Erro na requisição: " + err);
        });

        setRegistroEditado();
    }
  }

  function editHandler(dadosRegistro) {
    setRegistroEditado(dadosRegistro);
  }

  return (
    <div>
      <AlertWarn
        titulo={"Editar estoque"}
        mensagem={"Confirma a edição dos dados deste título?"}
        buttonLabel={"Editar"}
        onClickAlert={updateHandler}
      />

      <h2>Estoque</h2>

      {loading && <Spinner />}

      <br />

      {!loading && listaItens.content && (
        <Table listaRegistros={listaItens.content} onEdit={editHandler} />
      )}
      {!loading && (!listaItens.content || listaItens.content.length < 1) && (
        <p className="col">O estoque se encontra vazio!</p>
      )}

      {!loading && listaItens.content && listaItens.content.length > 0 && (
        <ControlePaginacao
          onSend={setParamsUri}
          paginacao={{
            numPagina: listaItens.number + 1,
            totalPaginas: listaItens.totalPages,
            filtro: paramsUri.filtro,
          }}
        />
      )}
    </div>
  );
};

export default Estoque;
