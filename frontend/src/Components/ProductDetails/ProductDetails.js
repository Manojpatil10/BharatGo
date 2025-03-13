import React from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <div className={`${styles.productDetails} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h3>Product Details</h3>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.content}>
        <img src={product.images[0]} alt={product.title} className={styles.productImage} />
        <h4 className={styles.price}>${product.price}</h4>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
