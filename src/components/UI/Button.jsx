import React from 'react';
import styles from './Button.module.css';
//Button
const Button = ({ children, onClick, disabled, ...props }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;