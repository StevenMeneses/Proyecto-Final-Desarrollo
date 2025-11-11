import React from "react";

function InputComplaintsBook(props) {
  const { titulo, extraMargin = false } = props;

  return (
    <>
      <div className="flex flex-col">
        <label
          htmlFor=""
          className={`md:font-semibold text-xs ${
            extraMargin ? "mb-30" : "mb-4"
          }`}
        >
          {titulo}
        </label>
        <input
          type="text"
          id=""
          className="border-b-2  border-gray-300 mb-4.5 w-100 focus:outline-none"
        />
      </div>
    </>
  );
}

export default InputComplaintsBook;
