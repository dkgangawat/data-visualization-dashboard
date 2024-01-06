import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div aria-label="Page navigation" className="">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => onPageChange(page - 1 < 1 ? 1 : page - 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            <span className="sr-only">Previous</span>
            <IoIosArrowBack />
          </button>
        </li>
        <li>
          <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
            page {page} of {totalPages}
          </span>
        </li>
        <li>
          <button
            onClick={() => onPageChange(page + 1 > totalPages ? totalPages : page + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            <span className="sr-only">Next</span>
            <IoIosArrowForward />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
