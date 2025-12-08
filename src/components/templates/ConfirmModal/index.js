"use client";

import styles from "./ConfirmModal.module.css";

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "بله",
  cancelText = "خیر",
}) {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]} onClick={onCancel}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles["modal-title"]}>{title}</h3>
        <p className={styles["modal-message"]}>{message}</p>

        <div className={styles["modal-buttons"]}>
          <button
            onClick={onConfirm}
            className={`${styles["modal-btn"]} ${styles.confirm}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className={`${styles["modal-btn"]} ${styles.cancel}`}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
