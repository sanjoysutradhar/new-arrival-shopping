import { useState } from "react";
import { ProductContext } from "../context";
import { useCategories, useProducts } from "../hooks";

const ProductProvider = ({ children }) => {
  const { loading, error, products } = useProducts();
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = useCategories();
  const [sortedProducts, setSortedProducts] = useState([]);
  // Sort products by price (High to Low)
  const highToLow = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  // Sort products by price (Low to High)
  const lowToHigh = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };
  const filterByCategory = (category = null) => {
    if (category) {
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      setSortedProducts(filteredProducts); // Update only the sortedProducts state
    } else {
      setSortedProducts(products); // Clear the filter by resetting to show all products
    }
  };
  const getProductByTitle = (search = null) => {
    if (search && search.trim().length > 0) {
      const searchNormalized = search.toLowerCase().trim();
      const searchProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchNormalized)
      );
      setSortedProducts(searchProducts);
    } else {
      setSortedProducts(products);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        error,
        products: sortedProducts.length > 0 ? sortedProducts : products,
        highToLow,
        lowToHigh,
        categoryLoading,
        categoryError,
        categories,
        filterByCategory,
        getProductByTitle,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
