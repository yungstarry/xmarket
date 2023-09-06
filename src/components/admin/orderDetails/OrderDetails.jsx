import React, { useEffect, useState } from "react";
import styles from "./Orderdetails.module.scss";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>

        <div>
          <Link to={"/admin/orders"}>&larr; Back to Admin</Link>
        </div>
        <br />
        {order === null ? (
          <Loader />
        ) : (
          <>
            <p>
              <b>Order ID </b>
              {order.id}
            </p>
            <p>
              <b>Order Amount: </b>${order.orderAmount}
            </p>
            <p>
              <b>Order Status </b>
              {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address </b>
              <br />
              Address:{order.shippingAddress.line1},
              {order.shippingAddress.line2},{order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quanity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>{" "}
                        <img
                          src={imageURL}
                          alt="Image"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>{cartQuantity}</td>
                      <td>${(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id}/>
      </div>
    </section>
  );
};

export default OrderDetails;
