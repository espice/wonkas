import SideNav from "../../../components/SideNav";
import Layout from "../../../components/Layout";
import styles from "../../../styles/pages/manager/profile.module.scss";
import { useContext } from "react";
import UserContext from "../../../components/userContext";
export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <SideNav />

      <div className={styles.container}>
        <h1 className={styles.container__heading}>My Profile</h1>

        <div className={styles.container__content}>
          <img
            src={user.photoUrl}
            alt={user.name}
            className={styles.container__content__image}
          />
        </div>
      </div>
    </Layout>
  );
}
