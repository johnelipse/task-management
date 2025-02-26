"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
};
export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}: FormSelectInputProps) {
  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 text-slate-300 block text-sm font-medium leading-6">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          isSearchable
          primaryColor="blue"
          value={option}
          onChange={(item) => setOption(item)}
          options={options}
          placeholder={label}
          classNames={{
            menuButton: (props = { isDisabled: false }) =>
              `flex text-sm text-gray-200 border border-gray-700 rounded shadow-sm transition-all duration-300 focus:outline-none bg-gray-950 ${
                props.isDisabled
                  ? "bg-gray-900"
                  : "bg-gray-900 hover:bg-gray-800"
              }`,
            menu: "absolute z-10 w-full bg-gray-950 border border-gray-900 shadow-lg rounded py-1 mt-1.5 text-sm text-gray-200",
            listItem: (props = { isSelected: false }) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                props.isSelected
                  ? `text-white bg-indigo-600`
                  : `text-gray-200 hover:bg-gray-800`
              }`,
          }}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
