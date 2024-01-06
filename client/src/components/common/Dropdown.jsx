import React, { useState } from "react";

const Dropdown = ({ options, onChange,setActiveDropdown,activeDropdown, dropdownNumber , defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
  {
    if(searchTerm === "") return true;
    return String(option).toLowerCase().includes(searchTerm.toLowerCase())
  }
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => {setDropdownOpen(!isDropdownOpen);setActiveDropdown(dropdownNumber) }}
          className="inline-flex justify-center w-52 z-0  rounded-md border border-gray-50 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
        >
          {selectedOption || defaultValue || "Select an option"}
        </button>
      </div>
      {isDropdownOpen &&( activeDropdown === dropdownNumber) && (
        <div className="origin-top-right z-10 absolute max-h-40 overflow-y-scroll  right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full sticky top-0 px-2 py-2 border-b border-gray-300 focus:outline-none"
            />
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
