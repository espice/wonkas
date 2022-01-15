import { useContext } from "react";
import UserContext from "../../components/userContext";
import Layout from "../../components/Layout";
export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <Layout title="Profile">
      <div>
        <h2>Profile</h2>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    </Layout>
  );
}
