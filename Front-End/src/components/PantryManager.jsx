import { useEffect, useState } from "react";
import "../styles/PantryManager.css";
import PantryItemCard from "./PantryItemCard";

function PantryManager() {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expDate, setExpDate] = useState("");

  const handleAddPantryItem = async (e) => {
    e.preventDefault();

    const itemExpDate = expDate ? new Date(expDate).toISOString() : null;

    const jsonData = {
      itemName: name,
      quantity: parseInt(quantity),
      itemExpDate: expDate,
    };

    try {
      const response = await fetch("http://localhost:8080/insertlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error in adding data: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      setName("");
      setQuantity("");
      setExpDate("");

      fetchData();
    } catch (error) {
      setError(`error in adding data`);
    }
  };

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

  // useeffect to call fetchdata function

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleAddPantryItem} className="add-item-form">
        <div className="form-content">
          <div>
            <label htmlFor="name">Item Name</label> <br />
            <label htmlFor="qnt">Quantity</label> <br />
            <label htmlFor="date">Expiry Date</label> <br />
          </div>
          <div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              id="qnt"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <input
              id="date"
              type="Date"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
            <br />
          </div>
        </div>

        <div>
          <button type="submit">Add Item to Pantry</button>
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
            daysLeft={item.formattedDate}
          />
        ))}
      </div>
    </div>
  );
}
export default PantryManager;
