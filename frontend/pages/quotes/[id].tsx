"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchQuoteById } from "@/services/quoteService";
import { Quote } from "@/types/Quote";
import styles from "./../styles/QuoteDetail.module.css";

const QuoteDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      router.push("/login");
      return;
    }

    const loadQuote = async () => {
      try {
        if (typeof id === "string") {
          const data = await fetchQuoteById(id, storedToken);
          setQuote(data);
        } else {
          setError("ID de cotización inválido.");
        }
      } catch (err) {
        setError(
          "No se pudo cargar la cotización. Puede haber expirado o no existir."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadQuote();
    }
  }, [id]);

  const isQuoteValid = (expiresAt: string) => {
    return new Date(expiresAt) > new Date();
  };

  if (loading) return <p className={styles.message}>Cargando detalle...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!quote)
    return <p className={styles.error}>No se encontró la cotización.</p>;

  const expired = !isQuoteValid(quote.expiresAt);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalle de Cotización</h1>
      <div className={`${styles.card} ${expired ? styles.expired : ""}`}>
        <p>
          <strong>De:</strong> {quote.from}
        </p>
        <p>
          <strong>A:</strong> {quote.to}
        </p>
        <p>
          <strong>Monto:</strong> {quote.amount}
        </p>
        <p>
          <strong>Tasa:</strong> {quote.rate}
        </p>
        <p>
          <strong>Monto convertido:</strong> {quote.convertedAmount}
        </p>
        <p>
          <strong>Expira:</strong> {new Date(quote.expiresAt).toLocaleString()}
        </p>
        {expired && (
          <p className={styles.expiredMessage}>Esta cotización ha expirado.</p>
        )}
        <button
          className={styles.backButton}
          onClick={() => router.push("/quotes")}
        >
          Volver a Cotizaciones
        </button>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
