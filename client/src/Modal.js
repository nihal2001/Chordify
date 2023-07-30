import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSelect, chords }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {chords.map((chord, index) => (
          <button key={index} onClick={() => onSelect(chord)}>{chord}</button>
        ))}
      </div>
    </div>
  );
};

export default Modal;
