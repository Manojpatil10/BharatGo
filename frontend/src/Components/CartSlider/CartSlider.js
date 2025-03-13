import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CartSlider.module.css";
import { useCart } from "../../Store/Context";

const CartSlider = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const { setCartCount } = useCart();
  const token = localStorage.getItem("JWT");

  useEffect(() => {
    if (token && isOpen) {
      axios
        .get("http://localhost:8080/api/cart", { params: { ID: token } })
        .then((success) => {
          const updatedCart = success.data.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(updatedCart);
          setCartCount(updatedCart.length);
        })
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [token, isOpen, setCartCount]); // Removed `cartItems`
  

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  };

  // Update the quantity of a specific product
  const updateQuantity = (productID, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productID
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (productID) => {
    axios
      .delete("http://localhost:8080/api/cart", {
        data: { productID, ID: token },
      })
      .then((success) => {
        axios
          .get("http://localhost:8080/api/cart", { params: { ID: token } })
          .then((response) => {
            setCartItems(response.data);
            setCartCount(response.data.length);
          })
          .catch((error) => console.error("Error fetching cart items:", error));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };
  


  const handleCheckout = () => {

    if (!token) {
      alert("User not authenticated!");
      return;
    }

    const orderData = {
      ID: token,
      items: cartItems.map((item) => ({
        productID: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        productPrice: item.productPrice,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(), // Send total price
    };

    axios
      .post("http://localhost:8080/api/checkout", orderData)
      .then((success) => {
        console.log("Checkout successful:", success.data);
        alert(success.data.message);
        setCartItems([]);
        setCartCount(0);
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        alert(error.response.data.message);
      });
  };


  return (
    <div className={`${styles.cartSlider} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>X</button>
      <h2>My Order</h2>
      {cartItems.length > 0 ? (
        <div className={styles.cartContent}>
          <div>
            {cartItems.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className={styles.image}
                />
                <div className={styles.itemDetails}>
                  <h4 className={styles.productName}>{item.productName}</h4>
                  <p className={styles.price}>${item.productPrice.toFixed(2)}</p>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.productId, -1);
                      }}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item.productId, 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.productId);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <div className={styles.totalSection}>
            <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartSlider;

