function InputDescription({
  name,
  id,
  className,
  label,
  cols,
  rows,
  placeholder,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="">
      <label htmlFor="" className="font-medium text-gray-500">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></textarea>
    </div>
  );
}

export default InputDescription;
