import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
const Card = (props) => {
  const { Icon, title, content,  Class } = props
  return (
    <div className="mr-6 border-2 w-full p-4 rounded-lg bg-white">
        {Icon && <Icon></Icon>}
        {title}
        {content}

    </div>
    
  );
}

export default Card;







