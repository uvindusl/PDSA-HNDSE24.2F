import { div } from "motion/react-client";
import "../styles/PantryItemCard.css";
import DeleteBtn from "./DeleteBtn";
import MinusBtn from "./MinusBtn";

function PantryItemCard(props) {
  const { name, quantity, formattedDate } = props;
  console.log(formattedDate);
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
      <div ClassName="pantry-item-card-minesbtn">
        <MinusBtn />
      </div>
      <div ClassName="pantry-item-card-Deletbtn">
        <DeleteBtn />
      </div>
    </div>
  );
}

export default PantryItemCard;
