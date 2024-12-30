import { useEffect, useState } from "react";
import { ProductContext } from "../context";
import { useCategories, useProducts } from "../hooks";

const ProductProvider = ({ children }) => {
  const { loading, error, products } = useProducts();
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = useCategories();
  const [sortedProducts, setSortedProducts] = useState(products);
  const [cat, setCat] = useState(null);

  // Sort products by price (High to Low)
  const highToLow = () => {
    const sorted = [...sortedProducts].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  // Sort products by price (Low to High)
  const lowToHigh = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const filterByCategory = (category = null) => {
    if (category) {
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      setCat(category);
      setSortedProducts(filteredProducts); // Update only the sortedProducts state
    } else {
      setSortedProducts(products); // Reset filter to show all products
      setCat(null);
    }
  };

  const getProductByTitle = (search = null) => {
    let searchProducts = [];

    if (search && search.trim().length > 0) {
      const searchNormalized = search.toLowerCase().trim();

      // Filter by category if cat exists
      const filteredByCategory = cat
        ? products.filter((product) => product.category === cat)
        : products;

      // Filter the products (either sorted or all products) by the search term
      searchProducts = filteredByCategory.filter((product) =>
        product.title.toLowerCase().includes(searchNormalized)
      );
    } else {
      // If no search term, return the filtered products (or all products if no filter)
      searchProducts = cat
        ? products.filter((product) => product.category === cat)
        : products;
    }

    // Update sorted products
    setSortedProducts(searchProducts);
  };

  useEffect(() => {
    // On first render, ensure sortedProducts is initialized with products
    setSortedProducts(products);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        loading,
        error,
        products: sortedProducts,
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
