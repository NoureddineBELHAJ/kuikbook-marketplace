import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Activities() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Available Activities</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Activity cards will be rendered here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Sample Activity</h3>
          <p className="text-gray-600 mt-2">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}