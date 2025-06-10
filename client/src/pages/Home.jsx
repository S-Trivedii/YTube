const Home = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-white rounded shadow-sm p-2">
          <div className="w-full h-40 bg-gray-300 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default Home;
