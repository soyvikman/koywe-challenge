"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { createQuote } from "@/services/quoteService";
import styles from "./../styles/CreateQuote.module.css";

const CreateQuotePage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateQuote = async () => {
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Debes iniciar sesión para crear una cotización.");
      return;
    }

    try {
      await createQuote({ from, to, amount: Number(amount) }, token);
      alert("Cotización creada exitosamente");
      router.push("/quotes");
    } catch (err) {
      setError("Error al crear la cotización");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Crear Cotización</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Moneda origen (ej. ARS)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Moneda destino (ej. ETH)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleCreateQuote} className={styles.button}>
          Crear Cotización
        </button>
      </div>
    </div>
  );
};

export default CreateQuotePage;
