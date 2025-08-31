import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

function RecipeSuggestions() {
  const [expirSoonCount, setexpirSoonCount] = useState(1);
  const [expiringDaycount, setexpiringDaycount] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <p>
          {expirSoonCount} item(s) expiring within {expiringDaycount} days
        </p>
        <p>items:</p>
      </div>
      <RecipeCard />
    </div>
  );
}
export default RecipeSuggestions;
