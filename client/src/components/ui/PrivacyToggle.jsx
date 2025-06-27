import { FaEye } from "react-icons/fa";

const PrivacyToggle = ({ isPublic, setIsPublic }) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        <FaEye /> Privacy
      </h2>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Public</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
          className="w-4 h-4"
        />
      </div>
    </div>
  );
};

export default PrivacyToggle;
