import StatesCard from "./StatesCard";
import "../styles/StatesBar.css";
import { useEffect, useState } from "react";

function StatesBar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pantryItemCount, setPantryItemCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <div className="StatesBar-container">
      <StatesCard name={"Pantry Items"} count={pantryItemCount} />
      <StatesCard name={"Expired"} count={0} />
      <StatesCard name={"Expiring Soon"} count={0} />
      <StatesCard name={"Grocery Items"} count={0} />
    </div>
  );
}
export default StatesBar;
