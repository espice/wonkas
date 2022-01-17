import Layout from "../../components/Layout";
import styles from "../../styles/pages/store/index.module.scss";
import { useEffect, useState, useContext } from "react";
import axios from "../../config/axios";
import UserContext from "../../components/userContext";
import Cart from "../../components/Store/Cart";
import Product from "../../components/Store/Product";
import SearchBar from "../../components/Store/SearchBar";
export default function Store() {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [productList, setProductList] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(async () => {
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    console.log(products);
    setProductList(products);

    const response = await axios.get("/api/cart");
    if (response.data.success) {
      setCartItems(response.data);
      console.log(response.data);
    }
  }, []);
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);
  return (
    <Layout title="Store">
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <h1>Wonka's</h1>
          <p>Get your favorite wonka bars here.</p>
          <a href="/store/cart">Proceed to cart</a>
          <div className={styles.container__heading__main}>
            <SearchBar setSearchResults={setSearchResults} />
          </div>

          {productList.map((product) => {
            return <Product product={product} size="small" id={userId} />;
          })}
        </div>
      </div>
    </Layout>
  );
}
