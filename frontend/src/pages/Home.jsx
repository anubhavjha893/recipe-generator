import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#278783] text-black flex justify-center items-center p-8">
      <div className="bg-[#FFEBD0] rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#278783]">Explore the World of Recipes</h2>
        <p className="text-gray-700 mb-6">Get started with your favorite dishes</p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/recipe-form"
            className="bg-[#278783] text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg font-semibold"
          >
            Create Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className="bg-gray-700 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg font-semibold"
          >
            Saved Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}