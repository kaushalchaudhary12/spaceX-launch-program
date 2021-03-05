import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Filter from "../components/filters/Filter";
import LaunchProgram from "../components/launchProgram/LaunchProgram";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    if (asPath.length === 1) router.push({ query: { limit: 100 } });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Layout title={"SpaceX Launch Programs"}>
        <div className={styles.container}>
          <div className={styles.filter}>
            <Filter {...props}></Filter>
          </div>
          <div className={styles.launchProgram}>
            <LaunchProgram {...props}></LaunchProgram>
          </div>
        </div>
      </Layout>
    </div>
  );
};

Index.getInitialProps = (ctx) => {
  const query = ctx.query;
  return { query };
};

export default Index;
