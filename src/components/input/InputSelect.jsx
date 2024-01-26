import React from 'react';

const InputSelect = ({ array, className, label, onChange, value }) => {
  return (
    <div className="py-2">
      <label htmlFor="" className="text-base font-medium text-gray-500">
        {label}
      </label>
      <select
        className={className}
        value={value}
        onChange={onChange}
      >
        {array?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
