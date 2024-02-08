import React, { useState } from "react";
import Button from "./Button";

export default function SearchBar({ handleClick, comicSearch, placeholder1, placeholder2, placeholder3, setResults, setError }) {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!comicSearch) {
      handleClick(e, searchTerm1)
        .then((data) => setResults(data))
        .catch((err) => setError(err));
    } else {
      handleClick(e, { title: searchTerm1, year: searchTerm2, issue: searchTerm3 })
        .then((data) => setResults(data))
        .catch((err) => setError(err));
    }
  };

  return (
    <form>
      <input type="text" placeholder={placeholder1} value={searchTerm1} onChange={(e) => setSearchTerm1(e.target.value)} />
      <br />
      {comicSearch && (
        <>
          <div className="search-bar-container">
            <input type="text" className="input2" placeholder={placeholder2} value={searchTerm2} onChange={(e) => setSearchTerm2(e.target.value)} />
            <input type="text" className="input2" placeholder={placeholder3} value={searchTerm3} onChange={(e) => setSearchTerm3(e.target.value)} />
          </div>
          <br />
        </>
      )}
      <Button
        text={"Search"}
        handleClick={handleSearch}
      />
      <br />
    </form>
  );
}
