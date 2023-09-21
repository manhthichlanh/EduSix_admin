import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const InputSelect = (props) => {

  const { array } = props;
  console.log(array);
  return (

    <select name="" id="" className='mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none'  >
      {
        array?.length > 0 &&
        (
          array.map(item => (
            <option value={item.value}>{item.text}</option>
          ))
        )

      }
      {/* <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option> */}
    </select>
  );
};

export default InputSelect;