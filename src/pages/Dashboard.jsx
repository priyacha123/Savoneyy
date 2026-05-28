import { useState } from "react";
import "./../css/first.css"

const DynamicSelectOption = () => {
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([
    { value: "default", text: "Default Option" },
  ]);

  const addOption = () => {
    // Check if input is not empty
    if (newOption.trim() !== "") {
      // Create new option object
      const option = {
        value: newOption,
        text: newOption,
      };

      // Add new option to dropdown
      setOptions([...options, option]);

      // Clear input field
      setNewOption("");
    } else {
      alert("Please enter a valid option!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div>
      {/* Form for adding options */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="newOption">Enter a new option:</label>

        <input
          type="text"
          id="newOption"
          placeholder="Type something..."
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />

        <button type="button" onClick={addOption}>
          Add to Dropdown
        </button>
      </form>

      {/* Form with dropdown */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="optionsList">Select an option:</label>

        <select name="optionsList" id="optionsList">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default DynamicSelectOption;