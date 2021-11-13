import React,{useState} from "react";
import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import CartProvider from "./Store/CartProvider";

const App=()=> {
  const [cartshown,setCartShown]=useState(false);

  const showCartHandler=()=>{
    setCartShown(true);
  }
  const HideCartHandler=()=>{
    setCartShown(false);
  }
  return (
    <CartProvider>
      {cartshown && <Cart onHideCart={HideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main> 
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
