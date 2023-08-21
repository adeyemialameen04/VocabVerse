import "./input.css";
import { AiOutlineSearch } from "react-icons/ai";

const Input = ({ searchValue, setSearchValue, refetch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="input__container container">
      <input
        className="input"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="start typing  ..."
      />
      <AiOutlineSearch type="submit" className="search-icon" />
    </form>
  );
};

export default Input;
