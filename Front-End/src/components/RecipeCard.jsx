import React, { useState } from "react";
import "../styles/RecipeCard.css";

function RecipeCard(props) {
  const { recipe, onAddMissing } = props;
  const [clickedIngredients, setClickedIngredients] = useState([]);

  if (!recipe) {
    return null;
  }

  const usedIngredients = recipe.ingredients
    ? recipe.ingredients.split(",").length
    : 0;
  const missingIngredientsCount = recipe.missingIngredients
    ? recipe.missingIngredients.length
    : 0;

  const handleClick = (ingredient) => {
    const trimmed = ingredient.trim();
    if (!clickedIngredients.includes(trimmed)) {
      setClickedIngredients([...clickedIngredients, trimmed]);
      onAddMissing(trimmed);
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-content">
        <label className="recipe-card-name">{recipe.reciepeName}</label>

        <div className="recipe-card-content-ingredients">
          <p>uses {usedIngredients} ingredients</p>
          {recipe.ingredients.split(",").map((ingredient, index) => (
            <label key={index} className="ingredient-label">
              {ingredient.trim()}
            </label>
          ))}
        </div>

        <pre>Click on a missing item to add it to grocery list</pre>

        <div className="recipe-card-content-ingredients">
          <p>Missing {missingIngredientsCount} ingredients</p>
          {recipe.missingIngredients.map((ingredient, index) => {
            const trimmed = ingredient.trim();
            const isClicked = clickedIngredients.includes(trimmed);
            return (
              <button
                key={index}
                className={`ingredient-label ${isClicked ? "clicked" : ""}`}
                onClick={() => handleClick(trimmed)}
              >
                {trimmed}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
