import React, { useEffect } from 'react'
import socket from "socket.io-client";
import Layout from '../../../components/Layout';
import  UserContext  from '../../../components/userContext';
import { useContext, useState} from 'react';

const Chat = () => {
    
    const {user} = useContext(UserContext)
    const [location, setLocation] = useState("")
    const [message, setMessage] = useState("")
    useEffect(()=>{
        setLocation(user.location)
        console.log(user.id)
    },[user])
    const io = socket("http://localhost:4000/chat");
    //const location = user.location;
    const formSubmitHoGaya = (e) => {
        e.preventDefault()
        io.emit("message", {message:"message", location:location})
        console.log(message, location)
    }
    return (
        <Layout>
            <form onSubmit={(e) => formSubmitHoGaya(e)}>
                <input type="text" placeholder="Enter your message"  value={message} onChange={(e) => setMessage(e.target.value)}/>
            </form>
        </Layout>
    )
}
export default Chat