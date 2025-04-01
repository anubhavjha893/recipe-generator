import RecipeDisplay from "../components/RecipeDisplay";
import { useState } from "react";
import { RecipeForm } from "../components/RecipeForm";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#278783] p-6">
      <h1 className="text-3xl font-bold text-[#FFEBD0] mb-6">Recipe Generator</h1>
      <RecipeForm setRecipe={setRecipe} />
      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
}
