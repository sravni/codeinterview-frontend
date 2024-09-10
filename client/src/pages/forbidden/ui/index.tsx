import { Layout, Result } from "antd";
import { Helmet } from "react-helmet";

import styles from './styles.module.css';

export default function Forbidden() {
  return (
    <>
      <Helmet>
        <title>Доступ запрещен</title>
      </Helmet>
      <Layout className={styles.layout}>
        <Result status={403} title={403} subTitle='Доступ запрещен' ></Result>
      </Layout>
    </>
  );
}