import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
// import './topbar.scss';
<<<<<<< HEAD
const InputText = () => {
    return (
      <div className="text-left">
          <input type="text" name="" id="" className='mb-4 mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none'  />
      </div>
    );
};
=======
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
>>>>>>> 6bf369b38e730179f564fd24cc74410b1b377a51

export default InputText;
