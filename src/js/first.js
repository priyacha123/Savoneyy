 export function addOption() {
      // Get the value from the text input
      const newOptionValue = document.getElementById('newOption').value;

      // Check if the input is not empty
      if (newOptionValue.trim() !== "") {
        // Create a new <option> element
        const newOption = document.createElement('option');
        newOption.value = newOptionValue;
        newOption.text = newOptionValue;

        // Append the new option to the select dropdown
        const selectDropdown = document.getElementById('optionsList');
        selectDropdown.appendChild(newOption);

        // Clear the text input after adding the option
        document.getElementById('newOption').value = '';
      } else {
        alert("Please enter a valid option!");
      }
    }