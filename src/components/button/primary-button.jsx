import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const primaryButton = () => {
    return (
      <div>
        <button class="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        <svg class="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-3-9v2h6v-2h-6z"/>
  </svg>
  Thêm
</button>
      </div>
    );
};

export default primaryButton;







