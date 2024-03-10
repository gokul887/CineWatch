import React from "react";
import SearchBar from "./SearchBar";
import "../styles/Search/SearchPage.css";
import Movie from "./Movie";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSearchPageContainer = styled.div`
  height: 100%;
  max-width: 100vw;
  .searchpage-content {
    padding: 40px;
    h1 {
      display: inline;
      color: #fe3434;
    }
    .searchpage-media-content {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      justify-content: center;
    }
  }
`;
const SearchPage = (props) => {
  const { contentType, media, searchValue, setSearchValue } = props;

  return (
    <StyledSearchPageContainer>
      <SearchBar setSearchValue={setSearchValue} />
      <div className="searchpage-content">
        {searchValue.replace(" ", "") !== "" ? (
          <h1>Search Results: </h1>
        ) : (
          <h1>Popular {contentType}: </h1>
        )}
        <div className="searchpage-media-content">
          {media.map((m) => (
            <Link to={`/${m.id}`}>
              <Movie movie={m} />
            </Link>
          ))}
        </div>
      </div>
    </StyledSearchPageContainer>
  );
};

export default SearchPage;
