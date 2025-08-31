import { div } from "motion/react-client";
import "../styles/RecipeCard.css";

function RecipeCard(props) {
  const { recipe } = props;

  if (!recipe) {
    return null;
  }

  const usedIngredients = recipe.ingredients
    ? recipe.ingredients.split(",").length
    : 0;
  const missingIngredientsCount = recipe.missingIngredients
    ? recipe.missingIngredients.length
    : 0;

  return (
    <div className="recipe-card">
      <div className="recipe-card-content">
        <label className="recipe-card-name" htmlFor="">
          {recipe.reciepeName}
        </label>
        <div className="recipe-card-content-ingredients">
          <p>uses {usedIngredients} ingredients</p>
          {recipe.ingredients.split(",").map((ingredient, index) => (
            <label key={index} htmlFor="" className="ingredient-label">
              {ingredient.trim()}
            </label>
          ))}
        </div>
        <pre> click on a missing item to add it to grocery list</pre>
        <div className="recipe-card-content-ingredients">
          <p>Missing {missingIngredientsCount} ingredients</p>
          {recipe.missingIngredients.map((ingredient, index) => (
            <button key={index} htmlFor="" className="ingredient-label">
              {ingredient.trim()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
