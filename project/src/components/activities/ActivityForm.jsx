import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useActivities } from '../../hooks/useActivities';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Map from '../maps/Map';

export default function ActivityForm({ initialData, onSubmit }) {
  const { isLoading } = useActivities();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    maxParticipants: '',
    location: {
      name: '',
      address: '',
      coordinates: null
    },
    images: [],
    ...initialData
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      // Convert File objects to URLs for preview
      const imageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a copy of form data without circular references
    const submissionData = {
      ...formData,
      images: formData.images.map(image => {
        // If image is a URL (from initialData), keep it as is
        if (typeof image === 'string' && image.startsWith('http')) {
          return image;
        }
        // For new images (Blob URLs), we'll need to handle them separately
        // In a real app, you'd upload these to a storage service
        return image;
      })
    };

    await onSubmit(submissionData);
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleMapClick = (coordinates) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="input mt-1"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="input mt-1"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            className="input mt-1"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (hours)
          </label>
          <input
            type="number"
            id="duration"
            className="input mt-1"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            min="0.5"
            step="0.5"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
          Maximum Participants
        </label>
        <input
          type="number"
          id="maxParticipants"
          className="input mt-1"
          value={formData.maxParticipants}
          onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
          Location Name
        </label>
        <input
          type="text"
          id="locationName"
          className="input mt-1"
          value={formData.location.name}
          onChange={(e) => setFormData({
            ...formData,
            location: { ...formData.location, name: e.target.value }
          })}
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="input mt-1"
          value={formData.location.address}
          onChange={(e) => setFormData({
            ...formData,
            location: { ...formData.location, address: e.target.value }
          })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Location on Map
        </label>
        <Map
          height="300px"
          markers={formData.location.coordinates ? [{
            position: formData.location.coordinates,
            title: formData.location.name
          }] : []}
          onClick={handleMapClick}
          className="rounded-lg overflow-hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Activity ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
          {formData.images.length < 5 && (
            <div
              {...getRootProps()}
              className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <PlusIcon className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">Add Image</p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Upload up to 5 images. Supported formats: JPEG, PNG
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Activity' : 'Create Activity'}
        </button>
      </div>
    </form>
  );
}