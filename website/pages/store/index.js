import Layout from "../../components/Layout";
import styles from "../../styles/pages/store/index.module.scss";
import { useEffect, useState, useRef } from "react";
import axios from "../../config/axios";
import { Popup, useOnClickOutside } from "../../components/Popup";
import Loader from "../../components/Loading"
import styles2 from "../../styles/pages/manager/home.module.scss";
import {signOut } from "next-auth/client";
export default function Store() {
  const [productList, setProductList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef();
  useOnClickOutside(popupRef, () => setPopupOpen(false));

  useEffect(async () => {
    setLoading(true);
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    setProductList(products);

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    } else {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }

    setReload(false);
    setLoading(false);
  }, [reload]);

  const CheckoutPopup = () => {
    let _totalQty = 0;
    cartItems.forEach((i) => {
      _totalQty += i.quantity;
    });

    return (
      <div className={styles2["popup"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "150px",
          }}>
          <p style={{ fontSize: 20 + "px" }}>
            <span style={{ fontWeight: 600 }}>Total Amount: </span>$
            {_totalQty * 10}
          </p>
          {console.log(loading)}
          {loading ? <Loader/> : null}
          <button
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "rgba(92, 0, 153, 0.2)",
              color: "#5c0099",
              border: "3px solid #5c0099",
              borderRadius: "3px",
            }}
            onClick={() => {
              setCartItems([]);
              localStorage.setItem("cart", "[]");
              setPopupOpen(false);
              setReload(true);
            }}>
            Place Order
          </button>
        </div>
      </div>
    );
  };

  if (reload) {
    return <Layout />;
  } else {
    return (
      <Layout>
        <div className={styles["container"]}>
          <div>
            <h1>Wonka's</h1>

            <img
              onClick={() => {
                setPopupOpen(true);
              }}
              
              className={styles["cartIcon"]}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shopping_cart_font_awesome.svg/1024px-Shopping_cart_font_awesome.svg.png"
            />
            <button className="button-red" onClick={(e) => {
              axios.post("/auth/logout").then(() => {
                window.location.href = "/"
              })
            }}>Log Out</button>
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
              let existsInCart = false;
              if (cartItems.length > 0) {
                existsInCart = cartItems.some((i) => {
                  return i.id == product._id && i.quantity > 0;
                });
              }

              return (
                <div className={styles["productCard"]} key={product._id}>
                  <img src={product.picture} />
                  <h2>{product.name}</h2>
                  <h4>${product.price}</h4>
                  {existsInCart ? (
                    <div>
                      <button
                        onClick={() => {
                          cartItems.find((i) => {
                            return i.id == product._id;
                          }).quantity -= 1;

                          localStorage.setItem(
                            "cart",
                            JSON.stringify(cartItems)
                          );

                          setReload(true);
                        }}>
                        -
                      </button>
                      <h3>
                        {
                          cartItems.find((i) => {
                            return i.id == product._id;
                          }).quantity
                        }
                      </h3>
                      <button
                        onClick={() => {
                          cartItems.find((i) => {
                            return i.id == product._id;
                          }).quantity += 1;

                          localStorage.setItem(
                            "cart",
                            JSON.stringify(cartItems)
                          );

                          setReload(true);
                        }}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        cartItems.push({ id: product._id, quantity: 1 });

                        localStorage.setItem("cart", JSON.stringify(cartItems));

                        setReload(true);
                      }}>
                      Add to cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Popup ref={popupRef} popupState={popupOpen} center>
          <CheckoutPopup />
        </Popup>
      </Layout>
    );
  }
}
