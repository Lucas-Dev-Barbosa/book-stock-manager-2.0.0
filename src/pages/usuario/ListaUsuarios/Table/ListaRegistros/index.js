import Registro from "../Registro";

const ListaRegistros = ({ listaRegistros, onEdit }) => {
  return (
    <>
      {listaRegistros.map((item) => (
        <Registro dadosRegistro={item} key={item.id} onEdit={onEdit} />
      ))}
    </>
  );
};

export default ListaRegistros;
