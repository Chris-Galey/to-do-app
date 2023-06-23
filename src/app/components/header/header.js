import Link from "next/link";
import { useContext } from "react";
import styles from "./header.module.css";
import { AuthContext } from "@/app/context/AuthContext";
export default function Header() {
  const auth = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <h1>Secret Todo List</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {!auth.loggedIn && (
            <li className={styles.item}>
              <Link href="/login">Login</Link>
            </li>
          )}
          <li className={styles.item}>
            <Link href="/signup">Signup</Link>
          </li>
          <li className={styles.item} onClick={() => logout()}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
}
