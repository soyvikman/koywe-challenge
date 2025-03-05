import { useEffect, useState } from "react";
import { fetchQuotes } from "@/services/quoteService";
import { Quote } from "@/types/Quote";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      const loadQuotes = async () => {
        try {
          const data = await fetchQuotes(token);
          setQuotes(data);
        } catch (error) {
          console.error("Failed to fetch quotes:", error);
        }
      };

      loadQuotes();
    }
  }, [token]);

  return (
    <div>
      <h1>Quotes</h1>
      <ul>
        {quotes.map((quote) => (
          <li key={quote._id}>
            {quote.from} to {quote.to} - {quote.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
