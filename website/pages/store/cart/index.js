import Layout from "../../../components/Layout";
import axios from "../../../config/axios";
import { useContext, useState, useEffect } from "react";

const Cart = () => {
    const [messages, SetMessages] = useState([]);
    useEffect(() => {
        axios.get("/api/cart/products").then((value) => {
            console.log(value.data)
        })
    })
    return (
        <Layout title="Cart">
            <h1>User Cart</h1>
        </Layout>
    )
}

export default Cart;