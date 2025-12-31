import React, { useEffect, useState } from 'react';
import { restClient } from '@massive.com/client-js';

const rest = restClient("YOUR_API_KEY");

const StockPrice: React.FC<{ ticker: string }> = ({ ticker }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLastTrade = async () => {
      setLoading(true);
      try {
        // Fetch the last trade for the ticker
        const data = await rest.getLastStocksTrade(ticker);
        if (data.results?.p) {
          setPrice(data.results.p);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchLastTrade();
  }, [ticker]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h3>{ticker} Last Price:</h3>
      <p>{price ? `$${price.toFixed(2)}` : "No data available"}</p>
    </div>
  );
};

export default StockPrice;