const ControlePaginacao = ({ paginacao, onSend }) => {
  function onClickHandlerPrimeiraPagina() {
    onSend({ filtro: paginacao.filtro, pagina: 1 });
  }

  function onClickHandlerUltimaPagina() {
    onSend({ filtro: paginacao.filtro, pagina: paginacao.totalPaginas });
  }

  function onClickHandlerVoltaPagina() {
    onSend({ filtro: paginacao.filtro, pagina: paginacao.numPagina - 1 });
  }

  function onClickHandlerAvancaPagina() {
    onSend({ filtro: paginacao.filtro, pagina: paginacao.numPagina + 1 });
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li
          className={
            paginacao.numPagina === 1 ? "page-item disabled" : "page-item"
          }
        >
          <button
            onClick={onClickHandlerPrimeiraPagina}
            className="page-link"
            tabIndex="-1"
          >
            <i className="oi oi-media-skip-backward"></i>
          </button>
        </li>
        <li
          className={
            paginacao.numPagina === 1 ? "page-item disabled" : "page-item"
          }
        >
          <button
            onClick={onClickHandlerVoltaPagina}
            className="page-link"
            tabIndex="-1"
          >
            <i className="oi oi-media-step-backward"></i>
          </button>
        </li>
        <li className="page-item">
          <p className="page-link">{paginacao.numPagina}</p>
        </li>
        <li
          className={
            paginacao.numPagina === paginacao.totalPaginas ||
            paginacao.totalPaginas === 0
              ? "page-item disabled"
              : "page-item"
          }
        >
          <button
            className="page-link"
            onClick={onClickHandlerAvancaPagina}
          >
            <i className="oi oi-media-step-forward"></i>
          </button>
        </li>
        <li
          className={
            paginacao.numPagina === paginacao.totalPaginas ||
            paginacao.totalPaginas === 0
              ? "page-item disabled"
              : "page-item"
          }
        >
          <button
            className="page-link"
            onClick={onClickHandlerUltimaPagina}
          >
            <i className="oi oi-media-skip-forward"></i>
          </button>
        </li>
      </ul>
      <div className="pagination justify-content-center">
        <span className="text-muted">
          {"Páginas " +
            (paginacao.totalPaginas === 0 ? "0" : paginacao.numPagina) +
            " de " +
            paginacao.totalPaginas}
        </span>
      </div>
    </nav>
  );
};

export default ControlePaginacao;
