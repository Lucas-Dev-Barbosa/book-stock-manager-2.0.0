import { useRef } from "react";

const Filtro = ({ onSend, label }) => {
  const filtroRef = useRef();

  function onSendHandler() {
    onSend({
      filtro: filtroRef.current.value
        ? filtroRef.current.value.trim()
        : filtroRef.current.value,
    });
  }

  return (
    <div className="row g-3">
      <div
        className={"col-auto input-group"}
        style={{
          width: 500,
          marginBottom: 30,
        }}
      >
        <div className="input-group-text">{label}</div>
        <input
          type="text"
          ref={filtroRef}
          className="form-control"
          onKeyUp={(ev) => {
            var typingTimer;
            var doneTypingInterval = 1000;

            clearTimeout(typingTimer);
            if (ev.target.value) {
              typingTimer = setTimeout(onSendHandler, doneTypingInterval);
            }
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Filtro;
