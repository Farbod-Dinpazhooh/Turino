import styles from "./ModalContainer.module.css";

function ModalContainer({ children, isOpen, setIsOpen, step, setStep }) {
  if (!isOpen) return;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        <div className={styles.modal_contant}>
          {children}
          <button
            onClick={() => {
              if (step === 2 && typeof setStep === "function") {
                setStep(1);
              } else {
                setIsOpen(false);
              }
            }}
            className={`${styles.button} ${
              step === 2 ? "" : styles.button_rotate
            }`}
            aria-label={step === 2 ? "back" : "close"}
          >
            {step === 2 ? "←" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
