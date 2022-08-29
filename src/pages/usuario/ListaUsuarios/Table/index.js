import ListaRegistros from "./ListaRegistros";

const Table = ({ listaRegistros, onEdit, onDelete, selectPerfis }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">E-mail</th>
          <th scope="col">Nome</th>
          <th scope="col">Sobrenome</th>
          <th scope="col">Status</th>
          <th scope="col">Perfil</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <ListaRegistros listaRegistros={listaRegistros} selectPerfis={selectPerfis} onEdit={onEdit} onDelete={onDelete} />
      </tbody>
    </table>
  );
};

export default Table;
