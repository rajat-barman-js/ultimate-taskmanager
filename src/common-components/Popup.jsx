import React, { useRef, useEffect } from "react";
import "./Popup.css";

const Popup = ({ message, onConfirm, onCancel }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      className="popup-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-message"
    >
      <div className="popup-content" ref={popupRef}>
        <p>{message}</p>
        <div className="popup-buttons">
          <button
            onClick={onConfirm}
            className="confirm-button"
            aria-label="Confirm"
          >
            Confirm
          </button>
          <button
            onClick={(e) => {
              onCancel();
              e.stopPropagation();
            }}
            className="cancel-button"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
