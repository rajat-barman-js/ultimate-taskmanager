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
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Confirm
          </button>
          <button
            onClick={(e) => {
              onCancel();
              e.stopPropagation();
            }}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
