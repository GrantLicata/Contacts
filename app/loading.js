import styles from "./page.module.css";

export default function Loading() {
  return (
    <div class={styles.center}>
      <div class={styles.loader}></div>
    </div>
  );
}
