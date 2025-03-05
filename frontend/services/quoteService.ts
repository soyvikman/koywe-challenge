const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchQuotes = async (token: string) => {
  const response = await fetch(`${API_URL}/quote`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quotes");
  }

  return response.json();
};

export const fetchQuoteById = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/quote/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return response.json();
};

export const createQuote = async (
  quoteData: { from: string; to: string; amount: number },
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quoteData),
  });

  if (!response.ok) {
    throw new Error("Failed to create quote");
  }

  return await response.json();
};
