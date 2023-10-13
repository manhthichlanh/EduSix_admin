function Input({
  type,
  className,
  label,
  placeholder,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="w-full py-2">
      <label htmlFor="" className="text-base font-medium text-gray-500">
        {label}
      </label>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
