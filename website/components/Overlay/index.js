import styles from "./index.module.scss";
import { useRef, useEffect } from "react";
export default function Overlay({ options, setOpen }) {
  let overlayRef = useRef(null);

  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  if (options.type == "card") {
    return (
      <div className={styles.card} ref={overlayRef}>
        {options.options.map((option, index) => {
          return (
            <div
              className={styles.card__option}
              key={index}
              onClick={option.action}
            >
              <p>{option.text}</p>
              <div
                className={styles.card__option__icon}
                styles={{ content: `url(${option.iconURL})` }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
