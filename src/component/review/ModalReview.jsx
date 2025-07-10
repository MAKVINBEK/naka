import { useState } from "react";
import Modal from "../../assets/Modal";
import css from "./Review.module.css"

const ReviewModal = ({ onClose}) => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (review.length === 0) return;
    alert("Отзыв отправлен: " + text);
    onClose();
  };

  return (
    <Modal onClose={onClose} style={{ maxWidth: "856px" }}>
      <h2 className={css.modal_title}>ОСТАВИТЬ ОТЗЫВ</h2>
      <p className={css.modal_subtitle}>Не больше 300 символов</p>
      <textarea
        placeholder="Напишите отзыв о Navischange"
        value={review}
        maxLength={300}
        onChange={(e) => setReview(e.target.value)}
        className={css.modal_textarea}
      />
      <button className={css.modal_button} onClick={handleSubmit}>Отправить</button>
    </Modal>
  );
};

export default ReviewModal;
