import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { usePayments } from '../../hooks/usePayments';

export default function PaymentDetailsModal({ payment, isOpen, onClose }) {
  const { updatePaymentStatus } = usePayments();

  if (!payment) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleUpdateStatus = (status) => {
    updatePaymentStatus(payment.id, status);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Payment Details
                    </Dialog.Title>

                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Type</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">Status</p>
                          <span className={clsx(
                            'mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            getStatusColor(payment.status)
                          )}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">Amount</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">Date</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {payment.processingFee && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Processing Fee</p>
                            <p className="mt-1 text-sm text-gray-900">
                              {formatCurrency(payment.processingFee)}
                            </p>
                          </div>
                        )}

                        {payment.platformFee && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Platform Fee</p>
                            <p className="mt-1 text-sm text-gray-900">
                              {formatCurrency(payment.platformFee)}
                            </p>
                          </div>
                        )}

                        {payment.netAmount && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Net Amount</p>
                            <p className="mt-1 text-sm text-gray-900">
                              {formatCurrency(payment.netAmount)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      {payment.status === 'pending' && (
                        <>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => handleUpdateStatus('completed')}
                          >
                            Mark as Completed
                          </button>
                          <button
                            type="button"
                            className="btn-secondary text-red-600 hover:text-red-700"
                            onClick={() => handleUpdateStatus('failed')}
                          >
                            Mark as Failed
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}