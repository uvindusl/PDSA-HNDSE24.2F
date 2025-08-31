import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function GroceryItemCard() {
  return (
    <div className="pantry-item-card">
      <p className="pantry-item-card-name">Apple</p>
      <div className="pantry-item-card-quantity">
        <p>
          <b>Quantity</b>
        </p>
        <p>3</p>
      </div>
      <div className="pantry-item-card-formattedDate">
        <p>
          <b>Expire Date</b>
        </p>
        <p>2090-234</p>
      </div>
    </div>
  );
}

export default GroceryItemCard;
