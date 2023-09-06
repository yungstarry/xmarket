import { useEffect, useState } from "react";
import styles from "./ChangeOrderStatus.module.scss";
import Spinner from "../../spinnner/Spinner";
import Card from "../../card/Card";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsloading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsloading(false);
      toast.success("Order status status changed successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsloading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <>
      {isloading && <Spinner />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Stutus</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  --Choose one
                </option>

                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered...">Delivered...</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Stutus
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
