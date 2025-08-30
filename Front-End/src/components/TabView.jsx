import React, { useState } from "react";
import PantryManager from "./PantryManager";
import RecipeSuggestions from "./RecipeSuggestions";
import GroceryList from "./GroceryList";
import { motion } from "framer-motion";
import "../styles/TabView.css";

const TabView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["PantryManager", "RecipeSuggestions", "GroceryList"];
  const content = [<PantryManager />, <RecipeSuggestions />, <GroceryList />];

  return (
    <div className="tab-container">
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
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        style={{ padding: "20px", border: "1px solid #ccc" }}
      >
        {content[activeTab]}
      </motion.div>
    </div>
  );
};

export default TabView;
