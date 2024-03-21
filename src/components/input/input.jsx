function Input({
  type,
  className,
  outLetClassName="py-2",
  label,
  placeholder,
  value,
  onChange,
  disabled,
  min
}) {
  return (
    <div className={"w-full "+ outLetClassName} >
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
        min={min}
      />
    </div>
  );
}

export default Input;
