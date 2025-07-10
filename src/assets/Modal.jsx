import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";


const Modal = ({ children, onClose, style = {}  }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={style} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><IoClose size={24}/></button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
