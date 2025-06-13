import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/sidebarSlice";
import { FaBars, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../ui/Dropdown";
import { useRef, useState, useEffect } from "react";
import { logout, updateUser } from "../../redux/authSlice";
import EditProfilePopup from "../ui/EditProfilePopup";
import axios from "../../utils/axiosInstance";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleEditProfile = () => {
    setShowEditPopup(true);
  };

  // This function will get triggred when 'Save changes' btn get clicked inside EditProfilePopup component
  const handleSaveProfile = async (image) => {
    console.log("Receive image file (image): ", image);

    // Send this image to backend using FormData and axios

    const formData = new FormData();
    formData.append("avatar", image); // 'avatar' should match your backend field name

    try {
      const response = await axios.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Upload Success:", response.data);

      dispatch(updateUser(response.data.updatedUser));
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };

  // 👇 handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="relative">
          <div
            ref={avatarRef}
            className="w-9 h-9 rounded-full  bg-blue-600 text-white flex items-center justify-center font-semibold text-sm cursor-pointer overflow-hidden"
            onClick={() => setShowDropdown((prev) => !prev)}
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

          {showDropdown && (
            <Dropdown
              username={user.username}
              avatar={user.avatar}
              onLogout={handleLogout}
              onEditProfile={handleEditProfile}
              onClose={() => setShowDropdown(false)}
              innerRef={dropdownRef} // 👈 pass ref down
            />
          )}

          {showEditPopup && (
            <EditProfilePopup
              onClose={() => setShowEditPopup(false)}
              onSave={handleSaveProfile}
            />
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
