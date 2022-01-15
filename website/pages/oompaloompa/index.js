import Layout from "../../components/Layout";
import SideNav from "../../components/SideNav";

import styles from "../../styles/pages/oompaloompa/home.module.scss";

const OompaLoompa = () => {
  return (
    <Layout>
      <SideNav></SideNav>
      <div className={styles.main}></div>
    </Layout>
  );
};

export default OompaLoompa;
