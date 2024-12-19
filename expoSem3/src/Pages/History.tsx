import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";
import HistoryCard from "../Components/HistoryCard";

function History() {
  const { user } = useAuth();
  const userId = user?.userId;
  const [histories, setHistories] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5205/api/cart/order_history/${userId}`
        );
        setHistories(response.data);
      } catch (err: any) {
        console.error("Failed to fetch histories", err);
      }
    };
    fetchHistories();
  }, [userId]);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-4">History</h1>
        {histories.length === 0 ? (
          <p>No history found.</p>
        ) : (
          histories.map((history, index) => (
            <HistoryCard
              key={history.id}
              orderNumber={index + 1}
              history={history}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default History;
