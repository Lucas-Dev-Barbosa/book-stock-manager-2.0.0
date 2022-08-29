import Registro from "../Registro";

const ListaRegistros = ({ listaRegistros, onEdit, onDelete, selectPerfis }) => {
  return (
    <>
      {listaRegistros.map((item) => (
        <Registro dadosRegistro={item} selectPerfis={selectPerfis} key={item.id} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
};

export default ListaRegistros;
