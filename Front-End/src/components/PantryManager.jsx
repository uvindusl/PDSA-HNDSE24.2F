import { useEffect, useState } from "react";
import "../styles/PantryManager.css";
import PantryItemCard from "./PantryItemCard";

function PantryManager() {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pantryItemCount, setPantryItemCount] = useState(0);
  const [expirSoonCount, setexpirSoonCount] = useState(0);
  const [expiredCount, setexpiredCount] = useState(1);
  const [expiringDaycount, setexpiringDaycount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/pantrylists");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        //geting count
        setPantryItemCount(data.length);

        const parsedData = data.map((itemString) => {
          const parts = itemString.split(",");
          const name = parts[0].split(":")[1].trim();
          const quantity = parseInt(parts[1].split(":")[1].trim());
          const expDateString = parts[2].split("Exp-Date:")[1].trim();

          // remove IST in date
          const cleanDateString = expDateString.replace("IST", "").trim();
          const dateObject = new Date(cleanDateString);
          const formattedDate = dateObject.toDateString();

          console.log(formattedDate);

          return {
            name,
            quantity,
            formattedDate,
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

  const getexpirSoonCount = () => {
    if (expirSoonCount > 0 || expiredCount > 0) {
      return { display: "flex" };
    }
    return {};
  };

  return (
    <div>
      <div className="expired-box" style={getexpirSoonCount()}>
        <p>
          {expirSoonCount} item(s) expiring within {expiringDaycount} days{" "}
          <br />
          {expiredCount} item(s) expired
          <button>Remove expired item(s)</button>
        </p>
      </div>

      {/* ----------------------------------------------------------------------------- */}

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
          <button>Add Item to Pantry</button>
        </div>
      </form>
      {/* ----------------------------------------------------------------------------- */}

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
            daysLeft={item.formattedDate}
          />
        ))}
      </div>
    </div>
  );
}
export default PantryManager;
