import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      <div>
        <span>{label}</span>
      </div>
    </button>
  );
}
