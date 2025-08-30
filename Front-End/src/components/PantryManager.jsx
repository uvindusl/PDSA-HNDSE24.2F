import "../styles/PantryManager.css";
import PantryItemCard from "./PantryItemCard";

function PantryManager() {
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
        <PantryItemCard />
        <PantryItemCard />
        <PantryItemCard />
      </div>
    </div>
  );
}
export default PantryManager;
