import { useState } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';

export default function ProviderEarnings() {
  const { user } = useAuth();
  const { 
    getMonthlyRevenue, 
    getTotalEarnings, 
    getUpcomingPayout,
    getRecentTransactions 
  } = useBookings();

  // Get real data
  const monthlyRevenue = getMonthlyRevenue(user?.id);
  const totalEarnings = getTotalEarnings(user?.id);
  const upcomingPayout = getUpcomingPayout(user?.id);
  const recentTransactions = getRecentTransactions(user?.id);

  // Calculate percentage changes
  const monthlyChange = '+8%'; // This should come from actual data comparison
  const totalChange = '+12%'; // This should come from actual data comparison

  const stats = [
    { 
      name: 'Total Earnings', 
      value: `$${totalEarnings.toLocaleString()}`, 
      change: totalChange, 
      icon: CurrencyDollarIcon 
    },
    { 
      name: 'Monthly Revenue', 
      value: `$${monthlyRevenue.toLocaleString()}`, 
      change: monthlyChange, 
      icon: ArrowTrendingUpIcon 
    },
    { 
      name: 'Upcoming Payouts', 
      value: `$${upcomingPayout.amount.toLocaleString()}`, 
      date: `Due ${new Date(upcomingPayout.date).toLocaleDateString()}`, 
      icon: CalendarIcon 
    },
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-provider-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  {stat.change && (
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  )}
                  {stat.date && (
                    <p className="ml-2 text-sm text-gray-500">{stat.date}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.activity}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <span className={clsx(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
                  transaction.type === 'Booking' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                )}>
                  {transaction.type}
                </span>
                <span className={clsx(
                  'text-sm font-medium',
                  transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                )}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          {recentTransactions.length === 0 && (
            <p className="text-sm text-gray-500">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
}