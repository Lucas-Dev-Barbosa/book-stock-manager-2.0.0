import { useSelector } from "react-redux";
import ListaRegistros from "./ListaRegistros";

const Table = ({ listaRegistros, onEdit }) => {
  const { roles } = useSelector((state) => state);

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Título do Livro</th>
          <th scope="col">Quantidade em estoque</th>
          <th scope="col">Quantidade vendidos</th>
          <th scope="col">Status disponibilidade</th>
          {roles.some((item) => item === "ROLE_ADMIN") && <th scope="col"></th>}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <ListaRegistros listaRegistros={listaRegistros} onEdit={onEdit} />
      </tbody>
    </table>
  );
};

export default Table;
