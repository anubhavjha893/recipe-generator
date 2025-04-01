import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function RecipeDisplay() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetched Recipe Data:", recipe);
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#278783] text-[#FFEBD0] text-2xl font-semibold">
        No recipe found.
      </div>
    );
  }

  const handleSaveRecipe = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
console.log("Token:", token); 

    if (!token) {
      setMessage("You must be logged in to save recipes.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://mentor-project.onrender.com/api/recipes/save",
        { recipe },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#278783] p-6 pt-24">
      {/* Add padding to top for navbar space */}
      <div className="max-w-3xl w-full bg-[#FFEBD0] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-[#278783]">
          <h2 className="text-3xl font-bold text-center mb-4">
            {recipe.title || "Delicious Recipe"}
          </h2>

          <div className="flex justify-center gap-6 text-[#FFEBD0] text-lg mb-4">
            <p>
              <strong>⏳ Cooking Time:</strong> {recipe.cooking_time || "N/A"}
            </p>
            <p>
              <strong>🍽️ Servings:</strong> {recipe.serving_size || "N/A"}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#FFEBD0] mb-2">
            🥦 Ingredients:
          </h3>
          <ul className="list-disc list-inside text-[#278783] mb-4 space-y-1">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}{" "}
                {ingredient.preparation ? `(${ingredient.preparation})` : ""}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-[#FFEBD0] mb-2">
            👨‍🍳 Instructions:
          </h3>
          <ol className="list-decimal list-inside text-[#278783] space-y-2">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index}>
                <strong>Step {instruction.step}:</strong> {instruction.description}
              </li>
            ))}
          </ol>
          <button
            onClick={handleSaveRecipe}
            className="mt-6 w-full bg-[#278783] text-white py-3 px-4 rounded-lg hover:bg-[#1f6a65] transition transform hover:scale-105 flex justify-center items-center"
          >
            {loading ? (
              <span className="blinking-text">Generating...</span> // Blink effect
            ) : (
              "Save Recipe"
            )}
          </button>
          {message && (
            <p
              className={`mt-3 text-center text-lg ${
                message.includes("Failed")
                  ? "text-red-500"
                  : message.includes("saved")
                  ? "text-green-500"
                  : "text-blue-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
