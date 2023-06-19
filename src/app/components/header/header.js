import Link from "next/link";
import styles from "./header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Secret Todo List</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/login">Login</Link>
          </li>
          <li className={styles.item}>
            <Link href="/signup">Signup</Link>
          </li>
          <li className={styles.item}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className={styles.item}>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
