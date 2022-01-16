import Layout from "../../../components/Layout";
import axios from "../../../config/axios";
import { useContext, useState, useEffect } from "react";

const Cart = () => {
    const [cart, SetCart] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        axios.get("/api/cart/products").then((value) => {
            console.log(value.data)
            SetCart(value.data.cart);
        })
    }, [])
    function handleCartAdd(){
        axios.get("/api/total/").then((value) => {
            let totalOfAll = value.data.total.amount
            console.log(totalOfAll +total)
            axios.post("/api/total/update", {
                amount: totalOfAll + total
            }).then((value) => {
                console.log(value)
                axios.post("/api/cart/update", {
                    cart: []
                })
            })
        })
    }
    let amount = 0
    useEffect(() => {
        cart.forEach((value) => {
            amount += value.product.price * value.quantity
            console.log(amount)
        })
        setTotal(amount)
    }, [cart]) 
    return (
        <Layout title="Cart">
            <h1>User Cart</h1>
            <br></br>
            {cart.map((item) => {
                return (
                    <div>
                        <h1>{item.product.name}</h1>
                        <h2>{item.product.description}</h2>
                        <h3>Price: {item.product.price} dollars. Amount ordered: {item.quantity}</h3>
                    </div>
                )
            })}
            <h1>total price: {total} dollars</h1>
            <button onClick={(e) => {handleCartAdd()}}>Proceed to Checkout</button>
        </Layout>
    )
}

export default Cart;