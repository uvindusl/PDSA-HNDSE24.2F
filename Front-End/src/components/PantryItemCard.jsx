import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function PantryItemCard() {
  return (
    <div className="pantry-item-card">
      <p>Item Name</p>
      <p>Milk</p>
      <p>Quantity</p>
      <p>7</p>
      <p>days left</p>
      <p>5</p>
    </div>
  );
}

export default PantryItemCard;
