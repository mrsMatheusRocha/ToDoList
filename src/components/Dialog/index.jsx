import { useEffect, useRef } from "react";
import "./Dialog.style.css";
import { IconClose } from "../../components/icons/index.jsx";

export default function Dialog({ children, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isOpen]);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", onClose);
    return () => {
      dialog?.removeEventListener("close", onClose)
    }
  }, [onClose]);

  return (
    <>
      <dialog ref={dialogRef} className="dialog">
        <div className="btn-close-wrapper">
          <button autoFocus onClick={onClose} className="btn-close">
            <IconClose />
          </button>
        </div>
        <div className="body">{children}</div>
      </dialog>
    </>
  );
}
