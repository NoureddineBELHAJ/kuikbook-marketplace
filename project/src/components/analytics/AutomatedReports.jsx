import { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function AutomatedReports() {
  const { 
    scheduleReport, 
    getScheduledReports,
    deleteScheduledReport,
    isLoading 
  } = useAnalytics();
  
  const [reports, setReports] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: 'weekly',
    format: 'pdf',
    recipients: '',
    reportConfig: {
      metrics: [],
      dimensions: [],
      filters: {}
    }
  });

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getScheduledReports();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const report = await scheduleReport(formData);
    if (report) {
      setReports([...reports, report]);
      setShowScheduleForm(false);
      setFormData({
        name: '',
        description: '',
        schedule: 'weekly',
        format: 'pdf',
        recipients: '',
        reportConfig: {
          metrics: [],
          dimensions: [],
          filters: {}
        }
      });
    }
  };

  const handleDelete = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this scheduled report?')) {
      const success = await deleteScheduledReport(reportId);
      if (success) {
        setReports(reports.filter(report => report.id !== reportId));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Automated Reports</h2>
        <button
          onClick={() => setShowScheduleForm(true)}
          className="btn-primary"
        >
          Schedule New Report
        </button>
      </div>

      {showScheduleForm && (
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Report Name
              </label>
              <input
                type="text"
                className="input mt-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="input mt-1"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <select
                  className="input mt-1"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Format
                </label>
                <select
                  className="input mt-1"
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipients (comma-separated emails)
              </label>
              <input
                type="text"
                className="input mt-1"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                placeholder="email1@example.com, email2@example.com"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowScheduleForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Scheduling...' : 'Schedule Report'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Runs {report.schedule}
                </div>
              </div>
              <button
                onClick={() => handleDelete(report.id)}
                className="text-gray-400 hover:text-gray-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Recipients: {report.recipients}</p>
              <p>Format: {report.format.toUpperCase()}</p>
              <p>Next run: {new Date(report.nextRun).toLocaleString()}</p>
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12">
            <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled reports</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by scheduling your first automated report
            </p>
          </div>
        )}
      </div>
    </div>
  );
}