import React, { useState } from "react";
import PantryManager from "./PantryManager";
import RecipeSuggestions from "./RecipeSuggestions";
import GroceryList from "./GroceryList";

const TabView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["PantryManager", "RecipeSuggestions", "GroceryList"];
  const content = [<PantryManager />, <RecipeSuggestions />, <GroceryList />];

  return (
    <div>
      <div style={{ display: "flex", cursor: "pointer" }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 20px",
              borderBottom: activeTab === index ? "2px solid blue" : "none",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        {content[activeTab]}
      </div>
    </div>
  );
};

export default TabView;
