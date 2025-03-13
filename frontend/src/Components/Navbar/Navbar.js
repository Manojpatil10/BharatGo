import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Navbar.module.css";
import { useCart } from "../../Store/Context";
import CartSlider from "../CartSlider/CartSlider";

const Navbar = () => {
  const token = localStorage.getItem("JWT");
  const username = localStorage.getItem("username");
  const { cartCount, setCartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      axios
        .post("http://localhost:8080/api/cartCount", { ID: token })
        .then((success) => {
          setCartCount(success.data.count);
        })
        .catch((error) => console.error("Error fetching cart count:", error));
    }
  }, [username, setCartCount, token]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("JWT");
      localStorage.removeItem("username");
      setCartCount(0);
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className="container d-flex align-items-center justify-content-between">
          <div className={styles.logoSection}>
            <h1 className={styles.logo}>Shopi</h1>
            {/* Hamburger Menu */}
            <i className={`fas fa-bars ${styles.hamburger}`} onClick={() => setMenuOpen(!menuOpen)}></i>
          </div>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>All</NavLink></li>
            <li><NavLink to="/clothes" onClick={() => setMenuOpen(false)}>Clothes</NavLink></li>
            <li><NavLink to="/electronics" onClick={() => setMenuOpen(false)}>Electronics</NavLink></li>
            <li><NavLink to="/furnitures" onClick={() => setMenuOpen(false)}>Furnitures</NavLink></li>
            <li><NavLink to="/toys" onClick={() => setMenuOpen(false)}>Toys</NavLink></li>
          </ul>

          <div className={styles.userSection}>
            {username ? (
              <div className={styles.userDropdown} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <i className="fas fa-user-circle" style={{ fontSize: "1.5rem", cursor: "pointer" }}></i>
                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)}>📦 My Orders</Link>
                    <Link to="/account" onClick={() => setDropdownOpen(false)}>👤 My Account</Link>
                    <div className={styles.cartDropdown} onClick={() => setCartOpen(true)}>
                      🛒 Cart {cartCount > 0 && <span className={styles.cartCount}>({cartCount})</span>}
                    </div>
                    <span className={styles.logout} onClick={handleLogout}>🚪 Logout</span>
                  </div>
                )}
              </div>
            ) : (
              <span>
                <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
              </span>
            )}
          </div>
        </div>
      </nav>

      <CartSlider isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Navbar;
