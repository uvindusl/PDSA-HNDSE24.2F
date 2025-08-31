import "../styles/PantryManager.css";
import GroceryItemCard from "./GroceryItemCard";

function GroceryList() {
  return (
    <div>
      <form action="" className="add-item-form">
        <div className="form-content">
          <div>
            <label htmlFor="name">Item Name</label> <br />
            <label htmlFor="qnt">Quantity</label> <br />
          </div>
          <div>
            <input id="name" type="text" /> <br />
            <input id="qnt" type="number" /> <br />
          </div>
        </div>

        <div>
          <button>Add Item to Grocery List</button>
        </div>
      </form>
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
