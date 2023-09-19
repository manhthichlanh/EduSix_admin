import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
// import './topbar.scss';
function InputText({
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
      <label htmlFor="" className="text-left">
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

export default InputText;
