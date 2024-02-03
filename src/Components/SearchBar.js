import React, { useRef } from "react";
import Button from "./Button";

export default function SearchBar({ handleClick, placeholder, setResults, setError }) {
  let input = useRef();
  return (
    <form>
      <input type="text" placeholder={placeholder} ref={input} />
      <br />
      <Button
        text={"Search"}
        handleClick={(e) => {
          handleClick(e, input.current.value)
            .then((data) => setResults(data))
            .catch((err) => setError(err));
        }}
      />
    </form>
  );
}