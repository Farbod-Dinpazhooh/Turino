import styles from "./ModalContainer.module.css";

function ModalContainer({ children, isOpen, setIsOpen }) {
  if (!isOpen) return;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        <div className={styles.modal_contant}>
          {children}
          <button onClick={() => setIsOpen(false)} className={styles.button}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
