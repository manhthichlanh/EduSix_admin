// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="">
      <label htmlFor="" className="font-medium text-gray-500">
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
