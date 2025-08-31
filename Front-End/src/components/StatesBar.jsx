import StatesCard from "./StatesCard";
import "../styles/StatesBar.css";

function StatesBar() {
  return (
    <div className="StatesBar-container">
      <StatesCard name={"Pantry Items"} count={10} />
      <StatesCard name={"Expired"} count={0} />
      <StatesCard name={"Expiring Soon"} count={0} />
      <StatesCard name={"Grocery Items"} count={0} />
    </div>
  );
}
export default StatesBar;
