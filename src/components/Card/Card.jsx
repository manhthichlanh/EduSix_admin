function Card({ title, total, icon, unit, onClick }) {
  return (
    <div
      className="w-full p-6 bg-white border-2 rounded-lg hover:drop-shadow-md"
      onClick={onClick}
    >
      {icon}
      <p className="mb-2 text-base text-gray-500">{title}</p>
      <p className="text-2xl font-medium">
        {total}
        <span className="ml-1">{unit}</span>
      </p>
    </div>
  );
}

export default Card;
