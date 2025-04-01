import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://mentor-project.onrender.com/api/recipes/generate",
        {
          ingredients: ingredients.split(",").map((item) => item.trim()),
          cuisine,
          dietaryPreferences,
        }
      );

      if (response.data) {
        navigate("/recipes", { state: { recipe: response.data } });
      } else {
        setError("No recipe data received.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to generate recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#278783] p-6">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#FFEBD0] hover:underline flex items-center gap-2"
        >
          ← Back
        </button>
      </div>
      <div className="flex lg:h-[60vh] w-full max-w-6xl p-6 bg-[#FFEBD0] rounded-xl shadow-lg overflow-hidden">
        <div className="w-full flex flex-col gap-4 p-8">
          <h1 className="text-3xl font-bold text-[#278783] text-center">
            Generate Recipe
          </h1>
          <p className="text-[#278783] text-center">
            Want to see your saved recipes?{" "}
            <Link to="/saved-recipes" className="text-[#278783] font-semibold">
              View Saved Recipes
            </Link>
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#278783]"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cuisine Type"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#278783]"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
            {/* Commenting out the last input field */}
            {/* <input
              type="text"
              placeholder="Dietary Preferences"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#278783]"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
            /> */}
            <button
              type="submit"
              className="w-full bg-[#278783] text-white p-3 rounded-lg mt-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-[#1f6a65] hover:scale-105"
            >
              {loading ? (
                <span className="blinking-text">Generating...</span>
              ) : (
                "Generate Recipe"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
