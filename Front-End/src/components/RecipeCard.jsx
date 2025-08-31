import { div } from "motion/react-client";
import "../styles/RecipeCard.css";

function RecipeCard() {
  return (
    <div className="recipe-card">
      <div className="recipe-card-content">
        <label htmlFor="">Scramble Eggs</label>
        <div className="recipe-card-content-ingredients">
          <p>uses 2 expiring ingredients</p> <label htmlFor="">eggs</label>
          <label htmlFor="">milk</label>
        </div>
        <div className="recipe-card-content-ingredients">
          <p>Missing 3 ingredients</p>
          <label htmlFor="">butter cheese herbs</label>
        </div>
      </div>
      <div>
        <button>add missing</button> <br />
        <label htmlFor=""> to groccery list</label>
      </div>
    </div>
  );
}

export default RecipeCard;
