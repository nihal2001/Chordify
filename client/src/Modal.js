import React from 'react';

const Modal = ({ isOpen, onClose, onSelect, chords }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <ul>
        {chords.map((chord, index) => (
          <li key={index} onClick={() => onSelect(chord)}>{chord}</li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
