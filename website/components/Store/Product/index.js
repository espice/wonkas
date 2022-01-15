import styles from "./index.module.scss";
export default function Product({ product, size }) {
  if (size === "small") {
    return (
      <div className={styles.product__small}>
        <img
          src={product.picture}
          alt={product.name}
          className={styles.product__small__image}
        />
        <h2>{product.name}</h2>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
      </div>
    );
  }
  return (
    <div className={styles.product__large}>
      <img
        src={product.picture}
        alt={product.name}
        className={styles.product__large__image}
      />

      <div className={styles.product__large__info}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
