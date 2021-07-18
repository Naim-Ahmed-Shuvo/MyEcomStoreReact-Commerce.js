import { useEffect, useState } from "react";
import Cart from "./Cart";
import { commerce } from "./commerce";
import Nav from "./Nav";
import Products from "./Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Checkout from "./Checkout";

//
function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order,setOrder] = useState({})
  const [errorMessage,setErrorMessage] = useState("")

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log("products: " + data)

    setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  const handleUpdateCartQty = async(productId,quantity) => {
     const response = await commerce.cart.update(productId,{quantity})
     setCart(response.cart)
  }

  const handleRemoveFromCart = async(productId) => {
      const response = await commerce.cart.remove(productId)

      setCart(response.cart)
  }

  const handleEmptyCart = async()=>{
    const response = await commerce.cart.empty();
    setCart(response.cart)
  }

  const refreshCart = async()=>{
    console.log("refreshCart");
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async(checkoutTokenId,newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch(error){
         setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log("cart", cart)


  //
  return (
    <div>
      <Router>
      <Nav totalItems={cart.total_items} />
        <Switch>
          
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
