import { Layout, Spin } from "antd";

import styles from "./styles.module.css";

export const Fallback = () => (<Layout className={styles.layout}><Spin/></Layout>)