import { useState } from "react";
import "./Content.css";

function Content({ username, onLogout, onUpdateWord, word }) {
  const [input, setInput] = useState("");

  return (
    <>
      <div className="container">
        Hello, {username}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
        <p>Your stored word: {word}</p>
        <form
          className="word-form"
          onSubmit={(e) => {
            e.preventDefault();
            onUpdateWord(input);
          }}
        >
          <label>
            <span>Enter Word: </span>
            <input value={input} onInput={(e) => setInput(e.target.value)} />
          </label>
          <button className="submit-btn">Update a word</button>
        </form>
      </div>
    </>
  );
}
export default Content;
