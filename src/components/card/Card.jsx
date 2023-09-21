import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
const Card = (props) => {
  const { Icon, title, content, unit, percent } = props;
  return (
    <div className="w-full p-6 bg-white border-2 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="">{Icon && <Icon></Icon>}</div>
        <div className="px-2 text-lg font-medium bg-gray-200 rounded-lg text-emerald-600">
          {percent}%
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-base font-medium text-gray-500">{title}</div>
        <div className="flex items-center text-2xl font-medium whitespace-wrap">
          <div className="mr-2">
            {content} {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
