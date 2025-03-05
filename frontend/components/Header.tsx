import { useEffect, useState } from "react";
import styles from "./../pages/styles/Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <h1>Quotes App</h1>
      <nav className={styles.nav}>
        {isLoggedIn && (
          <button
            className={styles.link}
            onClick={() => router.push("/quotes/create")}
          >
            Crear cotizacion
          </button>
        )}
        {isLoggedIn && (
          <button
            className={styles.link}
            onClick={() => router.push("/quotes")}
          >
            Cotizaciones
          </button>
        )}
        {isLoggedIn ? (
          <button className={styles.link} onClick={handleLogout}>
            Salir
          </button>
        ) : (
          <>
            <button
              className={styles.link}
              onClick={() => router.push("/login")}
            >
              Ingresar
            </button>
            <button
              className={styles.link}
              onClick={() => router.push("/register")}
            >
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
