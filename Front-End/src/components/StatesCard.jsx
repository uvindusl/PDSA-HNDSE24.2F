import { color } from "motion";
import "../styles/StatesCard.css";
import { Box, TriangleAlert, TrendingUp, ShoppingCart } from "lucide-react";

function StatesCard(props) {
  const { name, count } = props;

  const getCountStyle = () => {
    if (name === "Pantry Items") {
      return { color: "#069401ff" };
    } else if (name === "Expired") {
      return { color: "#ed333b" };
    } else if (name === "Expiring Soon") {
      return { color: "#f59f00" };
    } else if (name === "Grocery Items") {
      return { color: "#0056f5ff" };
    }
    return {};
  };

  return (
    <div className="card">
      <div>
        <p>{name}</p>
        <p className="count" style={getCountStyle()}>
          {count}
        </p>
      </div>
      <div className="icon-container">
        {name === "Pantry Items" ? (
          <Box color="#069401ff" />
        ) : name === "Expired" ? (
          <TriangleAlert color="#ed333b" />
        ) : name === "Expiring Soon" ? (
          <TrendingUp color="#f59f00" />
        ) : (
          <ShoppingCart color="#0056f5ff" />
        )}
      </div>
    </div>
  );
}

export default StatesCard;
