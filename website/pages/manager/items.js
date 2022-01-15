import Layout from "../../components/Layout";
import Sidebar from "../../components/SideNav";
import { useEffect, useState } from "react";
import axios from "../../config/axios";

import styles from "../../styles/pages/manager/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext } from "react";
import UserContext from "../../components/userContext";

const Manager = () => {
  const { user } = useContext(UserContext);
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    setProductList(products);
  }, []);

  return (
    <Layout>
      <Sidebar />
      <div className={styles.main}>
        <h1 className={styles.main__heading}>Items</h1>
        <h4 className={styles["main__sub-heading"]}>Items in the store</h4>

        <div className={styles["main__productList"]}>
          {productList.map((product) => {
            return (
              <div
                key={product._id}
                className={styles["main__productList__productCard"]}>
                <img src={product.picture} alt={product.name} />
                <h1>{product.name}</h1>
                <div>
                  Price <span>${product.price}</span>
                </div>
                <button
                  onClick={() => {
                    axios.post("/products/delete", { id: product._id });
                    window.location.reload();
                  }}>
                  Remove Item
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Manager;
