import "../styles/StatesCard.css";
import { Box, TriangleAlert, TrendingUp, ShoppingCart } from "lucide-react";

function StatesCard(props) {
  const { name, count } = props;
  return (
    <div className="card">
      {name === "Pantry Items" ? (
        <Box />
      ) : name === "Expired" ? (
        <TriangleAlert color="#ed333b" />
      ) : name === "Expiring Soon" ? (
        <TrendingUp color="#ed333b" />
      ) : (
        <ShoppingCart />
      )}
      <p>{name}</p>
      <p>{count}</p>
    </div>
  );
}

export default StatesCard;
