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
        <label htmlFor="">{recipe.reciepeName}</label>
        <div className="recipe-card-content-ingredients">
          <p>uses {usedIngredients} ingredients</p>
          {recipe.ingredients.split(",").map((ingredient, index) => (
            <label key={index} htmlFor="" className="ingredient-label">
              {ingredient.trim()}
            </label>
          ))}
        </div>
        <div className="recipe-card-content-ingredients">
          <p>Missing {missingIngredientsCount} ingredients</p>
          {recipe.missingIngredients.map((ingredient, index) => (
            <label key={index} htmlFor="" className="ingredient-label">
              {ingredient.trim()}
            </label>
          ))}
        </div>
      </div>
      <div>
        <button>add missing</button> <br />
        <label htmlFor=""> to grocery list</label>
      </div>
    </div>
  );
}

export default RecipeCard;
