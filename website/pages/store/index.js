import Layout from "../../components/Layout";
import styles from "../../styles/pages/store/index.module.scss";
import { useEffect, useState, useContext } from "react";
import axios from "../../config/axios";
import UserContext from "../../components/userContext";
export default function Store() {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [productList, setProductList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    setProductList(products);

    const response = await axios.get("/api/cart");
    if (response.data.success) {
      setCartItems(response.data);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  return (
    <Layout>
      <div className={styles["container"]}>
        <div>
          <h1>Wonka's</h1>

          <a href="/store/cart">
            <img
              className={styles["cartIcon"]}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shopping_cart_font_awesome.svg/1024px-Shopping_cart_font_awesome.svg.png"
            />
          </a>
        </div>

        <div>
          <div className={styles["searchBar"]}>
            <input type="text" placeholder="Search" />
            <img
              className={styles["searchIcon"]}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_search-ltr.svg/1200px-OOjs_UI_icon_search-ltr.svg.png"
            />
          </div>
        </div>

        <div>
          {productList.map((product) => {
            const existsInCart = false;
            if (cartItems.length > 0) {
              existsInCart = cartItems.some((i) => {
                return product._id == i.id;
              });
            }

            return (
              <div className={styles["productCard"]} key={product._id}>
                <img src={product.picture} />
                <h2>{product.name}</h2>
                <h4>${product.price}</h4>
                {existsInCart ? (
                  <div>
                    <button>+</button>
                    <h3>
                      {
                        cartItems.find((i) => {
                          return i.id == product._id;
                        }).quantity
                      }
                    </h3>
                    <button>-</button>
                  </div>
                ) : (
                  <div>
                    <button>Add to cart</button>
                    <button>View</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
