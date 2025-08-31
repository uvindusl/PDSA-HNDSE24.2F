import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function GroceryItemCard() {
  return (
    <div className="pantry-item-card">
      <p>Item Name</p>
      <p>Milk</p>
      <p>Quantity</p>
      <p>7</p>
    </div>
  );
}

export default GroceryItemCard;
