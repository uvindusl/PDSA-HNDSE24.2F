import { div } from "motion/react-client";
import "../styles/PantryManager.css";
import GroceryItemCard from "./GroceryItemCard";
import { useState } from "react";

function GroceryList() {
  const [itemCount, setitemCount] = useState(1);

  const getitemCount = () => {
    if (itemCount > 0) {
      return { display: "flex" };
    }
    return {};
  };
  return (
    <div>
      <form className="add-item-form">
        <h4>Add Item to Grocery List</h4>
        <div className="form-content">
          <div className="form-inercontent">
            <label htmlFor="name">Item Name</label> <br />
            <input id="name" type="text" /> <br />
            <br />
            <label htmlFor="qnt">Quantity</label> <br />
            <input id="qnt" type="number" /> <br />
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
        <GroceryItemCard />
        <GroceryItemCard />
        <GroceryItemCard />
      </div>
    </div>
  );
}
export default GroceryList;
