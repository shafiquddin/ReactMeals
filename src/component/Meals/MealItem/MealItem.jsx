import React,{useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/Cart-Context";

const MealItem = (props) => {
  const cartCtx=useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  
  const addToCartHandler=(amount)=>{
    cartCtx.AddItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    });
  }

  return (
    <ul className={classes.meal}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
          <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </ul>
  );
};

export default MealItem;
