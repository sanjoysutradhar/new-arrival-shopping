import Cart from "./Cart";
import Search from "./Search";

function SearchAndCart() {
  return (
    <div className="flex gap-2 items-center">
      <Search />
      <Cart />
    </div>
  );
}

export default SearchAndCart;
