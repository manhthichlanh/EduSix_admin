import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import './topbar.scss';
const topBar = () => {
    return (
        <div className='topbar'>
           <div className='thanh_topBar'>
           <FontAwesomeIcon className='icon_topBar1' icon={faBars} />
           </div>
        </div>
    );
};

export default topBar;