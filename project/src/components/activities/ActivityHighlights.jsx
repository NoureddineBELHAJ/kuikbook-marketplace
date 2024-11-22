export default function ActivityHighlights({ highlights }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="h-2 w-2 bg-primary-500 rounded-full" />
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}