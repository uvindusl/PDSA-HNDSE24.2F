import { div } from "motion/react-client";
import "../styles/PantryManager.css";
import GroceryItemCard from "./GroceryItemCard";
import { useState, useEffect } from "react";

function GroceryList() {
  const [itemCount, setitemCount] = useState(1);

  const [groceryDetails, setGroceryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/grocerylists");
      if (!response.ok) {
        throw new Error("data fetching failed");
      }
      const data = await response.json();
      setitemCount(data.length);

      const parsedData = data.map((itemString) => {
        const parts = itemString.split(",");
        const name = parts[0].split(":")[1].trim();
        const quantity = parseInt(parts[1].split(":")[1].trim());

        return {
          name,
          quantity,
        };
      });
      setGroceryDetails(parsedData);
    } catch (error) {
      setError("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // useeffect to call fetchdata function

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddGroceryItem = async (e) => {
    e.preventDefault();

    const jsonData = {
      name: name,
      qty: parseInt(qty),
    };

    try {
      const response = await fetch("http://localhost:8080/addgrocery", {
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
      setQty(0);
      fetchData();
    } catch (error) {
      setError(`error in adding data`);
    }
  };

  const getitemCount = () => {
    if (itemCount > 0) {
      return { display: "flex" };
    }
    return {};
  };
  return (
    <div>
      <form className="add-item-form" onSubmit={handleAddGroceryItem}>
        <h4>Add Item to Grocery List</h4>
        <div className="form-content">
          <div className="form-inercontent">
            <label htmlFor="name">Item Name</label> <br />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="qnt">Quantity</label> <br />
            <input
              id="qnt"
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <br />
            <br />
            <button className="add-pantry-btn" type="submit">
              Add Item to Grocery List
            </button>
          </div>
        </div>
      </form>
      {/* --------------------------------------------------------------------------- */}
      <div className="expired-box" style={getitemCount()}>
        <p>
          {itemCount} item(s) in the queue
          <br />
          <button>Optimize List</button>
        </p>
      </div>
      {/* -------------------------------------------------------------------------------- */}
      <div className="pantry-list">
        <h4>Grocery List</h4>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && groceryDetails.length === 0 && (
          <p>No items in the Grocery List</p>
        )}
        {groceryDetails.map((item, index) => (
          <GroceryItemCard
            key={index}
            name={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
export default GroceryList;
