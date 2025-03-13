import React from 'react';
import styles from './OtherSection.module.css';
import Navbar from '../../Components/Navbar/Navbar';

const OtherSection = () => {
  return (
    <>
      <Navbar />
      <div className={styles.contentContainer}>
        <h2 className={styles.heading}>Home</h2>
        <input type="text" placeholder="Search a product" className={styles.searchBox} />
        <div className={styles.noResults}>
          <i className="fas fa-frown-open"></i>
          <p className={styles.message}>Nothing related :(</p>
        </div>
      </div>
    </>
  );
};

export default OtherSection;
