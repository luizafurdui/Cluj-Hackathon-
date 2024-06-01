import { useEffect, useRef } from 'react';
import './Modal.css'; 

const Modal = ({ onClose, isOpen, children }) => {
  const modalRef = useRef();

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && modalRef.current === event.target) {
        onClose(); // Call the onClose function if click is outside the modal
      }
    };

    // Only add the event listener if the modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="modal-backdrop">
      <div className="modal">
        {children}
        {/* TODO @Andrei enable maybe <button type="button" onClick={onClose}>Close</button> */}
        <button className='modal-button' onClick={onClose}>Close</button>
      </div>
      
    </div>
  );
};

export default Modal;