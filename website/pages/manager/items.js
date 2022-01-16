import Layout from "../../components/Layout";
import Sidebar from "../../components/SideNav";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "../../config/axios";
import { FAB } from "../../components/Button";
import PlusIcon from "../../public/icons/plus.svg";
import { Popup, useOnClickOutside } from "../../components/Popup";

import styles from "../../styles/pages/manager/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import UserContext from "../../components/userContext";

const Manager = () => {
  const { user } = useContext(UserContext);
  const [productList, setProductList] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef();
  useOnClickOutside(popupRef, () => setPopupOpen(false));

  useEffect(async () => {
    const productsData = await axios.get("/products");
    const products = productsData.data.products;
    setProductList(products);
  }, []);

  const AddItemPopup = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");
    const [addLoading, setAddLoading] = useState(false);

    return (
      <div className={styles["popup"]}>
        <button
          className={styles["close-button"]}
          onClick={() => setPopupOpen(false)}>
          <PlusIcon className={styles["close-button__icon"]} />
        </button>

        <h1 className={styles.main__heading} style={{ marginTop: "20px" }}>
          <span>Add Item</span>
        </h1>

        <form
          className={styles["popup__form"]}
          onSubmit={async (e) => {
            e.preventDefault();
            setAddLoading(true);

            const res = await axios.post("/products", {
              name: name,
              description: description,
              price: price,
              picture: img,
            });

            setAddLoading(false);
            setPopupOpen(false);
            window.location.reload();
          }}>
          <input
            className={styles["popup__input"]}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <input
            className={styles["popup__input"]}
            placeholder="Description"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className={styles["popup__input"]}
            placeholder="Price (in $)"
            type="number"
            required={true}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* <button
            className={styles["popup__input"]}
            style={{
              color: "gray",
              backgroundColor: "white",
              textAlign: "left",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            id="newItemImgInputTrigger"
            onClick={() => {
              document.getElementById("newItemImgInput").click();
            }}>
            Upload Image
            <img
              style={{ height: 60 + "%", filter: "contrast(0%)" }}
              src="https://cdn-icons-png.flaticon.com/512/1092/1092220.png"
            />
          </button>
          <input
            placeholder="Upload Image"
            type="file"
            required={true}
            id="newItemImgInput"
            style={{ opacity: 0, position: "absolute", zIndex: -1 }}
          /> */}
          <input
            className={styles["popup__input"]}
            placeholder="Image URL"
            required={true}
            required={true}
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <div className={styles["popup__form__submit-group"]}>
            <button
              className="button-primary"
              type="submit"
              style={{ width: "120px" }}>
              {addLoading ? "Adding.." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <Sidebar />
      <FAB onClick={() => setPopupOpen(true)}>
        <PlusIcon />
      </FAB>
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
      <Popup ref={popupRef} popupState={popupOpen}>
        <AddItemPopup />
      </Popup>
    </Layout>
  );
};

export default Manager;
