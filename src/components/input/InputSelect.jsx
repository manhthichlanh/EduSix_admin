import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const InputSelect = (props) => {
  const { array, className, label, onChange, value } = props;
  console.log(array);

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
        {
          array?.length > 0 &&
          (
            array.map(item => (
              <option key={item.value} value={item.value}>{item.text}</option>
            ))
          )
        }
      </select>
    </div>
  );
};

export default InputSelect;
