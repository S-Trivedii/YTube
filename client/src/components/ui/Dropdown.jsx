import { FaUserEdit, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dropdown = ({
  username,
  avatar,
  onLogout,
  onEditProfile,
  onClose,
  innerRef,
}) => {
  const getInitial = (username) => username?.charAt(0).toUpperCase();

  return (
    <div
      ref={innerRef}
      className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded text-sm z-50"
    >
      {/* User Info Section */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={`${username} avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitial(username)
          )}
        </div>
        <div className="font-medium text-gray-800 truncate">{username}</div>
      </div>

      {/* View Channel */}
      <Link
        to="/channel"
        className="flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100 text-left gap-2"
      >
        <FaUser className="text-green-500" />
        View Channel
      </Link>

      {/* Edit Profile */}
      <button
        onClick={() => {
          onEditProfile();
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100 text-left gap-2"
      >
        <FaUserEdit className="text-blue-500" />
        Edit Profile
      </button>

      {/* Sign Out */}
      <button
        onClick={() => {
          onLogout();
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100 text-left gap-2"
      >
        <FaSignOutAlt className="text-red-500" />
        Sign Out
      </button>
    </div>
  );
};

export default Dropdown;
