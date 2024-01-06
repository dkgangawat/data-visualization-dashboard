import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataAsync,
  fetchFilteredDataAsync,
  fetchUniqueValuesAsync,
  setFilters,
} from "../Store/slices/DataSlice";
import Pagination from "../components/common/Pagination";
import LimitDropdown from "../components/common/LimitDropDown";
import { GiSettingsKnobs } from "react-icons/gi";
import Overlay from "../components/common/Overlay";
import Dropdown from "../components/common/Dropdown";
const Data = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [showingFilterData, setShowingFilterData] = React.useState(false);
  const tableHeaders = [
    "title",
    "topic",
    "sector",
    "intensity",
    "country",
    "start year",
    "end year",
    "insight",
    "region",
    "impact",
    "added",
    "published",
    "relevance",
    "pestle",
    "source",
    "likelihood",
  ];

  const [showFilters, setShowFilters] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  useEffect(() => {
    console.log("called");
    dispatch(fetchDataAsync({ limit, page }));
  }, [limit, page]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  return (
    <div className=" px-4 ">
      <div className="mb-2 ">
        <button
          className=" flex items-center border p-2 rounded-md gap-3 relative"
          onClick={() => {
            dispatch(fetchUniqueValuesAsync());
            setShowFilters(true);
          }}
        >
          <GiSettingsKnobs className=" text-gray-500 inline-block" />
          <span className=" text-sm tracking-wider text-gray-400">Filter</span>
          {showingFilterData && (
          <span className=" inline-block w-1 h-1 bg-blue-900 rounded-full  "></span>
        )}
        </button>
       
      </div>
      <div>
      {data.items.length > 0 ? (
        <div
          className={`overflow-auto h-[70dvh] w-[calc(100vw-32px)] md:w-[calc(100vw-288px)] shadow-md mx-auto relative rounded-md `}
        >
          <table className=" border-collapse  rounded-md text-xs  mb-20 w-full ">
            <thead className="sticky -top-1 bg-white shadow ">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`border ${
                      index === 0 || index === 7 ? " min-w-96" : ""
                    } border-gray-300 text-gray-600 px-4 py-2 capitalize`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td
                    className={`border text-blue-800 border-gray-30 hover:underline min-w-10 px-4 py-2 `}
                  >
                    <a target="_blank" href={item.url}>
                      {item.title}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.topic}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sector}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.intensity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.country}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.start_year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.end_year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.insight}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.region}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.impact}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.added}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.published}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.relevance}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.pestle}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.source}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.likelihood}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ):(
        <div className=" w-[calc(100vw-32px)] md:w-[calc(100vw-288px)] min-h-16 bg-[#ffffffcf] backdrop-blur-sm flex gap-5 p-4 justify-center flex-wrap items-center">
          <span className=" text-gray-500 text-sm ">No Data Found!</span>
        </div>
      )}
        
        {!showingFilterData && (
          <div className=" w-[calc(100vw-32px)] md:w-[calc(100vw-288px)] min-h-16 bg-[#ffffffcf] backdrop-blur-sm flex gap-5 p-4 justify-center flex-wrap items-center">
            {/* Pagination */}
            <LimitDropdown onSelectLimit={setLimit} />
            <Pagination
              page={page}
              onPageChange={setPage}
              totalPages={data.totalPages}
            />
          </div>
        )}
      </div>
      {showFilters && (
        <Overlay closeFun={setShowFilters}>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
            className="bg-[#fff] p-8 rounded-md border shadow-md"
          >
            {Object.keys(data.uniqueValuesForFilters)?.map((key, index) => (
              <div key={index} className=" grid grid-cols-2 items-center mb-1">
                <span className="text-sm font-semibold text-gray-500">
                  {key}
                </span>
                <div>
                  <Dropdown
                    options={data.uniqueValuesForFilters[key]}
                    setActiveDropdown={setActiveDropdown}
                    activeDropdown={activeDropdown}
                    dropdownNumber={index + 1}
                    defaultValue={data.filters[key]}
                    onChange={(value) => {
                      dispatch(setFilters({ ...data.filters, [key]: value }));
                    }}
                  />
                  {data.filters[key] && (
                    <span
                      onClick={() => {
                        dispatch(setFilters({ ...data.filters, [key]: null }));
                      }}
                      className="text-xs text-blue-800 hover:underline cursor-pointer"
                    >
                      Clear
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className=" flex justify-end">
              <button
                onClick={() => {
                  if(Object.keys(data.filters).length === 0) return;
                  dispatch(fetchFilteredDataAsync(data.filters));
                  setShowFilters(false);
                  setShowingFilterData(true);
                }}
                className=" bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all duration-300 ease-in-out"
              >
                Apply
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default Data;
