import StatesCard from "./StatesCard";
import "../styles/StatesBar.css";
import { useEffect, useState } from "react";

function StatesBar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pantryItemCount, setPantryItemCount] = useState(0);
  const [groceryItemCount, setGroceryItemCount] = useState(0);
  const [expirSoonCount, setExpirSoonCount] = useState(0);
  const [expiredItemCount, setExpiredItemCount] = useState(0);

  useEffect(() => {
    const fetchPantryItemCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/pantrylists");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        // Get the count of items
        setPantryItemCount(data.length);
      } catch (error) {
        setError("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchPantryItemCount();
  }, []);

  useEffect(() => {
    const fetchGroceryItemCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/grocerylists");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        // Get the count of items
        setGroceryItemCount(data.length);
      } catch (error) {
        setError("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchGroceryItemCount();
  }, []);

  useEffect(() => {
    const fetchexpiredSoonCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/expiringitems");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        // Get the count of items
        setExpirSoonCount(data.length);
      } catch (error) {
        setError("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchexpiredSoonCount();
  }, []);

  useEffect(() => {
    const fetchexpiredSoonCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/expireditems");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        // Get the count of items
        setExpiredItemCount(data.length);
      } catch (error) {
        setError("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchexpiredSoonCount();
  }, []);

  return (
    <div className="StatesBar-container">
      <StatesCard name={"Pantry Items"} count={pantryItemCount} />
      <StatesCard name={"Expired"} count={expiredItemCount} />
      <StatesCard name={"Expiring Soon"} count={expirSoonCount} />
      <StatesCard name={"Grocery Items"} count={groceryItemCount} />
    </div>
  );
}
export default StatesBar;
