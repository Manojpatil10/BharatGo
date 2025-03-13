import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";
import ProductDetails from "../ProductDetails/ProductDetails"; // Updated import
import { useCart } from "../../Store/Context";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState({});
  const { setCartCount } = useCart();

  // State for Product Details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((success) => success.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("JWT");

    const cartItem = {
      ID: token,
      id: product.id,
      title: product.title,
      price: product.price,
      categoryImage: product.images[0],
    };

    axios
      .post("http://localhost:8080/api/cart", cartItem, {
        headers: { "Content-Type": "application/json" },
      })
      .then((success) => {
        console.log("Cart updated:", success.data);
        setCart((prevCart) => ({
          ...prevCart,
          [product.id]: !prevCart[product.id],
        }));

        // Fetch updated cart count
        axios
          .post("http://localhost:8080/api/cartCount", { ID: token })
          .then((success) => {
            setCartCount(success.data.count);
          })
          .catch((error) => {
            console.error("Error updating cart count:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  // Open Product Details with Product Info
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  // Close Product Details
  const closeProductDetails = () => {
    setIsProductDetailsOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className={styles.searchDiv}>
        <h2 className={styles.heading}>Home</h2>
        <input
          type="text"
          placeholder="Search a product"
          className={styles.searchBox}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={`${styles.productDiv} row`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" 
              onClick={() => handleProductClick(product)}
            >
              <div className={styles.productCard}>
                <div className={`position-relative ${styles.productImgDiv}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <span className={styles.category}>{product.category.name}</span>
                  <span
                    className={`${styles.addToCart} ${cart[product.id] ? styles.added : ""}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening details on cart click
                      handleAddToCart(product);
                    }}
                  >
                    <i className={cart[product.id] ? "fas fa-check" : "fas fa-plus"}></i>
                  </span>
                </div>
                <div className="row mt-2">
                  <span className={`${styles.title} col-6 text-start`}>{product.title}</span>
                  <span className={`${styles.price} col-6 text-end`}>${product.price}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>Loading....</p>
        )}
      </div>

      {/* Product Details Component */}
      <ProductDetails 
        product={selectedProduct} 
        isOpen={isProductDetailsOpen} 
        onClose={closeProductDetails} 
      />
    </div>
  );
};

export default Products;
