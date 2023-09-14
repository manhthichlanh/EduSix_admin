import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const InputDescription = () => {
    return (
      <form>
        <textarea name="" id="" cols="30" rows="10" placeholder='mo ta' className='px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-blue-700 focus:outline-none'></textarea>
      </form>
    );
};

export default InputDescription;