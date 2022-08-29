const AlertError = ({mensagem}) => {
  return (
    <div>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <i className="oi oi-warning bi flex-shrink-0 me-2"></i>
        <div style={{display: "inline"}}>{mensagem}</div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default AlertError;
