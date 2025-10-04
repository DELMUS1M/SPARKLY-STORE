import React, { useState, useRef, useEffect } from 'react';
import { Address } from '../types';

interface AddAddressFormProps {
  onSave: (addressData: Omit<Address, 'id' | 'isDefault'> & { id?: string }) => void;
  onCancel: () => void;
  addressToEdit?: Address | null;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onSave, onCancel, addressToEdit }) => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Kenya');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [error, setError] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (addressToEdit) {
      setName(addressToEdit.name);
      setStreet(addressToEdit.street);
      setCity(addressToEdit.city);
      setCountry(addressToEdit.country);
      setGoogleMapsLink(addressToEdit.googleMapsLink || '');
    } else {
      // Reset form if it was previously editing
      setName('');
      setStreet('');
      setCity('');
      setCountry('Kenya');
      setGoogleMapsLink('');
    }
  }, [addressToEdit]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    saveButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !street.trim() || !city.trim() || !country.trim()) {
      setError('Please fill in your name and address details.');
      return;
    }
    setError('');
    onSave({
      id: addressToEdit?.id,
      name,
      street,
      city,
      country,
      googleMapsLink,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-address-title"
      onClick={onCancel}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg p-6 sm:p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-address-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          {addressToEdit ? 'Edit Shipping Address' : 'Add New Shipping Address'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="addr-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input type="text" id="addr-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Jane Doe" required />
          </div>
          <div>
            <label htmlFor="addr-street" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Street Address</label>
            <input type="text" id="addr-street" value={street} onChange={e => setStreet(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 123 Sparkle Ave, Apartment 4B" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="addr-city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
              <input type="text" id="addr-city" value={city} onChange={e => setCity(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Nairobi" required />
            </div>
            <div>
              <label htmlFor="addr-country" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
              <input type="text" id="addr-country" value={country} onChange={e => setCountry(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
          <div>
            <label htmlFor="addr-gmaps" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Google Maps Link (Optional)</label>
            <input type="url" id="addr-gmaps" value={googleMapsLink} onChange={e => setGoogleMapsLink(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://maps.app.goo.gl/..." />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              On Google Maps, find your location, click "Share", then "Copy link".
            </p>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div className="flex justify-end gap-4 pt-4 border-t dark:border-slate-700 mt-6">
            <button type="button" onClick={onCancel} className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2 px-5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors">
              Cancel
            </button>
            <button ref={saveButtonRef} type="submit" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;