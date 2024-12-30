import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  const fetchProductData = async (controller) => {
    try {
      setError(null); // Clear previous errors
      setLoading({
        ...loading,
        state: true,
        message: "Fetching Product Data...",
      });

      const response = await fetch(`https://fakestoreapi.com/products`, {
        signal: controller.signal, // Attach AbortController's signal
      });

      if (!response.ok) {
        throw new Error(`Fetching Product data failed: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        // Ignore AbortError, only handle other errors
        setError(err.message || "An unknown error occurred.");
      }
    } finally {
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController(); // Create AbortController instance
    fetchProductData(controller);

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, []);

  return {
    products,
    error,
    loading,
  };
};

export default useProducts;
