import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

function RecipeSuggestions() {
  const [expirSoonCount, setExpirSoonCount] = useState(1);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddGroceryItem = async (itemName) => {
    try {
      const jsonData = {
        name: itemName,
        qty: 1,
      };

      const response = await fetch("http://127.0.0.1:8080/addgrocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to grocery list");
      }
      alert(`${itemName} added to grocery list successfully.`);
    } catch (error) {
      console.error("Error adding item to grocery list:", error.message);
    }
  };

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

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

      {!loading && recipes.length === 0 && (
        <p>No recipes found with expiring items.</p>
      )}
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          onAddMissing={handleAddGroceryItem}
        />
      ))}
    </div>
  );
}
export default RecipeSuggestions;
