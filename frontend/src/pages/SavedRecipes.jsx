import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(""); // To handle error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get(
          "https://mentor-project.onrender.com/api/recipes/saved",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecipes(response.data.recipes || []);
      } catch (error) {
        setError("Error fetching saved recipes. Please try again.");
        console.error("Error fetching saved recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      await axios.delete(
        `https://mentor-project.onrender.com/api/recipes/delete/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      setError("Failed to delete recipe. Please try again.");
      console.error("Error deleting recipe:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#278783] p-6 text-[#FFEBD0]">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:underline flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Saved Recipes
      </h1>

      {loading && <div className="text-center text-[#FFEBD0]">Loading...</div>}

      {error && !loading && (
        <p className="text-red-500 text-lg text-center mt-4">{error}</p>
      )}

      {recipes.length === 0 && !loading ? (
        <p className="text-[#FFEBD0] text-lg text-center">No saved recipes found.</p>
      ) : (
        <div className="grid gap-6 w-full max-w-6xl">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-[#1f6a65]"
            >
              <h2 className="text-2xl font-semibold text-[#FFEBD0] mb-4">{recipe.title}</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#FFEBD0] mb-2">🥦 Ingredients:</h3>
                  <ul className="list-disc list-inside text-[#FFEBD0] space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.item} - {ingredient.quantity} {ingredient.unit || ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFEBD0] mb-2">👨‍🍳 Instructions:</h3>
                  <ol className="list-decimal list-inside text-[#FFEBD0] space-y-2">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={instruction._id || index}>
                        <strong>Step {instruction.step}:</strong> {instruction.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 duration-300 w-full"
              >
                {loading ? "Deleting..." : "Delete Recipe"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
