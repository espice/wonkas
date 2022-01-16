import styles from "./index.module.scss";
export default function Cart({ cartItems }) {
  return (
    <Layout title="Cart">
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <h1>Your cart</h1>
        </div>

        <div className={styles.container__content}>
          {cartItems.map((item) => {
            console.log("hi")
            return (
              <div>
                <div className={styles.container__content__item}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.container__content__item__image}
                  />

                  <div className={styles.container__content__item__info}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3>{item.price}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
