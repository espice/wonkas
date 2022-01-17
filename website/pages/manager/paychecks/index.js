import Layout from "../../../components/Layout";
import axios from "../../../config/axios";
import { useState, useEffect} from "react";
const Paychecks = () => {
    useEffect(() => {
        axios.get("/api/paycheck/all").then((value) => {
            console.log(value.data)
        })
    }, [])
    const [paychecks, setPaychecks] = useState([]);

    return (
        <Layout>
            <div>
                <h1>Paychecks</h1>
            </div>
        </Layout>
    )
}
export default Paychecks;