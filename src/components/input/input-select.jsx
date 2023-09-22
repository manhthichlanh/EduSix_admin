import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const InputSelect = (props) => {
  const { array, className, label } = props;
  console.log(array);
  return (
    <div className="py-2">
      <label htmlFor="" className="text-base font-medium text-gray-500">
        {label}
      </label>
      <select
      className={className}>
        {
          array?.length > 0 &&
          (
            array.map(item => (
              <option value={item.value}>{item.text}</option>
            ))
          )
        }
        
        
      </select>
    </div>

  );
};

export default InputSelect;