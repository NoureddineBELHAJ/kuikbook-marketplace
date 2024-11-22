export default function Careers() {
  const positions = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'New York, USA',
      type: 'Full-time'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'London, UK',
      type: 'Full-time'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Join Our Team</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-gray-600">
            We're on a mission to transform the way people discover and book travel experiences. 
            Join us in making travel more accessible and enjoyable for everyone.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Open Positions</h2>
          
          {positions.map((position, index) => (
            <div key={index} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{position.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{position.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{position.type}</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="btn-primary">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Don't see the right position?</h2>
          <p className="text-gray-600 mb-4">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="btn-secondary">
            Send Resume
          </button>
        </div>
      </div>
    </div>
  );
}