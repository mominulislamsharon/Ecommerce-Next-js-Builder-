import { FiX } from "react-icons/fi";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSideBar = ({ isOpen, onClose }: CartSidebarProps) => {

  const items = [{
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/150",
  }];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full ">
          <div className="flex items-center justify-between p-6 border-b bg-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={onClose}
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* cart items */}
          <div className="flex-1 overflow-y-auto p-6">
             {
              items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              ) : (
                <p>Your Product here</p>
              )
             }
             
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSideBar;
