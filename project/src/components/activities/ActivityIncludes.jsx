export default function ActivityIncludes({ included }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">What's included</h2>
      <ul className="space-y-2">
        {included.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}