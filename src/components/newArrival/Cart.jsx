import { useContext, useState } from "react";
import { CartContext } from "../../context";

function Cart() {
  const [toggleModal, setToggleModal] = useState(false);
  const { carts, dispatch } = useContext(CartContext);
  function handleRemoveCart(e, id) {
    e.preventDefault();
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
    // Uncomment to use toast for user feedback
    // toast.success(`Removed ${title} from cart`, {
    //   position: "bottom-right",
    // });
  }

  return (
    <>
      <div className="flow-root">
        <button
          className="group -m-2 flex items-center p-2"
          onClick={() => setToggleModal(true)}
        >
          <svg
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {carts.length}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
      {toggleModal && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[790px] p-4 max-h-[90vh] overflow-auto">
            <div className="bg-white shadow-md dark:bg-[#12141D] rounded-2xl overflow-hidden p-5 md:p-9">
              <h2 className="text-2xl lg:text-[30px] mb-10 font-bold">
                Your Carts
              </h2>
              <div className="space-y-8 lg:space-y-12 max-h-[450px] overflow-auto mb-10 lg:mb-14">
                {carts.length === 0 ? (
                  <p className="text-3xl">The Cart is empty</p>
                ) : (
                  carts.map((cart) => (
                    <div
                      key={cart.id}
                      className="grid grid-cols-[1fr_auto] gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="rounded overflow-hidden"
                          src={cart.image}
                          alt={cart.title}
                          width="50px"
                          height="50px"
                        />
                        <div>
                          <h3 className="text-base md:text-xl font-bold">
                            {cart.title}
                          </h3>
                          <p className="max-md:text-xs text-[#575A6E]">
                            {cart.category}
                          </p>
                          <span className="max-md:text-xs">${cart.price}</span>
                        </div>
                      </div>
                      <div className="flex justify-between gap-4 items-center">
                        <button
                          className="bg-[#D42967] rounded-md p-2 
                  md:px-4 inline-flex items-center space-x-2 text-white"
                          onClick={(e) => handleRemoveCart(e, cart.id)}
                        >
                          {/* <img className="w-5 h-5" src={Delete} alt="Delete" /> */}
                          <span className="max-md:hidden">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex items-center justify-end gap-2">
                {/* <a
                  className="rounded-md p-2 md:px-4 inline-flex items-center space-x-2 bg-primary text-[#171923] text-sm"
                  href="#"
                >
                  <img src={CheckOut} width="24" height="24" alt="CheckOut" />
                  <span>Checkout</span>
                </a> */}
                <button
                  className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm"
                  href="#"
                  onClick={() => setToggleModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
