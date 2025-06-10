import { useSelector } from "react-redux";
import { FaHome, FaHistory, FaFire } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";

const menuItems = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaFire />, label: "Shorts" },
  { icon: <MdSubscriptions />, label: "Subscriptions" },
  { icon: <FaHistory />, label: "History" },
];

const Sidebar = () => {
  // Use useSelector to display on UI. sidebar is slice name and isOpen is the state in sidebar slice
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <aside
      className={`bg-white h-full border-r transition-all duration-300 ease-in-out ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      <ul className="pt-4 space-y-1">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="ml-4">{item.label}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
