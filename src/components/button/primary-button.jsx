import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const primaryButton = () => {
    return (
      <div>
        <button class="flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white font-bold py-2 px-4 rounded-lg ">
    <svg className="pr-2 " fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z"/>
  <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z"/>
</svg>
    Thêm
    </button>
      </div>
    );
};

export default primaryButton;







