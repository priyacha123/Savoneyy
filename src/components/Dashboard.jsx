import { useState } from "react";

export default function DynamicSelect() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([
    { value: "default", label: "Default Option" },
  ]);
  const [selected, setSelected] = useState("default");

  function addOption() {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      alert("Please enter a valid option!");
      return;
    }

    const newOption = {
      value: trimmed,
      label: trimmed,
    };

    setOptions((prev) => [...prev, newOption]);
    setInputValue("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Selected option:", selected);
  }

  return (
    <div>
      {/* Add Option Form */}
      <div>
        <label>Enter a new option:</label>
        <input
          type="text"
          value={inputValue}
          placeholder="Type something..."
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="button" onClick={addOption}>
          Add to Dropdown
        </button>
      </div>

      {/* Select Form */}
      <form onSubmit={handleSubmit}>
        <label>Select an option:</label>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}