import Layout from "../../../components/Layout";
import axios from "../../../config/axios";
import PayCheckPopup from "../../../components/PaycheckPayPopup";

import UserContext from "../../../components/userContext";
import { useState, useEffect, useContext } from "react";
const Paychecks = () => {
  const [paychecks, setPaychecks] = useState([]);
  const [editPayCheck, setEditPayCheck] = useState({});
  const [total, setTotal] = useState(0);
  const [buttonUser, setButtonUser] = useState({});
  const [popupPay, setPopupPay] = useState(false);
  const [old, setOld] = useState({});
  
  const {loading: userLoading} = useContext(UserContext)

  useEffect(() => {
      if(!userLoading){
        axios.get("/api/paycheck/all").then((value) => {
            console.log(value.data.allPaychecks);
            setPaychecks(value.data.allPaychecks);
          });
          axios.get("/api/total").then((value) => {
            console.log(value.data);
            setTotal(value.data.total.amount);
          });
      }
  }, [userLoading]);

  useEffect(() => {
    let amountArr = {};
    let amount = 0;
    paychecks.forEach((value) => {
      console.log(value);
      amountArr[amount] = value.salary;
      amount += 1;
    });
    console.log("hi");
    setEditPayCheck(amountArr);
  }, [paychecks]);

  function handlePayCheckAdd(e, amount, id) {
    e.preventDefault();
    console.log(amount);
  }
  console.log(editPayCheck);
  return (
    <Layout>
      <div>
        <h1>Paychecks</h1>
        <h2>Total Amount Left: {total} cocoa beans</h2>
        {popupPay ? <PayCheckPopup userId={buttonUser} oldVals={old} /> : null}
        {paychecks.map((value, i) => {
          return (
            <div>
              <h1> Name: {value.user.name}</h1>
              <h3>Salary: {value.salary}</h3>
              {new Date(value.nextPaycheck).getTime() <=
              new Date().getTime() ? (
                <h4>payment due</h4>
              ) : (
                <h4>payment not due</h4>
              )}
              {console.log(
                new Date(value.nextPaycheck).getTime() > new Date().getTime()
              )}
              <button
                onClick={(e) => {
                  setPopupPay(!popupPay),
                    setButtonUser(value.user),
                    setOld(value.paycheckHistory);
                }}
              >
                pay this gareeban aadmi pls bro pls
              </button>
              <button>
                iski history dekho search waali nahi warna momy scold
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default Paychecks;
