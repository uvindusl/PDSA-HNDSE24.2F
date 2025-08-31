import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function GroceryItemCard(props) {
  const { name, quantity } = props;

  return (
    <div className="pantry-item-card">
      <p>Item Name</p>
      <p>{name}</p>
      <p>Quantity</p>
      <p>{quantity}</p>
    </div>
  );
}

export default GroceryItemCard;
