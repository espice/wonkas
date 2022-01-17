import { useState, useEffect } from "react"
import axios from "../../config/axios"

const PayCheckPopup = (userId, oldVals) => {
    console.log(userId)
    console.log(oldVals)
    const [payment, setPayment] = useState(150)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        axios.get("/api/total/").then((value) => {
            console.log(value.data.total.amount)
            setTotal(value.data.total.amount)
        })
    }, [])
    userId.oldVals.forEach(key => {
        if (new Date(oldVals["date"]).getTime() <= new Date().getTime()) {
            setPayment(payment + oldVals["amount"])
        }
    })
    function submitHandler () {
        axios.post("/api/total/update", {
            amount: total - payment
        }).then((value) => {
            console.log(value)
        })
    }
    return (
    <div>
        <h1>Pay {userId.userId.name}</h1>

        <form onSubmit={submitHandler()}>
            <input type="number" value={payment} onChange={(e) => {
                if (e.target.value >= payment) 
                {setPayment(e.target.value)}
                else {
                    alert("You can't pay less than the amount you owe")
                }
                }}></input>
        </form>  

    </div>
    )
}

export default PayCheckPopup;