import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "../../Store/Cart-Context";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const CartCtx = useContext(CartContext);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDidSubmit, setIsDidSubmit] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;

  const hasItem = CartCtx.items.length > 0;

  const CartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const CartItemAddHandler = (item) => {
    CartCtx.AddItem(item);
  };
  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://reactmeals-c70c3-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: CartCtx.items,
        }),
      }
    );
    setIsSubmiting(true);
    setIsDidSubmit(true);
    CartCtx.clearCart();
  };

  const modelActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null, item.id)}
          onAdd={CartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModelContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckOut && modelActions}
    </React.Fragment>
  );

  const IsSubmitingContent=<p>Sending Data</p>

  const didSubmitContent=<React.Fragment>
    <p>Successfully submitted!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHideCart}>
        Close
      </button>
    </div>
  </React.Fragment>
  
  

  return <Model onClose={props.onHideCart}>
    {!isSubmiting && !isDidSubmit && cartModelContent}
    {isSubmiting && !isDidSubmit && IsSubmitingContent}
    {isDidSubmit && didSubmitContent}

  </Model>;
};
export default Cart;
