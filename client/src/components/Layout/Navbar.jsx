import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/sidebarSlice";
import { FaBars, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleSidebar())}>
          <FaBars className="text-xl cursor-pointer" />
        </button>
        <div className="flex items-center text-red-600 text-xl font-bold">
          <FaYoutube className="mr-1" />
          <Link to="/" className="text-gray-800">
            YouTube
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex flex-1 justify-center max-w-xl">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-l-full px-4 py-1 text-sm focus:outline-none"
        />
        <button className="bg-gray-100 border cursor-pointer border-gray-300 rounded-r-full px-4 text-sm hover:bg-gray-200">
          🔍
        </button>
      </div>

      {isAuthenticated && user ? (
        <div
          className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm cursor-pointer overflow-hidden"
          title={user.username}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.username} picture`}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitial(user.username)
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="text-blue-600 font-medium border border-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition text-sm"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
