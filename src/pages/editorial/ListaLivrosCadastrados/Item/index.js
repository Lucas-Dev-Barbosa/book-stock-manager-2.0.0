import { Link } from "react-router-dom";

const Item = ({ detalhesLivro }) => {
  return (
    <div className="col">
      <div className={"card mb-3"}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={"data:image/jpeg;base64," + detalhesLivro.fotoCapa}
              className={"img-fluid rounded-start"}
              style={{height: '180px'}}
              alt="Imagem Capa"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-truncate">
                {detalhesLivro.titulo}
              </h5>
              <p className="card-text text-truncate">
                {detalhesLivro.editora}
              </p>
              <p className="card-text text-muted text-truncate">
                {detalhesLivro.autor}
              </p>
              <p className="card-text text-truncate">
                {detalhesLivro.sinopse}
              </p>
            </div>
          </div>
          <Link to={`/detalhamento-livro/${detalhesLivro.id}`} className="stretched-link"></Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
