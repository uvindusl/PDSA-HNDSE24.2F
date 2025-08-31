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
      fetchexpiredCount();
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
    fetchexpiredCount();
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

  const fetchexpiredCount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/expireditems");
      if (!response.ok) {
        throw new Error("data fetching failed");
      }
      const data = await response.json();

      // Get the count of items
      setexpiredCount(data.length);
    } catch (error) {
      setError("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleReduceQuantity = async (itemName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reducequantity?itemName=${itemName}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reduce quantity");
      }
      fetchData();
    } catch (error) {
      setError(`Error reducing quantity: ${error}`);
    }
  };

  const handleDeletePantryItem = async (itemName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/delspeci/${itemName}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // After a successful deletion, refresh the list
      fetchData();
    } catch (error) {
      setError(`Error deleting item: ${error}`);
    }
  };

  return (
    <div>
      <div className="expired-box" style={getexpirSoonCount()}>
        <p>
          {expirSoonCount} item(s) expiring soon...
          <br />
          {expiredCount} item(s) expired
        </p>
        <div className="btn-cont">
          <div>
            <p>Remove Expired item(s)</p>
          </div>
          <button className="bin-button" onClick={handleRemoveExpiredItems}>
            <svg
              className="bin-top"
              viewBox="0 0 39 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1={5} x2={39} y2={5} stroke="white" strokeWidth={4} />
              <line
                x1={12}
                y1="1.5"
                x2="26.0357"
                y2="1.5"
                stroke="white"
                strokeWidth={3}
              />
            </svg>
            <svg
              className="bin-bottom"
              viewBox="0 0 33 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_8_19" fill="white">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
              </mask>
              <path
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                fill="white"
                mask="url(#path-1-inside-1_8_19)"
              />
              <path d="M12 6L12 29" stroke="white" strokeWidth={4} />
              <path d="M21 6V29" stroke="white" strokeWidth={4} />
            </svg>
          </button>
        </div>
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
            onReduceQuantity={() => handleReduceQuantity(item.name)}
            onDelete={() => handleDeletePantryItem(item.name)}
          />
        ))}
      </div>
    </div>
  );
}
export default PantryManager;
