"use client";

import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { months } from "../Forms/SavingForm";

export default function DateFilters({
  data,
  onFilter,
  setIsSearch,
}: {
  data: any[];
  onFilter: any;
  setIsSearch: any;
}) {
  const [selectedFilter, setSelectedFilter] = useState<SelectValue>(null);
  const filterByMonth = (data: any[], key: string): any[] => {
    return data.filter((item) => item.month === key);
  };
  const handleChange = (item: any) => {
    const valueString = item!.value;
    setSelectedFilter(item);
    setIsSearch(false);
    const filteredData = filterByMonth(data, valueString);
    onFilter(filteredData);
  };
  return (
    <div className="w-full">
      <Select
        value={selectedFilter}
        onChange={handleChange}
        options={months}
        primaryColor={"indigo"}
        isSearchable
        placeholder="Filter By Month"
        classNames={{
          menuButton: (props = { isDisabled: false }) =>
            `flex text-sm text-gray-200 border border-gray-700 rounded shadow-sm transition-all duration-300 focus:outline-none bg-black ${
              props.isDisabled ? "bg-gray-800" : "bg-black hover:bg-gray-900"
            }`,
          menu: "absolute z-10 w-full bg-black border border-gray-700 shadow-lg rounded py-1 mt-1.5 text-sm text-gray-200",
          listItem: (props = { isSelected: false }) =>
            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
              props.isSelected
                ? `text-white bg-indigo-600`
                : `text-gray-200 hover:bg-gray-800`
            }`,
        }}
      />
    </div>
  );
}
