import { useEffect, useState } from "react";
import "../styles/PantryManager.css";
import PantryItemCard from "./PantryItemCard";

function PantryManager() {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/pantrylists");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        const parsedData = data.map((itemString) => {
          const parts = itemString.split(",");
          const name = parts[0].split(":")[1].trim();
          const quantity = parseInt(parts[1].split(":")[1].trim());
          const expDateString = parts[2].split("Exp-Date:")[1].trim();
          console.log(expDateString);

          return {
            name,
            quantity,
            expDateString,
          };
        });
        setItemDetails(parsedData);
      } catch (error) {
        setError("error fetchind data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form action="" className="add-item-form">
        <div className="form-content">
          <div>
            <label htmlFor="name">Item Name</label> <br />
            <label htmlFor="qnt">Quantity</label> <br />
            <label htmlFor="date">Expiry Date</label> <br />
          </div>
          <div>
            <input id="name" type="text" /> <br />
            <input id="qnt" type="number" /> <br />
            <input id="date" type="Date" /> <br />
          </div>
        </div>

        <div>
          <button>Add Item</button>
        </div>
      </form>
      <div className="pantry-list">
        <h4>Pantry List</h4>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && itemDetails.length === 0 && <p>No items in the pantry.</p>}
        {itemDetails.map((item, index) => (
          <PantryItemCard
            key={index}
            name={item.name}
            quantity={item.quantity}
            daysLeft={item.expDateString}
          />
        ))}
      </div>
    </div>
  );
}
export default PantryManager;
