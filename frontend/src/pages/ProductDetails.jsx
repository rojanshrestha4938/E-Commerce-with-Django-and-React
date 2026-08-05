import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function ProductDetails(){
    const {id} = useParams();
    const {addToCart} = useCart();
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(()=>{
        fetch(`${BASEURL}/api/products/${id}`)
        .then(response=>{
            if(!response.ok){
                throw new Error("Failed to fetch product");
            }
            return response.json();
        })
        .then(data=>{
            setProduct(data);
            setLoading(false);
        })
        .catch(error=>{
            setError(error.message);
            setLoading(false);
        })
    },[id,BASEURL]) // Id or BASE_URL is used in the useEffect so it should be in the dependency array which means if id or baseurl is changed then usefffect is rerendered

    if(loading){
        return <div className="text-center mt-20"><h1>Loading...</h1></div>
    }

    if(error){
        return <div className="text-center mt-20"><h1>Error: {error}</h1></div>
    }

    if(!product){
        return <div className="text-center mt-20"><h1>Product not found</h1></div>
    }

    const handleAddToCart = () => {
        if(!localStorage.getItem('access_token')){
            window.location.href = '/login';
            return;
        }
        addToCart(product.id);
    }

    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img 
                        src={`${product.image}`} 
                        alt={product.name} 
                        className="w-full md:w-1/2 h-auto object-cover rounded-lg" 
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>                        
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
                        <button 
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                        {/* {Back to home} */}
                        <div className="mt-4">
                            <a href="/" className="text-blue hover:underline">&larr; Back to Home</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetails