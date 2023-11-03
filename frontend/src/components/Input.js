import React from "react";

const Input = ({ label, id, placeholder, type, name, value, onChange }) => {
  return (
    <div>
      <label
        for="email"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
