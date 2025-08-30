import StatesCard from "./StatesCard";
import "../styles/StatesBar.css";

function StatesBar() {
  return (
    <div className="StatesBar-container">
      <StatesCard />
      <StatesCard />
      <StatesCard />
      <StatesCard />
    </div>
  );
}
export default StatesBar;
