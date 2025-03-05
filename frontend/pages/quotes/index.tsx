"use client";

import { useEffect, useState } from "react";
import { fetchQuotes } from "@/services/quoteService";
import { Quote } from "@/types/Quote";
import { useRouter } from "next/router";
import styles from "./../styles/Quotes.module.css";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      const loadQuotes = async () => {
        try {
          const data = await fetchQuotes(storedToken);

          const sortedQuotes = data.sort(
            (a: Quote, b: Quote) =>
              new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime()
          );
          setQuotes(sortedQuotes);
        } catch (err) {
          setError("Falla al cargar cotizaciones");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadQuotes();
    } else {
      setError("Logeate por favor");
      setLoading(false);
    }
  }, []);

  const isQuoteValid = (expiresAt: string) => {
    return new Date(expiresAt) > new Date();
  };

  if (loading) return <p>Cargando cotizaciones...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Cotizaciones</h1>
      <div className={styles.grid}>
        {quotes.map((quote) => (
          <div key={quote._id} className={styles.card}>
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
              <strong>Expira en:</strong>{" "}
              {new Date(quote.expiresAt).toLocaleString()}
            </p>
            {isQuoteValid(quote.expiresAt) ? (
              <button
                className={styles.validButton}
                onClick={() => router.push(`/quotes/${quote._id}`)}
              >
                Ver Detalle
              </button>
            ) : (
              <button className={styles.invalidButton} disabled>
                Inválido
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesPage;
