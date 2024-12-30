import { useContext } from "react";
import { ProductContext } from "../../context";
import LoadingProduct from "./LoadingProduct";
import Products from "./Products";
import SearchAndCart from "./SearchAndCart";
import SortAndFilter from "./SortAndFilter";

function NewArrival() {
  const { loading, error, products } = useContext(ProductContext);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Display detailed error message
  }
  return (
    <div>
      <div className="pt-16 sm:pt-24 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
            New Arrivals
          </h1>
          <p className="mt-4 text-xl text-gray-500 text-center">
            Thoughtfully designed objects for the workspace, home, and travel.
          </p>
        </div>

        {loading.state ? (
          <>
            <LoadingProduct />
            <LoadingProduct />
          </>
        ) : products.length > 0 ? (
          <>
            <div className="mt-10">
              <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <SortAndFilter />
                <SearchAndCart />
              </div>
            </div>
            <Products products={products} />
          </>
        ) : (
          <div className="mx-10">
            <LoadingProduct />
            <LoadingProduct />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewArrival;
