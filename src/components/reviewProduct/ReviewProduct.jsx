import { useEffect, useState } from "react";
import styles from "./reviewProduct.module.scss";
import StarsRating from "react-star-rate";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName, selectuserID } from "../../redux/slice/authSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import Card from "../card/Card";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import Spinner from "../spinnner/Spinner";

const ReviewProduct = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const userID = useSelector(selectuserID);
  const userName = useSelector(selectUserName);

  const { document } = useFetchDocument("product", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const sumbitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review Submited");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        {product === null ? (
          <Spinner />
        ) : (
          <>
            <p>
              <b>Product name: {product.name}</b>
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "200px" }}
            />
            <Card cardClass={styles.card}>
              <form onSubmit={(e) => sumbitReview(e)}>
                <label>Rating: </label>
                <StarsRating
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                  }}
                />
                <label>Review: </label>
                <textarea
                  cols="30"
                  rows="10"
                  value={review}
                  required
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>

                <button type="submit" className="--btn --btn-primary">
                  Submit Review
                </button>
              </form>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewProduct;
