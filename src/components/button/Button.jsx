import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';
// import './topbar.scss';
const Button = (props) => {
  const { text, style, Class, Icon } = props
  // console.log(Icon);
  return (
    <div>
      <button style={style} className={" "+Class}>
        {Icon && <Icon></Icon>}
        {text}
      </button>
    </div>
  );
}

export default Button;







