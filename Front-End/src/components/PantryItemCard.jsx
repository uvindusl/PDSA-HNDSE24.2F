import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";
import DeleteBtn from "./DeleteBtn";
import MinusBtn from "./MinusBtn";

function PantryItemCard(props) {
  const { name, quantity, formattedDate, onReduceQuantity, onDelete } = props;

  return (
    <div className="pantry-item-card">
      <p className="pantry-item-card-name">{name}</p>
      <div className="pantry-item-card-quantity">
        <p>
          <b>Quantity</b>
        </p>
        <p>{quantity}</p>
      </div>
      <div className="pantry-item-card-formattedDate">
        <p>
          <b>Expire Date</b>
        </p>
        <p>{formattedDate}</p>
      </div>
      <div className="pantry-item-card-minesbtn">
        <MinusBtn onClick={onReduceQuantity} />
      </div>
      <div className="pantry-item-card-Deletbtn">
        <DeleteBtn onClick={onDelete} />
      </div>
    </div>
  );
}

export default PantryItemCard;
