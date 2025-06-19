// components/ui/ChannelInput.jsx
const ChannelInput = ({ label, value, onChange, type = "text", rows = 1 }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    {rows > 1 ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    )}
  </div>
);

export default ChannelInput;
