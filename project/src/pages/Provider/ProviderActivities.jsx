import { useState } from 'react';
import { useActivities } from '../../hooks/useActivities';
import { useAuth } from '../../hooks/useAuth';
import { PlusIcon } from '@heroicons/react/24/outline';
import ActivityGrid from '../../components/activities/ActivityGrid';
import AddActivityModal from '../../components/Provider/AddActivityModal';
import EditActivityModal from '../../components/Provider/EditActivityModal';

export default function ProviderActivities() {
  const { user } = useAuth();
  const { getProviderActivities } = useActivities();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const activities = getProviderActivities(user?.id) || [];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">My Activities</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary inline-flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Activity
        </button>
      </div>

      <ActivityGrid 
        activities={activities}
        onEdit={setSelectedActivity}
        colorScheme="provider"
      />

      <AddActivityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <EditActivityModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
      />
    </div>
  );
}