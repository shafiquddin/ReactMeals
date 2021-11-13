import React from "react";
import { useContext } from "react";
import CartContext from "../../Store/Cart-Context";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const CartCtx = useContext(CartContext);

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;

  const hasItem = CartCtx.items.length > 0;

  const CartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const CartItemAddHandler = (item) => {
    CartCtx.AddItem(item);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null,item.id)}
          onAdd={CartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onHideCart}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};
export default Cart;
