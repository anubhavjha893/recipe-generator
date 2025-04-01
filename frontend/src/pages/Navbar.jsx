import { Link, useParams } from "react-router-dom";

export default function Navbar({ isAuthenticated, handleLogout }) {
  const paramas = useParams()
  
  return (
    <nav className="bg-[#278783] text-white fixed w-full p-4 shadow-lg flex justify-center items-center space-x-6">
      {isAuthenticated ? (
        <>
          <Link to="/" className="hover:text-[#FFEBD0] text-lg font-semibold">
            Home
          </Link>
          <Link to="/recipe-form" className="hover:text-[#FFEBD0] text-lg font-semibold">
            Create
          </Link>
          <Link to="/saved-recipes" className="hover:text-[#FFEBD0] text-lg font-semibold">
            Saved
          </Link>
          <button onClick={handleLogout} className="hover:text-red-400 text-lg font-semibold">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-green-400 text-lg font-semibold">
            
          </Link>
          <Link to="/signup" className="hover:text-green-400 text-lg font-semibold">
              
          </Link>
        </>
      )}
    </nav>
  );
}
