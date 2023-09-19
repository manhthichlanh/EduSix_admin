import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
const InputSelect = (props) => {
  const { option } = [
    { value: "Dang bat", label: "dang bat" },
    { value: "Dang tat", label: "dang tat" },
  ];
  return (
    <form>
      <select
        type="text"
        name=""
        id=""
        className="w-full px-4 py-2 mt-2 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </form>
  );
};

export default InputSelect;
