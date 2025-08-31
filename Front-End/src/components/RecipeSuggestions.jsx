import RecipeCard from "./RecipeCard";
import { useState } from "react";

function RecipeSuggestions() {
  const [expirSoonCount, setexpirSoonCount] = useState(1);
  const [expiringDaycount, setexpiringDaycount] = useState(0);

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
