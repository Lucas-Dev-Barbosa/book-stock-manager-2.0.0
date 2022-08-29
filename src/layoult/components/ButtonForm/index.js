import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ButtonForm = ({ value, valueLoading, statusLoading = false }) => {
  const { loading } = useSelector((state) => state);

  const buttonRef = useRef();

  useEffect(() => {
    if (loading || statusLoading) {
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.disabled = false;
    }
  }, [loading, statusLoading, buttonRef]);

  return (
    <button ref={buttonRef} type="submit" className="btn btn-primary">
      {(loading || statusLoading) && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {(loading || statusLoading) ? valueLoading : value}
    </button>
  );
};

export default ButtonForm;
