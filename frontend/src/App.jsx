import ProductList from "./pages/ProductList.jsx";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ProductDetails from "./pages/ProductDetails.jsx"
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRouter from './components/PrivateRouter';

function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route element={<PrivateRouter/>}>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />

                </Routes>
            </div>
        </Router>
    )
}

export default App