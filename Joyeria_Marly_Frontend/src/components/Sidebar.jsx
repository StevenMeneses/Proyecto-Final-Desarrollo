import { useState } from "react";
import { filtersData } from "../data/products";

export default function Sidebar() {
  const [openFilter, setOpenFilter] = useState(null);

  return (
    <aside className="w-64 p-6 border-r border-gray-200 bg-white font-serif">
      {filtersData.map((filter) => (
        <div key={filter.id} className="mb-6">
          <button
            onClick={() =>
              setOpenFilter(openFilter === filter.id ? null : filter.id)
            }
            className="flex justify-between items-center w-full text-base font-bold text-[#997C71] hover:text-[#997C71] transition-colors"
          >
            {filter.name}
            <span className="text-lg">
              {openFilter === filter.id ? "−" : "+"}
            </span>
          </button>

          <div
            className={`mt-3 ml-2 space-y-2 overflow-hidden transition-all duration-300 ${
              openFilter === filter.id
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {filter.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#997C71] hover:text-[#997C71]"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#997C71] focus:ring-[#997C71]"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8">
        <h3 className="text-sm font-bold text-[#997C71] mb-3">Sort by</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#997C71] hover:text-[#997C71]">
            <input
              type="radio"
              name="sort"
              className="text-brown-600 focus:ring-brown-500"
            />
            Best selling
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#997C71] hover:text-[#997C71]">
            <input
              type="radio"
              name="sort"
              className="text-brown-600 focus:ring-brown-500"
            />
            Price, low to high
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#997C71] hover:text-[#997C71]">
            <input
              type="radio"
              name="sort"
              className="text-brown-600 focus:ring-brown-500"
            />
            Price, high to low
          </label>
        </div>
      </div>
    </aside>
  );
}
