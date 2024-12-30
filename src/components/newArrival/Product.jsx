import { useContext } from "react";
import { CartContext } from "../../context";

function Product({ product }) {
  const { id, title, price, category, image } = product;
  const { carts, dispatch } = useContext(CartContext);

  function handleRemoveCart(e, id) {
    e.preventDefault();
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id }, // Payload must be an object
    });
    // Uncomment to use toast for user feedback
    // toast.success(`Removed ${title} from cart`, {
    //   position: "bottom-right",
    // });
  }

  function handleAddCart(e, id) {
    e.preventDefault();
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, price, image, category }, // Add more details if needed
    });
    // Uncomment to use toast for user feedback
    // toast.success(`Added ${title} to cart`, {
    //   position: "bottom-right",
    // });
  }

  const isInCart = carts.some((cart) => cart.id === id); // Correctly check if item is in the cart

  return (
    <div className="relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-top lg:h-full lg:w-full p-4 bg-gray-100"
        />
      </div>
      <div className="mt-4 px-3 pb-4">
        <div>
          <h3 className="text-sm text-gray-700">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${price}</p>
      </div>

      <div className="cursor-pointer rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 ring-1 ring-slate-700/10 hover:ring-1 hover:bg-slate-50 hover:text-slate-900 items-center text-center mb-3 mx-3 flex-1">
        {isInCart ? (
          <div
            className="flex px-3 py-2 justify-center text-red-600"
            onClick={(e) => handleRemoveCart(e, id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Remove From Cart
          </div>
        ) : (
          <div
            className="flex px-3 py-2 justify-center"
            onClick={(e) => handleAddCart(e, id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Add To Cart
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
