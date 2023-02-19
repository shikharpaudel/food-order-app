import React, {useState } from "react";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import CartProvider from "./components/store/CartProvider";
function App() {
  const [showCartItems,setShowCartItems] = useState(false);
  const handleShowCart = ()=>{
    setShowCartItems(true);
  };
  const handleHideCart = ()=>{
    setShowCartItems(false);
  };
  return (
   <CartProvider>
      <Header click = {handleShowCart}/>
     {showCartItems && <Cart onClick = {handleHideCart}/>}
      <main>
        <Meals/>
        </main>
        </CartProvider>
  );
}

export default App;
