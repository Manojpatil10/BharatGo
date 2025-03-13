import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MyOrder.module.css";
import Navbar from "../../Components/Navbar/Navbar";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("JWT");

  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    } else {
      axios
        .post("http://localhost:8080/api/orders", { ID: token })
        .then((success) => {
          setOrders(success.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [username, navigate, token]);


  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className={styles.title}>My Orders</h1>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <h3>Order ID: {order._id}</h3>
              <p>
                Status: <span className={styles.status}>{order.status}</span>
              </p>
              <p>
                Total Price: <strong>${order.totalPrice.toFixed(2)}</strong>
              </p>
              <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>

              <div className={styles.items}>
                {order.items.map((item) => (
                  <div key={item._id} className={styles.item}>
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className={styles.image}
                    />
                    <div>
                      <h4>{item.productName}</h4>
                      <p>Price: ${item.productPrice.toFixed(2)}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noOrders}>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default MyOrder;
