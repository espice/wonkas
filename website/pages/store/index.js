import Layout from "../../components/Layout";
import styles from "../../styles/pages/store/index.module.scss";
import { useEffect, useState } from "react";
import axios from "../../config/axios";

import Cart from "../../components/Store/Cart";
import Product from "../../components/Store/Product";
import SearchBar from "../../components/Store/SearchBar";
export default function Store() {
  const [cartItems, setCartItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    setProductList(products);

    const response = await axios.get("/api/cart");
    if (response.data.success) {
      setCartItems(response.data);
    }
  }, []);
  return (
    <Layout title="Store">
      <div className={styles.container}>
        <div className={styles.container__heading}>
          <h1>Wonka's</h1>
          <p>Get your favorite wonka bars here.</p>

          <div className={styles.container__heading__main}>
            <SearchBar setSearchResults={setSearchResults} />
          </div>

          {productList.map((product) => {
            return <Product product={product} size="small" />;
          })}
        </div>
      </div>
    </Layout>
  );
}
