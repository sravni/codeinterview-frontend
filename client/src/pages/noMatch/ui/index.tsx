import { Layout, Result } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from './styles.module.css';

export default function NoMatch() {
  return (
    <>
      <Helmet>
        <title>Ничего не найдено</title>
      </Helmet>
      <Layout className={styles.layout}>
        <Result status={404} title={404} subTitle='Страница не найдена' ><Link to="/">На главную</Link></Result>
      </Layout>
    </>
  );
}