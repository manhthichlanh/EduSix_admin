function InputDescription({
  name,
  id,
  className,
  label,
  placeholder,
  rows,
  cols,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="py-2">
      <label htmlFor="" className="text-base font-medium text-gray-500">
        {label}
      </label>

      <textarea
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></textarea>
    </div>
  );
}

export default InputDescription;
