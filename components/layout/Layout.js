import React from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children, title }) => {
  return (
    <>
      <header className={styles.header}>
        <span>{title}</span>
      </header>
      <div className={styles.mainContent}>{children}</div>
      <footer className={styles.footer}>
        <div>Developed by: <strong>Kaushal Chaudhary</strong></div>
      </footer>
    </>
  );
};

export default Layout;
