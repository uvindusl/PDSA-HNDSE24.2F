import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";
import MinusBtn from "./MinusBtn";
import DeleteBtn from "./DeleteBtn";

function GroceryItemCard(props) {
  const { name, quantity, isFirstItem, handelDelete } = props;

  return (
    <div className="pantry-item-card">
      <p className="pantry-item-card-name">{name}</p>
      <div className="pantry-item-card-quantity">
        <p>
          <b>Quantity</b>
        </p>
        <p>{quantity}</p>
      </div>
      {isFirstItem && (
        <div className="pantry-item-card-Deletbtn">
          <DeleteBtn onClick={handelDelete} />
        </div>
      )}
    </div>
  );
}

export default GroceryItemCard;
