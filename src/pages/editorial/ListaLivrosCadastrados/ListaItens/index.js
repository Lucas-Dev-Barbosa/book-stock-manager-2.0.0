import Item from "../Item";

const ListaItens = ({ listaItens }) => {
  return (
    <>
      {listaItens.map((item) => (
        <Item detalhesLivro={item} key={item.id} />
      ))}
    </>
  );
};

export default ListaItens;
