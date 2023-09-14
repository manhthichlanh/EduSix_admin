import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const InputSelect = () => {
    return (
      <form>
        <select  type="text" name="" id="" className='px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-blue-700 focus:outline-none'  >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
           
             </select>
  
     </form>
    );
};

export default InputSelect;