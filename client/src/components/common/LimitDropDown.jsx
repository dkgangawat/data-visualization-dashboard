import React, { useState } from "react";

const LimitDropdown = ({ onSelectLimit }) => {
  const [selectedLimit, setSelectedLimit] = useState(10);

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setSelectedLimit(newLimit);
    onSelectLimit(newLimit);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="limitSelect" className="text-sm font-medium text-gray-500">
        Show:
      </label>
      <select
        id="limitSelect"
        value={selectedLimit}
        onChange={handleLimitChange}
        className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={70}>70</option>
        <option value={100}>100</option>
      </select>
      <span className="text-sm text-gray-500">entries</span>
    </div>
  );
};

export default LimitDropdown;
