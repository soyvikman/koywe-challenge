import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "../services/authService";
import styles from "./styles/Login.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await register(username, password);
      console.log(data);
      localStorage.setItem("token", data.access_token);
      router.push("/quotes").then(() => {
        window.location.reload();
      });
    } catch (error) {
      alert("Usuario invalido, revisar usuario y contraseña");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Registro</h2>
        <input
          placeholder="Usuario"
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>
          Registrar
        </button>
      </div>
    </div>
  );
}
