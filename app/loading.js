import styles from "./page.module.css";

export default function Loading() {
  return (
    <div class={styles.centerBody}>
      <div class={styles.loaderCircle}></div>
    </div>
  );
}
