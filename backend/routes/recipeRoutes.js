const express = require("express");
const router = express.Router();
const {
    generateRecipe,
    saveRecipe,
    getSavedRecipes,
    deleteRecipe,
    authenticateUser
} = require("../controllers/recipeController");


router.post("/generate", generateRecipe); 
router.post("/save", authenticateUser, saveRecipe); 
router.get("/saved", authenticateUser, getSavedRecipes); 
router.delete("/delete/:recipeId", authenticateUser, deleteRecipe);

module.exports = router;
