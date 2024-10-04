import React from "react";
import styles from "./footer.module.css"; // Create a CSS module for styling
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.cardBody}>
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <Link href="/" className="btn btn-success">
          Go somewhere
        </Link>
      </div>

    </div>
  );
};

export default Footer;
