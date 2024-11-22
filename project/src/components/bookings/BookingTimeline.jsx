import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const TIMELINE_STATES = {
  CONFIRMED: {
    icon: CheckCircleIcon,
    color: 'text-green-500',
    label: 'Booking Confirmed'
  },
  PENDING: {
    icon: ClockIcon,
    color: 'text-yellow-500',
    label: 'Awaiting Confirmation'
  },
  CANCELLED: {
    icon: XCircleIcon,
    color: 'text-red-500',
    label: 'Booking Cancelled'
  }
};

export default function BookingTimeline({ booking }) {
  const timelineState = TIMELINE_STATES[booking.status];
  const StateIcon = timelineState.icon;

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        <li>
          <div className="relative pb-8">
            <div className="relative flex items-center space-x-3">
              <div>
                <span className={`h-8 w-8 rounded-full flex items-center justify-center ${timelineState.color}`}>
                  <StateIcon className="h-5 w-5" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">
                      {timelineState.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {format(new Date(booking.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>

        {booking.status === 'CONFIRMED' && (
          <li>
            <div className="relative pb-8">
              <div className="relative flex items-center space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        Activity Date
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(new Date(booking.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}

        {booking.cancelledAt && (
          <li>
            <div className="relative pb-8">
              <div className="relative flex items-center space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                    <XCircleIcon className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        Cancellation
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(new Date(booking.cancelledAt), 'MMM d, yyyy h:mm a')}
                    </p>
                    {booking.cancellationReason && (
                      <p className="mt-2 text-sm text-gray-500">
                        Reason: {booking.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}