import { useContext, useState } from "react";
import { ProductContext } from "../../context";

function Sort() {
  const [toggleSortList, setToggleSortList] = useState(false);
  const { highToLow, lowToHigh } = useContext(ProductContext);
  function handleSort(sort) {
    if (sort === "LOW_TO_HIGH") {
      lowToHigh();
    } else {
      highToLow();
    }
    setToggleSortList(false);
  }
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md
           bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500
            focus:text-gray-700 transition-all"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setToggleSortList(!toggleSortList)}
        >
          Sort
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {toggleSortList && (
        <div
          className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md
           bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <span
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSort("LOW_TO_HIGH")}
              id="menu-item-0"
            >
              Low to High
            </span>
            <span
              href=""
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSort("HIGH_TO_LOW")}
              id="menu-item-0"
            >
              High to Low
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sort;
