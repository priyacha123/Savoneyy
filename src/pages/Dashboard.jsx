import { useState } from "react";

const DynamicSelectOption = () => {
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([
    { value: "default", text: "Default Option" },
  ]);

  const addOption = () => {
    if (newOption.trim() !== "") {
      const option = {
        value: newOption,
        text: newOption,
      };

      setOptions([...options, option]);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      
      {/* Add Option Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-6"
      >
        <label
          htmlFor="newOption"
          className="block text-gray-700 font-medium mb-2"
        >
          Enter a new option:
        </label>

        <input
          type="text"
          id="newOption"
          placeholder="Type something..."
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={addOption}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Add to Dropdown
        </button>
      </form>

      {/* Dropdown Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <label
          htmlFor="optionsList"
          className="block text-gray-700 font-medium mb-2"
        >
          Select an option:
        </label>

        <select
          name="optionsList"
          id="optionsList"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <input
          type="submit"
          value="Submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg cursor-pointer transition duration-300"
        />
      </form>
    </div>
  );
};

export default DynamicSelectOption;