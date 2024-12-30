import { useContext, useState } from "react";
import { ProductContext } from "../../context";

function Filter() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the currently selected category
  const [toggleFilterList, setToggleFilterList] = useState(false);
  const { categories, filterByCategory } = useContext(ProductContext);

  const handleChecked = (cat) => {
    if (selectedCategory === cat) {
      // Uncheck the category if it's already selected
      setSelectedCategory(null);
      filterByCategory();
    } else {
      // Select the new category
      setSelectedCategory(cat);
      filterByCategory(cat);
    }
  };

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
            id="filter-button"
            aria-expanded="false"
            aria-haspopup="true"
            onClick={() => setToggleFilterList(!toggleFilterList)}
          >
            Filter
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
        {toggleFilterList && (
          <div
            className="absolute z-10 mt-2 w-56 origin-top-right rounded-md
             bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="filter-button"
            tabIndex="-1"
            id="filter-dropdown"
          >
            <div className="py-1" role="none">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox" // Use checkboxes for multiple select/deselect functionality
                    className="form-checkbox h-4 w-4"
                    checked={selectedCategory === cat}
                    onChange={() => handleChecked(cat)}
                  />
                  <span className="ml-2">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
