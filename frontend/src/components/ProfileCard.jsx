import React from 'react';

const ProfileCard = ({ label, value, name, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder={`Masukkan ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default ProfileCard;
