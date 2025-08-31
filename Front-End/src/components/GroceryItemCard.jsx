import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function GroceryItemCard(props) {
  const { name, quantity } = props;

  return (
    <div className="pantry-item-card">
      <p className="pantry-item-card-name">{name}</p>
      <div className="pantry-item-card-quantity">
        <p>
          <b>Quantity</b>
        </p>
        <p>{quantity}</p>
      </div>
    </div>
  );
}

export default GroceryItemCard;
