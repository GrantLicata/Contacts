import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.centerBody}>
      <div className={styles.loaderCircle}></div>
    </div>
  );
}
