import { useState } from "react";
import Error from "./Error";
import compare from "./compare";
function Content({ username, onLogout }) {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  function isValidWord(word) {
    if (word.length != 5) {
      setError(`${word} was not a valid word`);
    } else if (word.toLowerCase() != "recat") {
      const common = compare("recat", word);
      setError(`${word} had ${common} letters in common`);
    } else if (word.toLowerCase() == "recat") {
      setError(`${word} is the secret word!`);
    }
  }

  return (
    <div>
      Hello {username}
      <button onClick={onLogout}>Logout</button>
      <Error error={error} />
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent the form from navigating browser on submit
          isValidWord(word);
          setWord("");
        }}
      >
        <label>Enter a 5-letters word:</label>
        <input value={word} onInput={(e) => setWord(e.target.value)} />
        <button type="submit">Make a guess</button>
      </form>
    </div>
  );
}

export default Content;
