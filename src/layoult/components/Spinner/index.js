const Spinner = ({ width = "5rem", height = "5rem", color = "text-primary" }) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={"spinner-border " + color}
        style={{ width: width, height: height }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
