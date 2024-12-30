import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  const fetchCategoryData = async (controller) => {
    try {
      setError(null); // Clear previous errors
      setLoading({
        ...loading,
        state: true,
        message: "Fetching Category Data...",
      });

      const response = await fetch(
        `https://fakestoreapi.com/products/categories`,
        {
          signal: controller.signal, // Attach AbortController's signal
        }
      );

      if (!response.ok) {
        throw new Error(`Fetching Category data failed: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data);
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
    fetchCategoryData(controller);

    return () => {
      controller.abort(); // Cleanup on unmount
    };
  }, []);

  return {
    categories,
    error,
    loading,
  };
};

export default useCategories;
