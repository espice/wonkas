import SideNav from "../../../components/SideNav";
import Layout from "../../../components/Layout";
import styles from "../../../styles/pages/manager/profile.module.scss";
import { useContext } from "react";
import UserContext from "../../../components/userContext";
import { signOut } from "next-auth/client";
import axios from "../../../config/axios";
export default function Profile() {
  const { user } = useContext(UserContext);

  const logout = async () => {
    const response = await axios.post("/auth/logout");
    if (response.status === 200) {
      signOut();
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <Layout title="Profile">
      <SideNav />

      <div className={styles.container}>
        <h1 className={styles.container__heading}>My Profile</h1>

        <div className={styles.container__content}>
          <img
            src={user.photoUrl}
            alt={user.name}
            className={styles.container__content__image}
          />

          <div className={styles.container__content__info}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className={styles.container__extra}>
          <div className={styles.container__extra__item}>
            <h3>Role</h3>
            <h2>Manager</h2>
          </div>

          <div className={styles.container__extra__item}>
            <h3>Location</h3>
            <h2>{user.location}</h2>
          </div>
        </div>

        <div className={styles.container__logout}>
          <button className={styles.container__logout__button} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}
