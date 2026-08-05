import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

function CartPage(){
    const {cartItems,total,removeFromCart,updateQuantity}=useCart()
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log("Cart Items: ",cartItems)

    return(
        <div className="min-h-screen bg-gray-100 pt-20 p-8">
                <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>
                {cartItems.length===0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
                        {cartItems.map((item) =>(
                            <div key={item.id} className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    {item.product_image && (
                                        <img 
                                            src={`${BASEURL}${item.product_image}`} 
                                            alt={item.product_name} 
                                            className="w-20 h-20 object-cover rounded" 
                                        />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{item.product_name}</h2>
                                    <p className="text-gray-500 text-sm">${item.product_price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 font-bold transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-gray-800 w-6 text-center">{item.quantity}</span>
                                    <button 
                                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 font-bold transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        className="text-red-500 hover:text-red-700 font-medium ml-2 transition-colors" 
                                        onClick={()=>{removeFromCart(item.id)}}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <hr className="border-t border-gray-300 my-4" />
                        <div className="flex justify-between items-center py-2">
                            <h2 className="text-xl font-bold text-gray-800">Total:</h2>
                            <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
                            <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CartPage