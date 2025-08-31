import { useEffect, useState } from "react";
import "../styles/PantryManager.css";
import PantryItemCard from "./PantryItemCard";

function PantryManager() {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pantryItemCount, setPantryItemCount] = useState(0);
  const [expirSoonCount, setexpirSoonCount] = useState(0);
  const [expiredCount, setexpiredCount] = useState(0);
  const [expiringDaycount, setexpiringDaycount] = useState(0);

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
      fetchexpiredSoonCount();
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

  // useeffect to call fetchdata and fetchexpiredsooncount functions

  useEffect(() => {
    fetchData();
    fetchexpiredSoonCount();
  }, []);

  const fetchexpiredSoonCount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/expiringitems");
      if (!response.ok) {
        throw new Error("data fetching failed");
      }
      const data = await response.json();

      // Get the count of items
      setexpirSoonCount(data.length);

      const expiringDays = data.map((itemString) => {
        const match = itemString.match(/in (\d+) days/);
        return match ? parseInt(match[1]) : 0;
      });

      // Finding the maximum number of day
      if (expiringDays.length > 0) {
        const maxDays = Math.max(...expiringDays);
        setexpiringDaycount(maxDays);
      } else {
        setexpiringDaycount(0);
      }
    } catch (error) {
      setError("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const getexpirSoonCount = () => {
    if (expirSoonCount > 0 || expiredCount > 0) {
      return { display: "flex" };
    }
    return {};
  };

  const handleRemoveExpiredItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/removeexpireditems", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      fetchData();
    } catch (error) {
      setError(`error deleteing ${error}`);
    }
  };

  return (
    <div>
      <div className="expired-box" style={getexpirSoonCount()}>
        <p>
          {expirSoonCount} item(s) expiring within {expiringDaycount} days{" "}
          <br />
          {expiredCount} item(s) expired
          <button onClick={handleRemoveExpiredItems}>
            Remove expired item(s)
          </button>
        </p>
      </div>

      {/* ----------------------------------------------------------------------------- */}

      <form onSubmit={handleAddPantryItem} className="add-item-form">
        <h4>Add Item to Pantry</h4>
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
            <div className="form-inercontent2">
              <div>
                <label htmlFor="qnt">Quantity</label> <br />
                <input
                  id="qnt"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <br />
              </div>
              <div>
                <label htmlFor="date">Expiry Date</label> <br />
                <input
                  id="date"
                  type="Date"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                />
                <br />
              </div>
            </div>
            <button className="add-pantry-btn" type="submit">
              Add Item to Pantry
            </button>
          </div>
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
            formattedDate={item.formattedDate}
          />
        ))}
      </div>
    </div>
  );
}
export default PantryManager;
