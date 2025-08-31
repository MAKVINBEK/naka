import { useState } from "react";
import Modal from "../../assets/Modal";
import css from "./Review.module.css"
import { post } from "../../api/ApiRoutes";
import { toast } from "react-toastify";

const ReviewModal = ({ onClose}) => {
  const [review, setReview] = useState("");
  const [loading,setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await post.feedback(
        { text: review },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success("Отзыв отправлен");
    } catch (error) {
      toast.error(
        error.message||error.detail || "Ошибка при отправке отзыва"
      );
    } finally {
      setLoading(false)
    }
  };
  

  return (
    <Modal onClose={onClose} style={{ maxWidth: "856px" }}>
      <h2 className={css.modal_title}>ОСТАВИТЬ ОТЗЫВ</h2>
      <p className={css.modal_subtitle}>Не больше 300 символов</p>
      <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Напишите отзыв о Navischange"
        value={review}
        maxLength={300}
        minLength={40}
        onChange={(e) => setReview(e.target.value)}
        className={css.modal_textarea}
        required
      />
      <button className={css.modal_button} type="submit">{loading ? <div className="spinner "></div> :<div>Отправить</div>}</button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
