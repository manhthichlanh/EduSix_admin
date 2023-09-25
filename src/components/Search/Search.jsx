import Input from "../Input/Input";
import SearchIcon from "../common/icon/SearchIcon";
const Search = () => {
  return (
    <div className="relative flex items-center w-full h-12 border-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
            <SearchIcon></SearchIcon>
        </div>
        <Input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search something.."
        ></Input>
    </div>
  );
};
export default Search;
