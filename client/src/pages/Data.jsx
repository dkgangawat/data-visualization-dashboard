import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "../Store/slices/DataSlice";
import Pagination from "../components/common/Pagination";
import LimitDropdown from "../components/common/LimitDropDown";

const Data = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
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

  useEffect(() => {
    dispatch(fetchDataAsync({ limit, page }));
  }, [limit,page]);

  if (data.status === "succeeded") {
    console.log(Object.keys(data.items[0]).toString());
  }

  return (
    <div className=" p-4 ">
      {/* table that have 18 col */}
      <div
        className={`overflow-auto h-[80dvh] w-[calc(100vw-32px)] md:w-[calc(100vw-300px)] shadow-md mx-auto relative `}
      >
        <table className="table-auto border-collapse  rounded-md text-xs  mb-20">
          <thead className="sticky -top-1 bg-white shadow ">
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 text-gray-600 px-4 py-2 capitalize"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                {tableHeaders.map((header, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 text-gray-700 px-4 py-2"
                  >
                    {item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" w-[calc(100vw-32px)] md:w-[calc(100vw-300px)] h-16 bg-[#ffffffcf] backdrop-blur-sm flex gap-5 p-4 justify-center flex-wrap items-center fixed bottom-12">
          {/* Pagination */}
          <LimitDropdown onSelectLimit={setLimit} />
          <Pagination page={page} onPageChange={setPage} totalPages={data.totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Data;
