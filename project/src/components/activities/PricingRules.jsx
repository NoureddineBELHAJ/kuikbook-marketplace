import { useState } from 'react';
import { useActivities } from '../../hooks/useActivities';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function PricingRules({ activityId, initialRules = [] }) {
  const { updatePricingRules, isLoading } = useActivities();
  const [rules, setRules] = useState(initialRules);

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        id: Date.now(),
        type: 'group_size',
        condition: { min: 1, max: null },
        adjustment: { type: 'percentage', value: 0 }
      }
    ]);
  };

  const handleRemoveRule = (ruleId) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const handleRuleChange = (ruleId, updates) => {
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  };

  const handleSave = async () => {
    await updatePricingRules(activityId, rules);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pricing Rules</h3>
        <button
          type="button"
          onClick={handleAddRule}
          className="btn-secondary inline-flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="card p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rule Type
                  </label>
                  <select
                    className="input mt-1"
                    value={rule.type}
                    onChange={(e) => handleRuleChange(rule.id, { type: e.target.value })}
                  >
                    <option value="group_size">Group Size</option>
                    <option value="advance_booking">Advance Booking</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                </div>

                {rule.type === 'group_size' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Minimum Size
                      </label>
                      <input
                        type="number"
                        className="input mt-1"
                        min="1"
                        value={rule.condition.min}
                        onChange={(e) => handleRuleChange(rule.id, {
                          condition: { ...rule.condition, min: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Maximum Size
                      </label>
                      <input
                        type="number"
                        className="input mt-1"
                        min="1"
                        value={rule.condition.max || ''}
                        onChange={(e) => handleRuleChange(rule.id, {
                          condition: { ...rule.condition, max: parseInt(e.target.value) || null }
                        })}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Adjustment Type
                    </label>
                    <select
                      className="input mt-1"
                      value={rule.adjustment.type}
                      onChange={(e) => handleRuleChange(rule.id, {
                        adjustment: { ...rule.adjustment, type: e.target.value }
                      })}
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {rule.adjustment.type === 'percentage' ? 'Percentage' : 'Amount'}
                    </label>
                    <input
                      type="number"
                      className="input mt-1"
                      value={rule.adjustment.value}
                      onChange={(e) => handleRuleChange(rule.id, {
                        adjustment: { ...rule.adjustment, value: parseFloat(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveRule(rule.id)}
                className="ml-4 text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        {rules.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No pricing rules defined
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Saving...' : 'Save Rules'}
        </button>
      </div>
    </div>
  );
}