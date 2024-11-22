import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useActivities } from '../../hooks/useActivities';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

export default function AvailabilityCalendar({ activityId, initialAvailability = {} }) {
  const { updateAvailability, isLoading } = useActivities();
  const [availability, setAvailability] = useState(initialAvailability);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTimeChange = (type, time) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    setAvailability(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        [type]: time
      }
    }));
  };

  const handleSave = async () => {
    await updateAvailability(activityId, availability);
  };

  const getTimeSlotsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability[dateStr] || { startTime: '', endTime: '', maxSlots: 1 };
  };

  const selectedDateSlots = getTimeSlotsForDate(selectedDate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            inline
            minDate={new Date()}
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Time Slots for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                className="input mt-1"
                value={selectedDateSlots.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                className="input mt-1"
                value={selectedDateSlots.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Slots
            </label>
            <input
              type="number"
              className="input mt-1"
              min="1"
              value={selectedDateSlots.maxSlots}
              onChange={(e) => handleTimeChange('maxSlots', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Saving...' : 'Save Availability'}
        </button>
      </div>
    </div>
  );
}