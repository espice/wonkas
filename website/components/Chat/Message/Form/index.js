import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const TextField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  borderColor = "#5c0099",
  ...rest
}) => {
  return (
    <div className={styles["text-field"]}>
      {/* <p className={styles["text-field__label"]}>{label}</p> */}
      <input
        className={styles["text-field__input"]}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        style={{ borderColor: borderColor }}
        {...rest}
      ></input>
    </div>
  );
};

export default TextField;
