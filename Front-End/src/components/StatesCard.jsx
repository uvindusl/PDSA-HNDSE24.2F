import "../styles/StatesCard.css";
import { Box } from "lucide-react";

function StatesCard(props) {
  const { name, count } = props;
  return (
    <div className="card">
      <Box />
      <p>{props.name}</p>
      <p>{props.count}</p>
    </div>
  );
}

export default StatesCard;
