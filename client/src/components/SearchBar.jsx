import React from "react";
import "../styles/Search/SearchBar.css";

const SearchBar = (props) => {
  const { setSearchValue } = props;
  return (
    <form>
      <input
        type="text"
        placeholder="Type to search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
