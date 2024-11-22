import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export default function ActivityCalendar({ bookings, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const getBookingsForDate = (date) => {
    return bookings.filter(booking => 
      format(new Date(booking.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day, dayIdx) => {
          const dayBookings = getBookingsForDate(day);
          const hasBookings = dayBookings.length > 0;
          
          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day, dayBookings)}
              className={clsx(
                'relative h-14 border rounded-lg',
                dayIdx === 0 && `col-start-${day.getDay() + 1}`,
                'hover:bg-gray-50',
                hasBookings && 'bg-provider-50'
              )}
            >
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className={clsx(
                  'text-sm',
                  hasBookings ? 'text-provider-600 font-medium' : 'text-gray-900'
                )}
              >
                {format(day, 'd')}
              </time>
              {hasBookings && (
                <div className="absolute bottom-1 inset-x-0 text-xs text-provider-600">
                  {dayBookings.length} bookings
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}