package com.uhd.PDSA_CW.PDSA_CW.service;

import java.util.List;

public class ReciepeCard {
    private String reciepeName;
    private String difficultyLevel;
    private List<String> missingIngredients;
    private String ingredients;
    private String time;

    public ReciepeCard(String reciepeName, String difficultyLevel, String ingredients, String time, List<String> missingIngredients) {
        this.reciepeName = reciepeName;
        this.difficultyLevel = difficultyLevel;
        this.ingredients = ingredients;
        this.time = time;
        this.missingIngredients = missingIngredients;
    }

    public String getReciepeName() {
        return reciepeName;
    }

    public void setReciepeName(String reciepeName) {
        this.reciepeName = reciepeName;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<String> getMissingIngredients() {
        return missingIngredients;
    }

    public void setMissingIngredients(List<String> missingIngredients) {
        this.missingIngredients = missingIngredients;
    }
}
