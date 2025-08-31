import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

function RecipeSuggestions() {
  const [expirSoonCount, setExpirSoonCount] = useState(1);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchexpiredSoonCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/expiringitems");
        if (!response.ok) {
          throw new Error("data fetching failed");
        }
        const data = await response.json();

        // Get the count of items
        setExpirSoonCount(data.length);
      } catch (error) {
        setError("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchexpiredSoonCount();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const getexpirSoonCount = () => {
    if (expirSoonCount > 0) {
      return { display: "flex" };
    }
    return {};
  };
  return (
    <div>
      <div className="expire-status" style={getexpirSoonCount()}>
        <p>{expirSoonCount} item(s) expiring soon...</p>
        <p>items:</p>
      </div>
      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      {/* Map through the recipes state and render a RecipeCard for each one */}
      {!loading && recipes.length === 0 && (
        <p>No recipes found with expiring items.</p>
      )}
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe} // Pass the entire recipe object as a prop
        />
      ))}
    </div>
  );
}
export default RecipeSuggestions;
