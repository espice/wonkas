import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../../components/userContext';
import Layout from '../../components/Layout';
const Profile = () => {
    const {user} = useContext(UserContext)
    const [name, setName] = useState("");

    useEffect(() => {
        setName(user.name);
        console.log(user.email)

    }, [user]);
    return (
        <Layout>
        <div>
            
        </div>
        </Layout>
    )
}

export default Profile;