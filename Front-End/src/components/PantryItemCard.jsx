import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";

function PantryItemCard(props) {
  const { name, quantity, formattedDate } = props;
  console.log(formattedDate);
  return (
    <div className="pantry-item-card">
      <p>Item Name</p>
      <p>{name}</p>
      <p>Quantity</p>
      <p>{quantity}</p>
      <p>Expire Date</p>
      <p>{formattedDate}</p>
    </div>
  );
}

export default PantryItemCard;
