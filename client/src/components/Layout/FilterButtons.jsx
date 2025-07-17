const categories = [
  "all",
  "education",
  "entertainment",
  "gaming",
  "music",
  "news",
  "sports",
  "technology",
  "travel",
];

const FilterButtons = ({ selectedCategory, setSelectedCategory }) => {
  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex overflow-x-auto gap-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`whitespace-nowrap px-4 py-2 cursor-pointer rounded-full text-sm font-medium border ${
            selectedCategory === category
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
